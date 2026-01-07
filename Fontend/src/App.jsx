import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import AuthModal from "./components/AuthModal";
import LandingPage from "./pages/LandingPage";
import InstructionPage from "./pages/InstructionPage";
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage";
import AboutPage from "./pages/AboutPage";
import HistoryPage from "./pages/HistoryPage";
import NotFoundPage from "./pages/NotFoundPage";

import Footer from "./components/Footer";

function App() {
  const location = useLocation();

  return (
    <AuthProvider>
      <Navbar />
      <AuthModal />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/instructions" element={<InstructionPage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/result" element={<ResultPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AnimatePresence>
      </div>
      <Footer />
    </AuthProvider>
  );
}

export default App;
