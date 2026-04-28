import { useEffect, useRef, useState } from "react";
import { QuoteIcon, SparkIcon } from "./icons";

const features = [
  {
    title: "Mood intelligence",
    copy: "Tracks emotional patterns over time and gently notices what tends to pull you into stress, sadness, or anxiety.",
  },
  {
    title: "Adaptive personality",
    copy: "Lumora learns your rhythm, your phrasing, and your emotional pace so each conversation feels more natural.",
  },
  {
    title: "Emotional analytics",
    copy: "Soft insight without noisy dashboards. Quiet patterns, clearer evenings, and a better sense of what helps.",
  },
  {
    title: "Private and safe",
    copy: "No judgement, no pressure, no performance. A protected room you can step into when the day feels loud.",
  },
  {
    title: "Smart prompt evolution",
    copy: "Questions get better over time, based on what actually helps you reflect instead of what sounds clever.",
  },
  {
    title: "Goals and habits",
    copy: "Build small emotional habits with reminders that respect your pace and never make calm feel like homework.",
  },
];

const orbitNodes = [
  { title: "Tone", subtitle: "balancing", className: "orbit-track-one" },
  { title: "Guide", subtitle: "suggestion", className: "orbit-track-two" },
  { title: "Emotion", subtitle: "detection", className: "orbit-track-three" },
  {
    title: "Context",
    subtitle: "understanding",
    className: "orbit-track-four",
  },
  { title: "Memory", subtitle: "patterns", className: "orbit-track-five" },
  { title: "Refine", subtitle: "response", className: "orbit-track-six" },
];

const testimonials = [
  {
    quote:
      "Lumora feels like the friend who actually listens. I open it on hard evenings and leave a little lighter.",
    name: "Aisha R.",
    role: "Designer, Lisbon",
  },
  {
    quote:
      "It does not try to fix me. It just helps me notice what I am feeling, and somehow that has been enough.",
    name: "Daniel M.",
    role: "Teacher, Berlin",
  },
  {
    quote:
      "The first app I have kept past a week. Checking in feels like a small kindness to myself.",
    name: "Priya S.",
    role: "Researcher, Bengaluru",
  },
];

const pricing = [
  {
    name: "Free",
    price: 0,
    detail: "A quiet beginning.",
    points: [
      "5 messages per day",
      "General AI responses",
      "Basic emotional support",
      "Limited personalization",
    ],
  },
  {
    name: "Standard",
    price: 5,
    detail: "A companion who learns you.",
    points: [
      "25 messages per day",
      "Personalized AI agents",
      "Improved emotional understanding",
      "Better response quality",
    ],
  },
  {
    name: "Premium",
    price: 7,
    detail: "Your fullest, deepest companion.",
    points: [
      "100 messages per session",
      "Advanced mood analysis",
      "Priority intelligent responses",
      "Deeper insights and suggestions",
    ],
    featured: true,
  },
];

