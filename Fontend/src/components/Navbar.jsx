import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const { user, isAuthenticated, setShowAuthModal, logout } = useAuth();
  const [hasHistory, setHasHistory] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    // Only check for history if user is authenticated
    if (!isAuthenticated) {
      setHasHistory(false);
      return;
    }

    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/result/${user.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!res.ok) {
          console.error("Fetch error:", res.status);
          setHasHistory(false);
          return;
        }
        const json = await res.json();
        setHasHistory(
          Array.isArray(json) ? json.length > 0 : json ? true : false
        );
      } catch (err) {
        console.error(err);
        setHasHistory(false);
      }
    };

    fetchData();
  }, [isAuthenticated, user]);

  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1.5rem 2rem",
    background: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(10px)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    borderBottom: "1px solid rgba(0,0,0,0.05)",
  };

  const logoStyle = {
    fontSize: "1.5rem",
    fontWeight: "700",
    textDecoration: "none",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    letterSpacing: "-0.5px",
  };

  const linkStyle = (path) => ({
    textDecoration: "none",
    color: location.pathname === path ? "#1a1a1a" : "#666",
    fontWeight: location.pathname === path ? "600" : "400",
    marginLeft: "2rem",
    transition: "color 0.3s ease",
    fontSize: "1rem",
  });

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <nav style={navStyle}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: "0 2rem",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <Link to="/" style={logoStyle}>
          Personality.AI
        </Link>

        <div style={{ display: "flex", alignItems: "center" }}>
          <Link to="/" style={linkStyle("/")}>
            Home
          </Link>
          <Link to="/about" style={linkStyle("/about")}>
            About
          </Link>
          {isAuthenticated && hasHistory && (
            <Link to="/history" style={linkStyle("/history")}>
              My History
            </Link>
          )}
          <Link
            to="/instructions"
            className="btn btn-primary"
            style={{
              marginLeft: "2rem",
              padding: "0.5rem 1.5rem",
              fontSize: "0.9rem",
            }}
          >
            Start Quiz
          </Link>

          {/* Auth Section */}
          {isAuthenticated ? (
            <div style={{ position: "relative", marginLeft: "1.5rem" }}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "0.5rem",
                  borderRadius: "50px",
                  transition: "background 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(0,0,0,0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "none";
                }}
              >
                {/* Avatar placeholder */}
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: "600",
                    fontSize: "0.9rem",
                  }}
                >
                  {(user.username || user.email).charAt(0).toUpperCase()}
                </div>
                <span
                  style={{
                    color: "#333",
                    fontWeight: "500",
                    fontSize: "0.9rem",
                    maxWidth: "150px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {user.username || user.email}
                </span>
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    marginTop: "0.5rem",
                    background: "white",
                    borderRadius: "12px",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
                    padding: "0.5rem",
                    minWidth: "150px",
                    zIndex: 1001,
                  }}
                >
                  <button
                    onClick={handleLogout}
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem",
                      background: "none",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      textAlign: "left",
                      fontSize: "0.95rem",
                      color: "#e53e3e",
                      fontWeight: "500",
                      transition: "background 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#fff5f5";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "none";
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className="btn btn-secondary"
              style={{
                marginLeft: "1.5rem",
                padding: "0.5rem 1.5rem",
                fontSize: "0.9rem",
              }}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
