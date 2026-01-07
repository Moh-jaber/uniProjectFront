import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const AuthModal = () => {
  const {
    showAuthModal,
    setShowAuthModal,
    login,
    signup,
    pendingAction,
    setPendingAction,
  } = useAuth();
  const [mode, setMode] = useState("login"); // "login" or "signup"
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const resetForm = () => {
    setEmail("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setError("");
    setMode("login");
  };

  const handleClose = () => {
    setShowAuthModal(false);
    setPendingAction(null);
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (mode === "signup") {
        if (password !== confirmPassword) {
          setError("Passwords do not match");
          setIsLoading(false);
          return;
        }
        if (username.length < 2) {
          setError("Username must be at least 2 characters");
          setIsLoading(false);
          return;
        }
        await signup(email, password, username);
      } else {
        await login(email, password);
      }

      // Success! Close modal
      setShowAuthModal(false);
      resetForm();

      // Execute pending action if exists
      if (pendingAction) {
        pendingAction();
        setPendingAction(null);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "1rem 1.25rem",
    border: "2px solid #e5e5e5",
    borderRadius: "12px",
    fontSize: "1rem",
    outline: "none",
    transition: "all 0.2s ease",
    background: "#fafafa",
  };

  const inputFocusStyle = {
    borderColor: "#667eea",
    background: "#fff",
  };

  return (
    <AnimatePresence>
      {showAuthModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(5px)",
            zIndex: 2000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: "24px",
              padding: "3rem",
              maxWidth: "450px",
              maxHeight: "90vh",
              overflow: "auto",
              width: "100%",
              position: "relative",
              boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
            }}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              style={{
                position: "absolute",
                top: "1.5rem",
                right: "1.5rem",
                background: "none",
                border: "none",
                fontSize: "1.5rem",
                cursor: "pointer",
                color: "#999",
                lineHeight: 1,
              }}
            >
              &times;
            </button>

            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <h2
                className="text-gradient"
                style={{
                  fontSize: "2rem",
                  marginBottom: "0.5rem",
                }}
              >
                {mode === "login" ? "Welcome Back" : "Create Account"}
              </h2>
              <p style={{ color: "#666", fontSize: "1rem", margin: 0 }}>
                {mode === "login"
                  ? "Sign in to save your quiz results"
                  : "Sign up to track your personality journey"}
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div
                style={{
                  background: "#fff5f5",
                  border: "1px solid #feb2b2",
                  color: "#c53030",
                  padding: "1rem",
                  borderRadius: "12px",
                  marginBottom: "1.5rem",
                  fontSize: "0.9rem",
                }}
              >
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "1.25rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "500",
                    color: "#333",
                  }}
                >
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  style={inputStyle}
                  onFocus={(e) =>
                    Object.assign(e.target.style, inputFocusStyle)
                  }
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e5e5e5";
                    e.target.style.background = "#fafafa";
                  }}
                />
              </div>

              {mode === "signup" && (
                <div style={{ marginBottom: "1.25rem" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                      color: "#333",
                    }}
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Your display name"
                    required
                    minLength={2}
                    style={inputStyle}
                    onFocus={(e) =>
                      Object.assign(e.target.style, inputFocusStyle)
                    }
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e5e5e5";
                      e.target.style.background = "#fafafa";
                    }}
                  />
                </div>
              )}

              <div style={{ marginBottom: "1.25rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "500",
                    color: "#333",
                  }}
                >
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  style={inputStyle}
                  onFocus={(e) =>
                    Object.assign(e.target.style, inputFocusStyle)
                  }
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e5e5e5";
                    e.target.style.background = "#fafafa";
                  }}
                />
              </div>

              {mode === "signup" && (
                <div style={{ marginBottom: "1.25rem" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                      color: "#333",
                    }}
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={6}
                    style={inputStyle}
                    onFocus={(e) =>
                      Object.assign(e.target.style, inputFocusStyle)
                    }
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e5e5e5";
                      e.target.style.background = "#fafafa";
                    }}
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary"
                style={{
                  width: "100%",
                  marginBottom: "1.5rem",
                  opacity: isLoading ? 0.7 : 1,
                  cursor: isLoading ? "not-allowed" : "pointer",
                }}
              >
                {isLoading
                  ? "Please wait..."
                  : mode === "login"
                  ? "Sign In"
                  : "Create Account"}
              </button>
            </form>

            {/* Toggle Mode */}
            <div style={{ textAlign: "center" }}>
              <span style={{ color: "#666" }}>
                {mode === "login"
                  ? "Don't have an account? "
                  : "Already have an account? "}
              </span>
              <button
                onClick={() => {
                  setMode(mode === "login" ? "signup" : "login");
                  setError("");
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: "#667eea",
                  fontWeight: "600",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
              >
                {mode === "login" ? "Sign Up" : "Sign In"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
