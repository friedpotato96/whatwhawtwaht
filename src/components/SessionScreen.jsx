import AppHeader from "./AppHeader";
import Composer from "./Composer";
import VoiceBlob from "./VoiceBlob";
import { BackIcon } from "./icons";

function SessionScreen({
  assistantLevel,
  assistantStatus,
  currentUser,
  draft,
  isListening,
  isSending,
  messages,
  onBack,
  onDraftChange,
  onOpenPrivacy,
  onOpenSettings,
  onSignOut,
  onSubmit,
  onToggleListening,
  speaking,
  stopAssistantSpeech,
}) {
  return (
    <div className="app-shell session-shell">
      <AppHeader
        currentUser={currentUser}
        leftAction={
          <button className="glass-button" type="button" onClick={onBack}>
            <BackIcon className="h-4 w-4" />
            All chats
          </button>
        }
        onOpenPrivacy={onOpenPrivacy}
        onOpenSettings={onOpenSettings}
        onSignOut={onSignOut}
        secondaryAction={
          speaking ? (
            <button
              className="glass-button"
              type="button"
              onClick={stopAssistantSpeech}
            >
              Stop voice
            </button>
          ) : null
        }
      />

      <section className="session-stage">
        <div className="session-center">
          <p className="section-kicker">Live Session</p>
          <p className="session-status">{assistantStatus}</p>
          <VoiceBlob
            level={assistantLevel}
            listening={isListening}
            onPress={onToggleListening}
            speaking={speaking}
          />
        </div>

        <div className="transcript-shell">
          <div className="transcript-list">
            {messages.map((message) => (
              <article
                key={message.id}
                className={`message-bubble message-${message.role} ${
                  message.pending ? "message-pending" : ""
                }`}
              >
                <p>{message.text}</p>
              </article>
            ))}
          </div>

          <Composer
            draft={draft}
            disabled={isSending}
            onDraftChange={onDraftChange}
            onSubmit={onSubmit}
          />
        </div>
      </section>
    </div>
  );
}

export default SessionScreen;
