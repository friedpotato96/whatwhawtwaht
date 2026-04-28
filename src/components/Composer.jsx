import { ArrowUpIcon } from "./icons";

function Composer({ draft, disabled, onDraftChange, onSubmit }) {
  return (
    <form className="composer-panel" onSubmit={onSubmit}>
      <label className="sr-only" htmlFor="message">
        Type your message
      </label>
      <input
        id="message"
        value={draft}
        onChange={(event) => onDraftChange(event.target.value)}
        placeholder="Tell lumora how you feel..."
        disabled={disabled}
        className="composer-input"
      />
      <button className="send-button" type="submit" disabled={disabled}>
        <ArrowUpIcon className="h-5 w-5" />
      </button>
    </form>
  );
}

export default Composer;
