import { SparkIcon } from "./icons";

function LoadingScreen() {
  return (
    <div className="app-shell">
      <section className="glass-panel loading-panel p-8 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-sky-200/70 bg-white/80 text-sky-500 shadow-glow">
          <SparkIcon className="h-7 w-7" />
        </div>
        <h2 className="landing-title mt-6 text-3xl text-black">
          Preparing your space
        </h2>
        <p className="landing-copy mt-3 text-sm text-black/65">
          We are checking your session and setting up Lumora.
        </p>
      </section>
    </div>
  );
}

export default LoadingScreen;
