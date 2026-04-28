function ConsentGate({ onAccept, onDecline }) {
  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-white/50 px-5 backdrop-blur-2xl">
      <section className="glass-panel max-w-lg p-6 sm:p-8">
        <p className="text-sm font-semibold text-sky-500">Before we begin</p>
        <h2 className="landing-serif mt-3 text-3xl leading-tight text-black">
          Your privacy matters here.
        </h2>
        <p className="mt-4 text-sm leading-6 text-black/70">
          This space is for reflection, not emergency or medical care. Your
          words stay private in this preview, and the experience is designed to
          feel calm, not clinical.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            className="solid-button w-full"
            type="button"
            onClick={onAccept}
          >
            I agree
          </button>
          <button
            className="glass-button w-full"
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
