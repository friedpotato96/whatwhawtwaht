import { SparkIcon } from "./icons";

function LoadingScreen() {
  return (
    <div className="app-shell loading-shell">
      <section className="loading-card">
        <div className="loading-icon">
          <SparkIcon className="h-7 w-7" />
        </div>
        <h2 className="landing-serif loading-title">
          Preparing your space
        </h2>
        <p className="loading-copy">
          We are checking your session and setting up Lumora.
        </p>
        <div className="loading-dots">
          <span />
          <span />
          <span />
        </div>
      </section>
    </div>
  );
}

export default LoadingScreen;
