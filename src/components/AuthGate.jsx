import { useEffect, useState } from "react";
import { isSupabaseConfigured, supabase } from "../supabase";
import { BackIcon, SparkIcon } from "./icons";

function AuthGate({ initialMode, onBack }) {
  const [mode, setMode] = useState(initialMode);
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isLogin = mode === "log in";
  const isSignup = mode === "sign up";

  useEffect(() => {
    setMode(initialMode);
    setStatus("");
  }, [initialMode]);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!isSupabaseConfigured) {
      setStatus(
        "Supabase is not connected yet. Paste your project URL and anon key in src/supabase.js.",
      );
      return;
    }

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email")).trim();
    const password = String(formData.get("password"));
    const displayName = String(formData.get("displayName") || "").trim();

    setIsSubmitting(true);
    setStatus("");

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              display_name: displayName,
            },
          },
        });
        if (error) throw error;
        if (!data.session) {
          setStatus("Account created. Please confirm your email, then log in.");
        }
      }
    } catch (error) {
      setStatus(getAuthErrorMessage(error, isLogin));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="auth-page">
      <button className="auth-back-button" type="button" onClick={onBack}>
        <BackIcon className="h-4 w-4" />
        <span>Back</span>
      </button>

      <section className="auth-layout">
        <div className="auth-story">
          <div className="auth-brand">
            <div className="brand-mark">
              <SparkIcon className="h-5 w-5" />
            </div>
            <span>lumora</span>
          </div>
          <h1 className="landing-serif">
            Begin with a space that does not rush you.
          </h1>
          <p>
            Create an account to keep your conversations close, private, and
            ready whenever your thoughts need somewhere softer to land.
          </p>
        </div>

        <div className="auth-card">
          <div className="auth-tabs">
            <button
              className={`auth-tab ${isLogin ? "auth-tab-active" : ""}`}
              type="button"
              onClick={() => setMode("log in")}
            >
              Log in
            </button>
            <button
              className={`auth-tab ${isSignup ? "auth-tab-active" : ""}`}
              type="button"
              onClick={() => setMode("sign up")}
            >
              Sign up
            </button>
          </div>

          <div className="auth-copy">
            <p className="section-kicker">
              {isLogin ? "Welcome back" : "Start free"}
            </p>
            <h2 className="landing-serif">
              {isLogin ? "Return to Lumora." : "Create your account."}
            </h2>
            <p>
              {isLogin
                ? "Use the email and password connected to your Lumora account."
                : "Choose your email, password, and the name Lumora should use."}
            </p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label className="auth-field">
              <span>Email</span>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </label>
            <label className="auth-field">
              <span>Password</span>
              <input
                name="password"
                type="password"
                placeholder="Eight characters or more"
                minLength="8"
                autoComplete={isLogin ? "current-password" : "new-password"}
                required
              />
            </label>
            {isSignup && (
              <label className="auth-field">
                <span>Name</span>
                <input
                  name="displayName"
                  type="text"
                  placeholder="What should Lumora call you?"
                  minLength="2"
                  maxLength="40"
                  autoComplete="nickname"
                  required
                />
              </label>
            )}

            {status && (
              <p className="auth-status" role="alert">
                {status}
              </p>
            )}

            <button
              className="solid-button w-full"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Checking..." : isLogin ? "Log in" : "Sign up"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

function getAuthErrorMessage(error, isLogin) {
  const message = error?.message?.toLowerCase() ?? "";

  if (message.includes("invalid login credentials")) {
    return isLogin
      ? "No account was found for these credentials. Please sign up first."
      : "These credentials could not be used. Try another email.";
  }

  if (
    message.includes("already registered") ||
    message.includes("already exists")
  ) {
    return "This email already has an account. Please log in instead.";
  }

  if (message.includes("password")) {
    return isLogin
      ? "That password does not match this account."
      : "Please use a password with at least 8 characters.";
  }

  if (message.includes("email")) {
    return "Please enter a valid email address.";
  }

  if (message.includes("rate limit")) {
    return "Too many attempts. Please wait a moment and try again.";
  }

  if (message.includes("fetch") || message.includes("failed")) {
    return "Supabase could not be reached. Check your project URL and anon key.";
  }

  return "Something went wrong. Please try again.";
}

export default AuthGate;
