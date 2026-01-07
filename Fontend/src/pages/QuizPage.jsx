import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import { useAuth } from "../context/AuthContext";

// Questions mapped to dimensions: E/I, S/N, T/F, J/P
// Each question adds points to one side.
// Positive score -> First letter (E, S, T, J)
// Negative score -> Second letter (I, N, F, P)
const questions = [
  // E vs I
  {
    id: 1,
    text: "You usually feel exhausted after spending time with a large group of people.",
    dimension: "EI",
    direction: -1, // Agreeing points to Introversion
  },
  {
    id: 2,
    text: "You enjoy going to social events that involve many people.",
    dimension: "EI",
    direction: 1, // Agreeing points to Extraversion
  },
  {
    id: 3,
    text: "You tend to initiate conversations.",
    dimension: "EI",
    direction: 1,
  },
  // S vs N
  {
    id: 4,
    text: "You often rely more on your experience than your imagination.",
    dimension: "SN",
    direction: 1, // Sensing
  },
  {
    id: 5,
    text: "You are more interested in what is possible than what is actual.",
    dimension: "SN",
    direction: -1, // Intuition
  },
  {
    id: 6,
    text: "You prefer to focus on the big picture rather than the details.",
    dimension: "SN",
    direction: -1,
  },
  // T vs F
  {
    id: 7,
    text: "You prioritize logic over feelings when making decisions.",
    dimension: "TF",
    direction: 1, // Thinking
  },
  {
    id: 8,
    text: "You are easily affected by other people's emotions.",
    dimension: "TF",
    direction: -1, // Feeling
  },
  {
    id: 9,
    text: "Efficiency is more important to you than harmony.",
    dimension: "TF",
    direction: 1,
  },
  // J vs P
  {
    id: 10,
    text: "You prefer to have a detailed plan before starting a project.",
    dimension: "JP",
    direction: 1, // Judging
  },
  {
    id: 11,
    text: "You like to keep your options open and be flexible.",
    dimension: "JP",
    direction: -1, // Perceiving
  },
  {
    id: 12,
    text: "You work better in bursts of energy than with a steady schedule.",
    dimension: "JP",
    direction: -1,
  },
];

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({ EI: 0, SN: 0, TF: 0, JP: 0 });
  const [isFinished, setIsFinished] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated, setShowAuthModal, setPendingAction } = useAuth();

  const handleAnswer = (value) => {
    // Value is -1 (Disagree), 0 (Neutral), 1 (Agree)
    // Or simplified: just Agree (1) / Disagree (-1) for this UI
    // Let's use a scale: Strongly Disagree (-2) to Strongly Agree (+2)

    const question = questions[currentQuestion];
    const points = value * question.direction;

    const newScores = {
      ...scores,
      [question.dimension]: scores[question.dimension] + points,
    };
    setScores(newScores);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsFinished(true);
    }
  };

  const saveResultAndNavigate = (type, userId) => {
    // Save result to backend
    fetch("http://localhost:5000/result", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: userId,
        date: new Date().toISOString(),
        result: type,
      }),
    });

    navigate("/result", { state: { result: type } });
  };

  const finishQuiz = () => {
    const finalScores = scores;
    const type = [
      finalScores.EI >= 0 ? "E" : "I",
      finalScores.SN >= 0 ? "S" : "N",
      finalScores.TF >= 0 ? "T" : "F",
      finalScores.JP >= 0 ? "J" : "P",
    ].join("");

    // Check if user is authenticated
    if (!isAuthenticated) {
      // Set pending action to be executed after login
      setPendingAction(() => () => {
        // Get user ID from auth context after login
        const authUser = JSON.parse(localStorage.getItem("auth_user"));
        if (authUser) {
          saveResultAndNavigate(type, authUser.id);
        } else {
          // Fallback: just navigate without saving
          navigate("/result", { state: { result: type } });
        }
      });
      // Show auth modal
      setShowAuthModal(true);
      return;
    }

    // User is authenticated, save and navigate
    saveResultAndNavigate(type, user.id);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

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
          style={{ position: "relative", zIndex: 1, maxWidth: "900px" }}
        >
          <div
            className="animate-fade-in"
            style={{
              background: "rgba(255, 255, 255, 0.4)",
              backdropFilter: "blur(12px)",
              borderRadius: "24px",
              padding: "4rem",
              border: "1px solid rgba(255, 255, 255, 0.6)",
              boxShadow: "0 8px 32px rgba(31, 38, 135, 0.05)",
              textAlign: "center",
            }}
          >
            {!isFinished ? (
              <>
                {/* Progress Bar */}
                <div style={{ marginBottom: "3rem" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "0.5rem",
                      color: "#666",
                      fontSize: "0.9rem",
                      fontWeight: "500",
                    }}
                  >
                    <span>
                      Question {currentQuestion + 1} of {questions.length}
                    </span>
                    <span>{Math.round(progress)}% Completed</span>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      background: "rgba(255,255,255,0.5)",
                      height: "10px",
                      borderRadius: "5px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${progress}%`,
                        background: "var(--primary-gradient)",
                        height: "100%",
                        borderRadius: "5px",
                        transition: "width 0.5s ease",
                      }}
                    ></div>
                  </div>
                </div>

                <h2
                  style={{
                    margin: "0 0 3rem 0",
                    fontSize: "2.5rem",
                    lineHeight: "1.3",
                  }}
                >
                  {questions[currentQuestion].text}
                </h2>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1.5rem",
                  }}
                >
                  <button
                    onClick={() => handleAnswer(2)}
                    className="option-card"
                    style={{
                      background: "white",
                      border: "2px solid transparent",
                      borderRadius: "16px",
                      padding: "2rem",
                      fontSize: "1.2rem",
                      fontWeight: "600",
                      color: "#4facfe",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.style.boxShadow =
                        "0 10px 20px rgba(0,0,0,0.1)";
                      e.currentTarget.style.borderColor = "#4facfe";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 10px rgba(0,0,0,0.05)";
                      e.currentTarget.style.borderColor = "transparent";
                    }}
                  >
                    <span style={{ fontSize: "1.5rem" }}>👍</span> Strongly
                    Agree
                  </button>

                  <button
                    onClick={() => handleAnswer(1)}
                    className="option-card"
                    style={{
                      background: "white",
                      border: "2px solid transparent",
                      borderRadius: "16px",
                      padding: "2rem",
                      fontSize: "1.2rem",
                      fontWeight: "600",
                      color: "#666",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.style.boxShadow =
                        "0 10px 20px rgba(0,0,0,0.1)";
                      e.currentTarget.style.borderColor = "#ccc";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 10px rgba(0,0,0,0.05)";
                      e.currentTarget.style.borderColor = "transparent";
                    }}
                  >
                    Agree
                  </button>

                  <button
                    onClick={() => handleAnswer(-1)}
                    className="option-card"
                    style={{
                      background: "white",
                      border: "2px solid transparent",
                      borderRadius: "16px",
                      padding: "2rem",
                      fontSize: "1.2rem",
                      fontWeight: "600",
                      color: "#666",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.style.boxShadow =
                        "0 10px 20px rgba(0,0,0,0.1)";
                      e.currentTarget.style.borderColor = "#ccc";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 10px rgba(0,0,0,0.05)";
                      e.currentTarget.style.borderColor = "transparent";
                    }}
                  >
                    Disagree
                  </button>

                  <button
                    onClick={() => handleAnswer(-2)}
                    className="option-card"
                    style={{
                      background: "white",
                      border: "2px solid transparent",
                      borderRadius: "16px",
                      padding: "2rem",
                      fontSize: "1.2rem",
                      fontWeight: "600",
                      color: "#ff6b6b",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.style.boxShadow =
                        "0 10px 20px rgba(0,0,0,0.1)";
                      e.currentTarget.style.borderColor = "#ff6b6b";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 10px rgba(0,0,0,0.05)";
                      e.currentTarget.style.borderColor = "transparent";
                    }}
                  >
                    <span style={{ fontSize: "1.5rem" }}>👎</span> Strongly
                    Disagree
                  </button>
                </div>
              </>
            ) : (
              <div
                style={{
                  padding: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "2rem",
                }}
              >
                <div style={{ fontSize: "4rem" }}>🎉</div>
                <h2 style={{ fontSize: "2.5rem", margin: 0 }}>
                  Quiz Completed!
                </h2>
                <p style={{ fontSize: "1.2rem", color: "#666", maxWidth: "600px" }}>
                  You've answered all the questions. Ready to see your personality type?
                </p>
                <button
                  onClick={finishQuiz}
                  style={{
                    background: "var(--primary-gradient)",
                    color: "white",
                    border: "none",
                    borderRadius: "50px",
                    padding: "1rem 3rem",
                    fontSize: "1.2rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    boxShadow: "0 10px 20px rgba(79, 172, 254, 0.3)",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 15px 25px rgba(79, 172, 254, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 10px 20px rgba(79, 172, 254, 0.3)";
                  }}
                >
                  See Results
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default QuizPage;