function LandingPage({ onLogIn, onSignUp }) {
  const [showNavCta, setShowNavCta] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setShowNavCta(window.scrollY > 260);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="landing-shell">
      <header
        className={`floating-nav ${showNavCta ? "floating-nav-scrolled" : ""}`}
      >
        <div className="floating-nav-brand">
          <span className="nav-brand-dot" />
          <span>lumora</span>
        </div>
        <button className="nav-brand-button" type="button" onClick={onSignUp}>
          Start free
        </button>
      </header>

      <section className="hero-grid landing-section">
        <div className="hero-copy">
          <div className="hero-kicker">
            <span className="hero-kicker-dot" />
            powered by 6 synchronized agents
          </div>
          <h1 className="landing-title text-black">
            From <span className="animated-highlight">overthinking</span>
            <br />
            to understanding.
          </h1>
          <p className="landing-copy hero-copy-text">
            A calm AI companion that helps you slow spirals, name what is loud,
            and move toward clarity without pressure.
          </p>
          <div className="landing-actions">
            <button className="solid-button" type="button" onClick={onSignUp}>
              Start free
            </button>
            <button className="glass-button" type="button" onClick={onLogIn}>
              Sign in
            </button>
          </div>
          <p className="hero-footnote">
            No credit card. No pressure. Begin gently.
          </p>
        </div>

        <div className="hero-preview">
          <div className="chat-preview-card">
            <div className="chat-preview-head">
              <div className="chat-preview-identity">
                <span className="chat-preview-avatar">l</span>
                <div>
                  <p>lumora</p>
                  <span>6 agents present</span>
                </div>
              </div>
              <div className="preview-dots">
                <span />
                <span />
                <span />
              </div>
            </div>

            <div className="preview-message preview-message-user">
              I keep replaying every small mistake.
            </div>
            <div className="preview-message preview-message-assistant">
              That sounds heavy. Let us slow it down to one thought at a time.
              Which one keeps coming back first?
            </div>
            <div className="preview-message preview-message-user">
              That I am falling behind.
            </div>

            <div className="preview-input">
              <span>Lumora is composing</span>
              <div className="typing-row" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <button type="button" aria-label="Send">
                <SparkIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="engine-grid landing-section landing-section-spacious">
        <div className="orbit-stage">
          <div className="orbit-center">
            <p>you</p>
            <span>understood</span>
          </div>
          <div className="orbit-ring orbit-ring-outer" />
          <div className="orbit-ring orbit-ring-inner" />
          {orbitNodes.map((node) => (
            <div key={node.title} className={`orbit-track ${node.className}`}>
              <div className="orbit-node">
                <p>{node.title}</p>
                <span>{node.subtitle}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="engine-copy">
          <p className="section-kicker">The engine</p>
          <h2 className="landing-serif section-title">
            Six minds, one quiet voice.
          </h2>
          <p className="landing-copy section-copy">
            Behind every message, six AI agents collaborate in real time,
            sensing emotion, reading context, remembering your story, refining
            tone, and shaping guidance.
          </p>
          <div className="engine-list">
            <p>Emotion detection</p>
            <p>Context understanding</p>
            <p>Memory and patterns</p>
            <p>Response refinement</p>
            <p>Tone balancing</p>
            <p>Guidance and suggestion</p>
          </div>
        </div>
      </section>

      <section className="landing-section landing-section-spacious">
        <div className="section-heading">
          <p className="section-kicker">What you get</p>
          <h2 className="landing-serif section-title">
            Designed to feel like a deep breath.
          </h2>
          <p className="landing-copy section-copy centered-copy">
            Every feature exists for one reason: to help you move, gently,
            toward a better state of mind.
          </p>
        </div>

        <div className="feature-grid">
          {features.map((feature, index) => (
            <article key={feature.title} className="feature-card shine-card">
              <div className="feature-icon">{index + 1}</div>
              <h3>{feature.title}</h3>
              <p>{feature.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-section landing-section-spacious testimonials-section">
        <div className="section-heading">
          <p className="section-kicker">Quiet voices</p>
          <h2 className="landing-serif section-title">
            Held, in their own words.
          </h2>
          <p className="landing-copy section-copy centered-copy">
            A few notes from people who have let Lumora into their everyday.
          </p>
        </div>

        <div className="testimonial-grid">
          {testimonials.map((item, index) => (
            <article key={item.name} className="testimonial-card shine-card">
              <QuoteIcon className="h-8 w-8 text-black/18" />
              <p>{item.quote}</p>
              <div className="testimonial-person">
                <span
                  className={`testimonial-avatar testimonial-avatar-${index + 1}`}
                >
                  {item.name[0]}
                </span>
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.role}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-section landing-section-spacious pricing-section">
        <div className="section-heading">
          <p className="section-kicker">Pricing</p>
          <h2 className="landing-serif section-title">
            Pay softly. Feel deeply.
          </h2>
          <p className="landing-copy section-copy centered-copy">
            Start free. Upgrade only when Lumora has earned a place in your day.
          </p>
        </div>

        <div className="pricing-grid">
          {pricing.map((plan) => (
            <article
              key={plan.name}
              className={`pricing-card ${plan.featured ? "pricing-card-featured" : ""}`}
            >
              {plan.featured && (
                <span className="pricing-badge">Most loved</span>
              )}
              <p className="pricing-name">{plan.name}</p>
              <div className="pricing-price">
                <AnimatedPrice value={plan.price} />
                <span>/mo</span>
              </div>
              <p className="pricing-detail">{plan.detail}</p>
              <div className="pricing-points">
                {plan.points.map((point) => (
                  <p key={point}>{point}</p>
                ))}
              </div>
              <button
                className={
                  plan.featured ? "solid-button w-full" : "glass-button w-full"
                }
                type="button"
                onClick={onSignUp}
              >
                Begin gently
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="closing-section landing-section landing-section-spacious">
        <p className="section-kicker">lumora</p>
        <h2 className="landing-serif section-title">
          This is not just{" "}
          <span className="animated-highlight">another app.</span>
        </h2>
        <p className="landing-copy section-copy centered-copy">
          It is a quiet companion that listens without interrupting, learns
          without judging, and helps you move gently toward a better state of
          mind.
        </p>
        <div className="landing-actions centered-actions">
          <button className="solid-button" type="button" onClick={onSignUp}>
            Start free
          </button>
          <button className="glass-button" type="button" onClick={onLogIn}>
            Experience calm
          </button>
        </div>
        <p className="closing-footnote">(c) 2026 lumora, built with care.</p>
      </section>
    </div>
  );
}

function AnimatedPrice({ value }) {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || hasAnimated) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setHasAnimated(true);
        const duration = 1300;
        const start = performance.now();

        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplayValue(Math.round(value * eased));

          if (progress < 1) {
            requestAnimationFrame(tick);
          }
        }

        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.45 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [hasAnimated, value]);

  return (
    <span className="price-number" ref={ref}>
      ${displayValue}
    </span>
  );
}

export default LandingPage;
