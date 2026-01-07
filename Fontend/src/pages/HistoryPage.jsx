import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "../components/PageTransition";
import { personalities } from "../utils/personalities";
import { useAuth } from "../context/AuthContext";

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    // Only fetch if authenticated
    if (!isAuthenticated || !user) {
      setHistory([]);
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
          setHistory([]);
          return;
        }
        const json = await res.json();
        setHistory(Array.isArray(json) ? json : [json]);
      } catch (err) {
        console.error(err);
        setHistory([]);
      }
    };

    fetchData();
  }, [isAuthenticated, user]);

  const clearHistory = () => {
    if (!user) return;
    setHistory([]);
    //delete request to backend
    fetch(`http://localhost:5000/result/${user.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <PageTransition>
      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
          background: "#fdfbf7",
          paddingTop: "120px",
          paddingBottom: "4rem",
        }}
      >
        {/* Background Blobs */}
        <div
          className="blob blob-1"
          style={{ borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%" }}
        ></div>
        <div
          className="blob blob-2"
          style={{ borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }}
        ></div>
        <div
          className="blob blob-3"
          style={{ borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%" }}
        ></div>

        <div
          className="container"
          style={{ position: "relative", zIndex: 1, maxWidth: "800px" }}
        >
          <div
            className="animate-fade-in"
            style={{ textAlign: "center", marginBottom: "3rem" }}
          >
            <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
              Your History
            </h1>
            <p style={{ fontSize: "1.2rem", color: "#555" }}>
              View your past results and track your journey.
            </p>
          </div>

          {history.length === 0 ? (
            <div
              className="animate-fade-in"
              style={{
                background: "rgba(255, 255, 255, 0.4)",
                backdropFilter: "blur(12px)",
                borderRadius: "24px",
                padding: "4rem",
                textAlign: "center",
                border: "1px solid rgba(255, 255, 255, 0.6)",
              }}
            >
              <p
                style={{
                  fontSize: "1.2rem",
                  color: "#666",
                  marginBottom: "2rem",
                }}
              >
                No history found. Take the test to get started!
              </p>
              <Link to="/quiz" className="btn btn-primary">
                Take Quiz
              </Link>
            </div>
          ) : (
            <div
              className="animate-fade-in"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              {history.map((item, index) => {
                const pData = personalities[item.res] || {};
                return (
                  <div
                    key={index}
                    onClick={() => setSelectedResult(item)}
                    style={{
                      background: "rgba(255, 255, 255, 0.6)",
                      backdropFilter: "blur(12px)",
                      borderRadius: "16px",
                      padding: "1.5rem 2rem",
                      border: "1px solid rgba(255, 255, 255, 0.8)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "pointer",
                      transition: "transform 0.2s ease, box-shadow 0.2s ease",
                      boxShadow: "0 4px 6px rgba(0,0,0,0.02)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow =
                        "0 10px 20px rgba(0,0,0,0.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 6px rgba(0,0,0,0.02)";
                    }}
                  >
                    <div>
                      <h3
                        className="text-gradient"
                        style={{ fontSize: "1.8rem", marginBottom: "0.2rem" }}
                      >
                        {item.res}
                      </h3>
                      <span style={{ fontSize: "1rem", color: "#666" }}>
                        {pData.name}
                      </span>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div
                        style={{
                          fontSize: "0.9rem",
                          color: "#888",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {formatDate(item.date)}
                      </div>
                      <span
                        style={{
                          fontSize: "0.9rem",
                          color: "#4facfe",
                          fontWeight: "600",
                        }}
                      >
                        View Details →
                      </span>
                    </div>
                  </div>
                );
              })}

              <div style={{ textAlign: "center", marginTop: "2rem" }}>
                <button
                  onClick={clearHistory}
                  className="btn btn-secondary"
                  style={{ padding: "0.8rem 2rem" }}
                >
                  Clear History
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedResult && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedResult(null)}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0,0,0,0.5)",
                backdropFilter: "blur(5px)",
                zIndex: 1000,
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
                  maxWidth: "800px",
                  width: "100%",
                  maxHeight: "90vh",
                  overflowY: "auto",
                  position: "relative",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
                }}
              >
                <button
                  onClick={() => setSelectedResult(null)}
                  style={{
                    position: "absolute",
                    top: "1.5rem",
                    right: "1.5rem",
                    background: "none",
                    border: "none",
                    fontSize: "2rem",
                    cursor: "pointer",
                    color: "#999",
                  }}
                >
                  &times;
                </button>

                {(() => {
                  const pData = personalities[selectedResult.res] || {};
                  return (
                    <>
                      <div
                        style={{ textAlign: "center", marginBottom: "2rem" }}
                      >
                        <span
                          style={{
                            textTransform: "uppercase",
                            letterSpacing: "2px",
                            fontSize: "0.8rem",
                            fontWeight: "600",
                            color: "#666",
                          }}
                        >
                          Result from {formatDate(selectedResult.date)}
                        </span>
                        <h2
                          className="text-gradient"
                          style={{
                            fontSize: "4rem",
                            lineHeight: 1,
                            margin: "1rem 0",
                          }}
                        >
                          {selectedResult.res}
                        </h2>
                        <h3 style={{ fontSize: "1.5rem", color: "#444" }}>
                          {pData.name}
                        </h3>
                      </div>

                      <p
                        style={{
                          fontSize: "1.1rem",
                          color: "#555",
                          lineHeight: "1.6",
                          marginBottom: "2rem",
                        }}
                      >
                        {pData.description}
                      </p>

                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: "2rem",
                          marginBottom: "2rem",
                        }}
                      >
                        <div>
                          <h4
                            style={{ color: "#4facfe", marginBottom: "0.5rem" }}
                          >
                            Strengths
                          </h4>
                          <ul style={{ paddingLeft: "1.2rem", color: "#555" }}>
                            {pData.strengths?.map((s, i) => (
                              <li key={i} style={{ marginBottom: "0.3rem" }}>
                                {s}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4
                            style={{ color: "#f093fb", marginBottom: "0.5rem" }}
                          >
                            Weaknesses
                          </h4>
                          <ul style={{ paddingLeft: "1.2rem", color: "#555" }}>
                            {pData.weaknesses?.map((w, i) => (
                              <li key={i} style={{ marginBottom: "0.3rem" }}>
                                {w}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div style={{ textAlign: "center" }}>
                        <button
                          onClick={() => setSelectedResult(null)}
                          className="btn btn-primary"
                        >
                          Close
                        </button>
                      </div>
                    </>
                  );
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
};

export default HistoryPage;
