import { ShieldIcon } from "./icons";

function ConsentGate({ onAccept, onDecline }) {
  return (
    <div className="consent-overlay">
      <section className="consent-card">
        <div className="consent-icon">
          <ShieldIcon className="h-6 w-6" />
        </div>
        <p className="section-kicker">Before we begin</p>
        <h2 className="landing-serif consent-title">
          Your privacy matters here.
        </h2>
        <p className="consent-copy">
          This space is for reflection, not emergency or medical care. Your
          words stay private in this preview, and the experience is designed to
          feel calm, not clinical.
        </p>
        <div className="consent-actions">
          <button
            className="solid-button"
            type="button"
            onClick={onAccept}
          >
            I agree
          </button>
          <button
            className="glass-button"
            type="button"
            onClick={onDecline}
          >
            Decline
          </button>
        </div>
      </section>
    </div>
  );
}

export default ConsentGate;
