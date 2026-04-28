import { useEffect, useMemo, useRef, useState } from "react";
import AuthGate from "./components/AuthGate";
import ConsentGate from "./components/ConsentGate";
import HomeScreen from "./components/HomeScreen";
import LandingPage from "./components/LandingPage";
import LoadingScreen from "./components/LoadingScreen";
import PrivacySettings from "./components/PrivacySettings";
import SessionScreen from "./components/SessionScreen";
import { isSupabaseConfigured, supabase } from "./supabase";
import { sendTherapyMessage } from "./therapyWebhook";
import { buildSessionTitle, initialMessages } from "./utils/chat";

const CONSENT_KEY = "lumora-consent";
const backgroundImage =
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80";

function App() {
  const [hasConsent, setHasConsent] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(CONSENT_KEY) === "accepted";
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authReady, setAuthReady] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [declined, setDeclined] = useState(false);
  const [authMode, setAuthMode] = useState("sign up");
  const [showAuthGate, setShowAuthGate] = useState(false);
  const [chatStarted, setChatStarted] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState(initialMessages);
  const [isSending, setIsSending] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [assistantSpeaking, setAssistantSpeaking] = useState(false);
  const [assistantLevel, setAssistantLevel] = useState(0.08);
  const [chatSessions, setChatSessions] = useState([]);
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [accountPage, setAccountPage] = useState(null);
  const recognitionRef = useRef(null);
  const speechAnimationRef = useRef(null);

  const activeSession = chatSessions.find(
    (session) => session.id === activeSessionId,
  );

  const assistantStatus = useMemo(() => {
    if (!chatStarted)
      return "Tap the blue core to speak or use the composer below.";
    if (isSending) return "Lumora is thinking.";
    if (assistantSpeaking) return "Lumora is speaking.";
    if (isListening) return "Listening.";
    return "Reply when you are ready.";
  }, [assistantSpeaking, chatStarted, isListening, isSending]);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setIsAuthenticated(false);
      setAuthReady(true);
      return undefined;
    }

    let mounted = true;

    async function loadSession() {
      const { data, error } = await supabase.auth.getSession();
      if (!mounted) return;

      setCurrentUser(error ? null : (data.session?.user ?? null));
      setIsAuthenticated(!error && Boolean(data.session));
      setAuthReady(true);
    }

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session?.user ?? null);
      setIsAuthenticated(Boolean(session));
      setAuthReady(true);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!isAuthenticated || activeSessionId || chatSessions.length === 0)
      return;

    const latestSession = chatSessions[0];
    setActiveSessionId(latestSession.id);
    setMessages(latestSession.messages);
    setChatStarted(latestSession.messages.length > 1);
  }, [activeSessionId, chatSessions, isAuthenticated]);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
        recognitionRef.current = null;
      }

      if (speechAnimationRef.current) {
        cancelAnimationFrame(speechAnimationRef.current);
      }

      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  function updateSessionMessages(sessionId, nextMessages) {
    setChatSessions((current) =>
      current.map((session) =>
        session.id === sessionId
          ? {
              ...session,
              messages: nextMessages,
              title: buildSessionTitle(nextMessages, session.title),
              updatedAt: Date.now(),
            }
          : session,
      ),
    );
  }

  function acceptConsent() {
    window.localStorage.setItem(CONSENT_KEY, "accepted");
    setHasConsent(true);
    setShowAuthGate(false);
  }

  function declineConsent() {
    setDeclined(true);
    window.setTimeout(() => {
      window.location.replace("about:blank");
    }, 350);
  }

  function openAuth(mode) {
    setAuthMode(mode);
    setShowAuthGate(true);
  }

  function closeAuth() {
    setShowAuthGate(false);
  }

  function beginChat() {
    const sessionId = crypto.randomUUID();
    const session = {
      id: sessionId,
      title: "New chat",
      updatedAt: Date.now(),
      messages: initialMessages,
    };

    setChatSessions((current) => [session, ...current]);
    setActiveSessionId(sessionId);
    setChatStarted(false);
    setMessages(initialMessages);
    setDraft("");
    stopListening();
    stopAssistantSpeech();
  }

  function openSession(sessionId) {
    const session = chatSessions.find((item) => item.id === sessionId);
    if (!session) return;

    setActiveSessionId(session.id);
    setMessages(session.messages);
    setChatStarted(session.messages.length > 1);
    setDraft("");
    stopListening();
    stopAssistantSpeech();
  }

  function returnToChats() {
    setActiveSessionId(null);
    setAccountPage(null);
    setDraft("");
    stopListening();
    stopAssistantSpeech();
  }

  async function handleSignOut() {
    stopListening();
    stopAssistantSpeech();
    setActiveSessionId(null);
    setDraft("");
    setShowAuthGate(false);
    setAccountPage(null);

    if (!isSupabaseConfigured) {
      setIsAuthenticated(false);
      setCurrentUser(null);
      return;
    }

    await supabase.auth.signOut();
  }

  async function submitMessage(inputText) {
    const cleanText = inputText.trim();
    if (!cleanText || isSending || !activeSessionId) return;

    const userMessage = {
      id: crypto.randomUUID(),
      role: "user",
      text: cleanText,
    };
    const pendingReply = {
      id: crypto.randomUUID(),
      role: "assistant",
      text: "...",
      pending: true,
    };
    const nextMessages = [...messages, userMessage];
    const pendingMessages = [...nextMessages, pendingReply];

    setChatStarted(true);
    setMessages(pendingMessages);
    updateSessionMessages(activeSessionId, pendingMessages);
    setIsSending(true);
    stopListening();
    stopAssistantSpeech();

    try {
      const replyText = await sendTherapyMessage({
        message: cleanText,
        user: currentUser,
        conversation: nextMessages.map((message) => ({
          role: message.role,
          content: message.text,
        })),
      });

      const normalizedReply =
        replyText.trim() ||
        "I am here, but I could not form a clear reply just yet.";

      const resolvedMessages = pendingMessages.map((message) =>
        message.id === pendingReply.id
          ? { ...message, text: normalizedReply, pending: false }
          : message,
      );

      setMessages(resolvedMessages);
      updateSessionMessages(activeSessionId, resolvedMessages);
      speakAssistantReply(normalizedReply);
    } catch (error) {
      console.error("therapy webhook request failed:", error);

      const fallbackMessages = pendingMessages.map((message) =>
        message.id === pendingReply.id
          ? {
              ...message,
              text: "I hit a connection issue. Please try again in a moment.",
              pending: false,
            }
          : message,
      );

      setMessages(fallbackMessages);
      updateSessionMessages(activeSessionId, fallbackMessages);
    } finally {
      setIsSending(false);
    }
  }

  async function handleSend(event) {
    event.preventDefault();
    const currentDraft = draft;
    setDraft("");
    await submitMessage(currentDraft);
  }

  function startListening() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (
      !SpeechRecognition ||
      isSending ||
      assistantSpeaking ||
      !activeSessionId
    ) {
      return;
    }

    if (recognitionRef.current) {
      recognitionRef.current.abort();
      recognitionRef.current = null;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setChatStarted(true);
    };

    recognition.onresult = (event) => {
      const finalTranscript = Array.from(event.results)
        .filter((result) => result.isFinal)
        .map((result) => result[0]?.transcript ?? "")
        .join(" ")
        .trim();

      if (finalTranscript) {
        submitMessage(finalTranscript);
      }
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      recognitionRef.current = null;
    };

    recognitionRef.current = recognition;
    recognition.start();
  }

  function stopListening() {
    if (!recognitionRef.current) return;
    recognitionRef.current.abort();
    recognitionRef.current = null;
    setIsListening(false);
  }

  function toggleListening() {
    if (isListening) {
      stopListening();
      return;
    }

    startListening();
  }

  function stopAssistantSpeech() {
    if (speechAnimationRef.current) {
      cancelAnimationFrame(speechAnimationRef.current);
      speechAnimationRef.current = null;
    }

    setAssistantSpeaking(false);
    setAssistantLevel(0.08);

    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }

  function startAssistantAnimation() {
    if (speechAnimationRef.current) {
      cancelAnimationFrame(speechAnimationRef.current);
    }

    let frame = 0;

    function animate() {
      frame += 1;
      const wave = 0.18 + Math.abs(Math.sin(frame / 5)) * 0.22;
      const wobble = ((frame % 9) / 100) * 0.3;
      setAssistantLevel(Math.min(0.7, wave + wobble));
      speechAnimationRef.current = requestAnimationFrame(animate);
    }

    animate();
  }

  function speakAssistantReply(text) {
    if (!window.speechSynthesis || !text.trim()) return;

    stopAssistantSpeech();

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice =
      voices.find((voice) =>
        /samantha|aria|zira|serena|female/i.test(voice.name),
      ) ??
      voices.find((voice) => /^en/i.test(voice.lang)) ??
      null;

    if (preferredVoice) utterance.voice = preferredVoice;
    utterance.rate = 1;
    utterance.pitch = 1;

    const finishSpeaking = () => {
      if (speechAnimationRef.current) {
        cancelAnimationFrame(speechAnimationRef.current);
        speechAnimationRef.current = null;
      }
      setAssistantSpeaking(false);
      setAssistantLevel(0.08);
    };

    utterance.onstart = () => {
      setAssistantSpeaking(true);
      startAssistantAnimation();
    };
    utterance.onend = finishSpeaking;
    utterance.onerror = finishSpeaking;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  if (declined) {
    return (
      <main className="grid min-h-screen place-items-center bg-glow-pearl p-6 text-glow-ink">
        <section className="glass-panel max-w-md p-8 text-center">
          <p className="text-sm font-semibold uppercase text-sky-500">
            Session closed
          </p>
          <h1 className="mt-3 text-2xl font-semibold">You are leaving now.</h1>
          <p className="mt-4 text-sm leading-6 text-black/70">
            Your choice has been respected. No therapy session was started.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="app-root">
      <img
        className="ambient-photo"
        src={backgroundImage}
        alt=""
        aria-hidden="true"
      />
      <div className="app-surface" />

      {!hasConsent && (
        <ConsentGate onAccept={acceptConsent} onDecline={declineConsent} />
      )}

      {hasConsent && !authReady && <LoadingScreen />}

      {hasConsent && authReady && !isAuthenticated && !showAuthGate && (
        <LandingPage
          onLogIn={() => openAuth("log in")}
          onSignUp={() => openAuth("sign up")}
        />
      )}

      {hasConsent && authReady && !isAuthenticated && showAuthGate && (
        <AuthGate initialMode={authMode} onBack={closeAuth} />
      )}

      {hasConsent && authReady && isAuthenticated && accountPage && (
        <PrivacySettings
          currentUser={currentUser}
          initialPage={accountPage}
          onBack={() => setAccountPage(null)}
          onSignOut={handleSignOut}
        />
      )}

      {hasConsent &&
        authReady &&
        isAuthenticated &&
        !accountPage &&
        !activeSession && (
          <HomeScreen
            currentUser={currentUser}
            onNewChat={beginChat}
            onOpenChat={openSession}
            onOpenPrivacy={() => setAccountPage("privacy")}
            onOpenSettings={() => setAccountPage("settings")}
            onSignOut={handleSignOut}
            sessions={chatSessions}
          />
        )}

      {hasConsent &&
        authReady &&
        isAuthenticated &&
        !accountPage &&
        activeSession && (
          <SessionScreen
            assistantLevel={assistantLevel}
            assistantStatus={assistantStatus}
            currentUser={currentUser}
            draft={draft}
            isListening={isListening}
            isSending={isSending}
            messages={messages}
            onBack={returnToChats}
            onDraftChange={setDraft}
            onOpenPrivacy={() => setAccountPage("privacy")}
            onOpenSettings={() => setAccountPage("settings")}
            onSignOut={handleSignOut}
            onSubmit={handleSend}
            onToggleListening={toggleListening}
            speaking={assistantSpeaking}
            stopAssistantSpeech={stopAssistantSpeech}
          />
        )}
    </main>
  );
}

export default App;
