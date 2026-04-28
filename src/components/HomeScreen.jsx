import AppHeader from "./AppHeader";
import { getSessionPreview, formatSessionTime } from "../utils/chat";

function HomeScreen({
  currentUser,
  onNewChat,
  onOpenChat,
  onOpenPrivacy,
  onOpenSettings,
  onSignOut,
  sessions,
}) {
  return (
    <div className="app-shell app-shell-home">
      <AppHeader
        currentUser={currentUser}
        onOpenPrivacy={onOpenPrivacy}
        onOpenSettings={onOpenSettings}
        onSignOut={onSignOut}
      />

      <section className="chat-home">
        <div className="chat-home-intro">
          <p className="section-kicker">Chats</p>
          <h1 className="landing-serif text-4xl text-black">
            Your conversations
          </h1>
          <p className="chat-home-copy">
            Pick up where you left off, or start a fresh reflection.
          </p>
        </div>

        <div className="chat-home-surface">
          {sessions.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-orb" />
              <p className="empty-state-copy">
                No chats yet. Start your first private conversation.
              </p>
              <button
                className="solid-button"
                type="button"
                onClick={onNewChat}
              >
                New chat
              </button>
            </div>
          ) : (
            <>
              <div className="chat-home-toolbar">
                <p className="text-sm font-medium text-black/55">
                  {sessions.length} {sessions.length === 1 ? "chat" : "chats"}
                </p>
                <button
                  className="solid-button"
                  type="button"
                  onClick={onNewChat}
                >
                  New chat
                </button>
              </div>

              <div className="chat-list">
                {sessions.map((session) => (
                  <button
                    key={session.id}
                    className="chat-list-item"
                    type="button"
                    onClick={() => onOpenChat(session.id)}
                  >
                    <div>
                      <p className="chat-list-title">{session.title}</p>
                      <p className="chat-list-copy">
                        {getSessionPreview(session.messages)}
                      </p>
                    </div>
                    <span className="chat-list-time">
                      {formatSessionTime(session.updatedAt)}
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default HomeScreen;
