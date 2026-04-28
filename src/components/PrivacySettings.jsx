import { useState } from "react";
import AppHeader from "./AppHeader";

function PrivacySettings({ currentUser, initialPage, onBack, onSignOut }) {
  const [page, setPage] = useState(initialPage || "settings");

  return (
    <div className="app-shell account-shell">
      <AppHeader
        currentUser={currentUser}
        leftAction={
          <button className="glass-button" type="button" onClick={onBack}>
            Back to app
          </button>
        }
        onOpenPrivacy={() => setPage("privacy")}
        onOpenSettings={() => setPage("settings")}
        onSignOut={onSignOut}
      />

      <section className="account-layout">
        <aside className="account-tabs">
          <button
            className={page === "settings" ? "account-tab-active" : ""}
            type="button"
            onClick={() => setPage("settings")}
          >
            Settings
          </button>
          <button
            className={page === "privacy" ? "account-tab-active" : ""}
            type="button"
            onClick={() => setPage("privacy")}
          >
            Privacy
          </button>
        </aside>

        <div className="account-panel">
          {page === "settings" ? (
            <SettingsContent currentUser={currentUser} />
          ) : (
            <PrivacyContent />
          )}
        </div>
      </section>
    </div>
  );
}

function SettingsContent({ currentUser }) {
  const displayName =
    currentUser?.user_metadata?.display_name ||
    currentUser?.email ||
    "Lumora user";

  return (
    <div className="settings-content">
      <p className="section-kicker">Settings</p>
      <h1 className="landing-serif">Your Lumora space</h1>
      <div className="settings-profile-card">
        <div className="settings-avatar">{getInitials(displayName)}</div>
        <div>
          <h2>{displayName}</h2>
          <p>{currentUser?.email || "Signed in"}</p>
        </div>
      </div>
      <div className="settings-grid">
        <article>
          <h3>Profile photo</h3>
          <p>Profile photo upload will live here once storage is connected.</p>
        </article>
        <article>
          <h3>Conversation tone</h3>
          <p>Keep Lumora gentle, clear, and emotionally steady by default.</p>
        </article>
        <article>
          <h3>Voice input</h3>
          <p>
            Browser speech recognition can be used when you start a live
            session.
          </p>
        </article>
      </div>
    </div>
  );
}

function PrivacyContent() {
  return (
    <article className="privacy-content">
      <p className="section-kicker">Privacy Policy</p>
      <h1 className="landing-serif">Lumora Privacy Policy</h1>
      <p className="privacy-effective">Effective Date: April 28, 2026</p>

      <PrivacySection title="1. Introduction">
        <p>
          Lumora is an AI-powered conversational support application designed to
          provide a private space for reflection and emotional support. It is
          not a medical or emergency service.
        </p>
        <p>
          We are committed to protecting your privacy and being transparent
          about how your data is handled.
        </p>
      </PrivacySection>

      <PrivacySection title="2. Information We Collect">
        <h3>Personal Information</h3>
        <ul>
          <li>Name, if provided</li>
          <li>Email address for account authentication</li>
        </ul>
        <h3>User Content</h3>
        <ul>
          <li>Messages you send in conversations</li>
          <li>Voice input converted into text using your device or browser</li>
        </ul>
        <h3>Technical Information</h3>
        <ul>
          <li>IP address</li>
          <li>Device and browser type</li>
          <li>Basic usage data, such as interaction timestamps</li>
        </ul>
      </PrivacySection>

      <PrivacySection title="3. How We Use Your Information">
        <p>We use your data to:</p>
        <ul>
          <li>Generate AI responses to your messages</li>
          <li>Maintain your account and authentication</li>
          <li>Improve the functionality and user experience of Lumora</li>
        </ul>
        <p>We do not sell your personal data.</p>
      </PrivacySection>

      <PrivacySection title="4. How Your Data Is Processed">
        <p>When you interact with Lumora:</p>
        <ul>
          <li>
            Your messages are sent to our backend processing system via a secure
            webhook
          </li>
          <li>Data may be processed by AI systems to generate responses</li>
          <li>
            Your conversation context may be temporarily used to improve
            response quality
          </li>
        </ul>
      </PrivacySection>

      <PrivacySection title="5. Data Storage and Retention">
        <ul>
          <li>Conversations are processed in real time</li>
          <li>
            Conversation storage policy will be finalized before production
            release
          </li>
          <li>
            User account data, including email and name, is stored securely for
            authentication purposes
          </li>
        </ul>
      </PrivacySection>

      <PrivacySection title="6. Voice Data">
        <p>
          Lumora uses your browser's speech recognition features for voice
          input.
        </p>
        <ul>
          <li>Voice data may be processed by your browser provider</li>
          <li>
            We only receive the transcribed text, not raw audio recordings
          </li>
        </ul>
      </PrivacySection>

      <PrivacySection title="7. Data Sharing">
        <p>We may share data with the following services:</p>
        <ul>
          <li>Supabase for login and account management</li>
          <li>n8n for backend request processing</li>
          <li>AI service providers, if used, to generate responses</li>
        </ul>
        <p>We do not share your data for advertising purposes.</p>
      </PrivacySection>

      <PrivacySection title="8. Security">
        <p>We take reasonable measures to protect your data, including:</p>
        <ul>
          <li>Secure HTTPS communication</li>
          <li>Authenticated access control</li>
          <li>Limiting access to systems handling user data</li>
        </ul>
        <p>However, no system can be guaranteed to be completely secure.</p>
      </PrivacySection>

      <PrivacySection title="9. Your Rights">
        <p>You have the right to:</p>
        <ul>
          <li>Access your personal data</li>
          <li>Request deletion of your data</li>
          <li>Withdraw consent at any time</li>
        </ul>
        <p>To make a request, contact us at: support@lumora.app</p>
      </PrivacySection>

      <PrivacySection title="10. Consent">
        <p>
          By using Lumora, you agree to this Privacy Policy and the processing
          of your data as described above. If you do not agree, please do not
          use the application.
        </p>
      </PrivacySection>

      <PrivacySection title="11. Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. Updates will be
          reflected with a revised Effective Date.
        </p>
      </PrivacySection>

      <PrivacySection title="12. Contact">
        <p>If you have questions about this Privacy Policy, contact us at:</p>
        <p>support@lumora.app</p>
      </PrivacySection>
    </article>
  );
}

function PrivacySection({ children, title }) {
  return (
    <section className="privacy-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function getInitials(value) {
  return value
    .split(/[ @._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export default PrivacySettings;
