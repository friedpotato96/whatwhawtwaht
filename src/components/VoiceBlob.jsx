function VoiceBlob({ level, listening, onPress, speaking }) {
  const visualLevel = speaking ? Math.max(level, 0.16) : 0.08;

  return (
    <button
      type="button"
      className={`voice-blob ${speaking ? "voice-blob-active" : ""} ${
        listening ? "voice-blob-listening" : ""
      }`}
      style={{ "--voice-level": visualLevel.toFixed(3) }}
      onClick={onPress}
      aria-label="AI voice presence"
    >
      <span className="voice-orbit voice-orbit-one" />
      <span className="voice-orbit voice-orbit-two" />
      <span className="voice-orbit voice-orbit-three" />
      <span className="voice-aura" />
      <span className="voice-core" />
      <span className="voice-color voice-color-one" />
      <span className="voice-color voice-color-two" />
      <span className="voice-color voice-color-three" />
      <span className="voice-shine" />
    </button>
  );
}

export default VoiceBlob;
