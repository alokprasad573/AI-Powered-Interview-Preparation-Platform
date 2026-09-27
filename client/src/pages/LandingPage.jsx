import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { APP_FEATURES } from "../utils/data";
import { LuSparkles, LuArrowRight, LuCheckCircle2 } from "react-icons/lu";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Modal from "../components/Modal";
import { UserContext } from "../context/userContext";
import ProfileInfoCard from "../components/cards/ProfileInfoCard";

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 overflow-x-hidden">
      {/* Background Glow */}
      <div className="w-[600px] h-[600px] bg-indigo-200/30 rounded-full blur-[120px] pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20">
        {/* Navigation Header */}
        <header className="flex justify-between items-center mb-16 sm:mb-20">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center p-1.5 shadow-xs">
              <img
                src="/prepInt.svg"
                alt="PrepInt"
                className="w-full h-full filter invert brightness-0"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-slate-900">
                PrepInt
              </span>
              <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full">
                AI 1.5
              </span>
            </div>
          </div>

          {user ? (
            <ProfileInfoCard />
          ) : (
            <button
              className="bg-slate-900 hover:bg-indigo-600 text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
              onClick={() => setOpenAuthModal(true)}
            >
              Sign In / Register
            </button>
          )}
        </header>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200/80 px-3.5 py-1.5 rounded-full mb-6 shadow-2xs">
            <LuSparkles className="text-indigo-600" />
            <span>AI-Powered Technical Interview Preparation</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15] mb-6">
            Ace Your Next Tech Interview with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600">
              Targeted AI Practice
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl mx-auto">
            Generate role-tailored technical questions, explore in-depth concept explanations, and track your interview mastery with realistic simulations.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-8 py-3.5 rounded-xl shadow-md shadow-indigo-500/20 active:scale-[0.98] transition-all cursor-pointer"
              onClick={handleCTA}
            >
              <span>Get Started Free</span>
              <LuArrowRight className="text-base" />
            </button>

            <button
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-sm font-semibold px-7 py-3.5 rounded-xl shadow-xs transition-colors cursor-pointer"
              onClick={handleCTA}
            >
              <span>Explore Features</span>
            </button>
          </div>
        </div>

        {/* Interactive App Mockup Preview */}
        <div className="max-w-4xl mx-auto mb-24 rounded-2xl border border-slate-200/80 bg-white shadow-xl shadow-slate-200/50 p-4 sm:p-6 overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="text-xs text-slate-400 font-mono ml-2">prepint.dev/interview-prep</span>
            </div>
            <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Active Simulation
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/30 flex items-start justify-between gap-3">
              <div className="space-y-1.5 flex-1">
                <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider">Question 01 • Core Concept</span>
                <p className="text-sm font-semibold text-slate-850">
                  How does React reconciliation and the Virtual DOM diffing algorithm optimize DOM updates?
                </p>
              </div>
              <span className="text-xs font-semibold text-indigo-600 bg-white px-3 py-1 rounded-lg border border-indigo-100 shrink-0">
                Explain Concept 💡
              </span>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white flex items-start justify-between gap-3">
              <div className="space-y-1.5 flex-1">
                <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">Question 02 • System Design</span>
                <p className="text-sm font-semibold text-slate-700">
                  Explain the trade-offs between Client-Side Rendering (CSR), Server-Side Rendering (SSR), and Static Site Generation (SSG).
                </p>
              </div>
              <span className="text-xs text-slate-400 shrink-0">Expand ▼</span>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <section className="mt-12">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-2">
              Everything You Need to Succeed
            </h2>
            <p className="text-sm text-slate-500">
              Built specifically for modern engineers preparing for rigorous technical interviews.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {APP_FEATURES.map((feature) => (
              <div
                key={feature.id}
                className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-lg mb-4">
                    <LuCheckCircle2 />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} PrepInt • AI-Powered Interview Preparation Platform. Built with ❤️ for developers.</p>
      </footer>

      {/* Authentication Modal */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div className="w-full">
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && <SignUp setCurrentPage={setCurrentPage} />}
        </div>
      </Modal>
    </div>
  );
};

export default LandingPage;
