import { useState } from "react";
import { SparkIcon, SettingsIcon, ShieldIcon, UserIcon } from "./icons";

function AppHeader({
  currentUser,
  leftAction,
  onOpenPrivacy,
  onOpenSettings,
  onSignOut,
  secondaryAction,
}) {
  const [profileOpen, setProfileOpen] = useState(false);
  const displayName =
    currentUser?.user_metadata?.display_name ||
    currentUser?.email ||
    "Lumora user";
  const initials = getInitials(displayName);

  return (
    <header className="app-header">
      <div className="app-header-side">{leftAction}</div>

      <div className="brand-lockup">
        <div className="brand-mark">
          <SparkIcon className="h-5 w-5" />
        </div>
        <div>
          <p className="brand-name">lumora</p>
          <p className="brand-subtitle">Private reflection</p>
        </div>
      </div>

      <div className="app-header-side app-header-side-right">
        {secondaryAction}
        <div className="profile-menu">
          <button
            className="profile-button"
            type="button"
            onClick={() => setProfileOpen((current) => !current)}
            aria-expanded={profileOpen}
            aria-label="Open profile menu"
          >
            <span>{initials}</span>
          </button>

          {profileOpen && (
            <div className="profile-popover">
              <div className="profile-popover-head">
                <span className="profile-popover-avatar">{initials}</span>
                <div>
                  <strong>{displayName}</strong>
                  <p>{currentUser?.email || "Signed in"}</p>
                </div>
              </div>
              <button type="button" onClick={onOpenSettings}>
                <SettingsIcon className="h-4 w-4" />
                Settings
              </button>
              <button type="button" onClick={onOpenPrivacy}>
                <ShieldIcon className="h-4 w-4" />
                Privacy
              </button>
              <button type="button" onClick={onSignOut}>
                <UserIcon className="h-4 w-4" />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
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

export default AppHeader;
