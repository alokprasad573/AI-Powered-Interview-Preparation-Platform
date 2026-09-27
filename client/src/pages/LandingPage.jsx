import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { APP_FEATURES } from "../utils/data";
import {
  LuSparkles,
  LuArrowRight,
  LuBrain,
  LuCheckCircle2,
  LuLayers,
  LuShieldCheck,
  LuCode2,
  LuHelpCircle,
  LuChevronDown,
  LuGithub,
} from "react-icons/lu";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Modal from "../components/Modal";
import { UserContext } from "../context/userContext";
import ProfileInfoCard from "../components/cards/ProfileInfoCard";

const TECH_BADGES = [
  { name: "Google Gemini 1.5", color: "text-purple-600 bg-purple-50 border-purple-200" },
  { name: "React 18", color: "text-sky-600 bg-sky-50 border-sky-200" },
  { name: "Node.js & Express", color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
  { name: "MongoDB Atlas", color: "text-green-600 bg-green-50 border-green-200" },
  { name: "AWS S3 Storage", color: "text-amber-600 bg-amber-50 border-amber-200" },
  { name: "Tailwind CSS", color: "text-cyan-600 bg-cyan-50 border-cyan-200" },
  { name: "Framer Motion", color: "text-indigo-600 bg-indigo-50 border-indigo-200" },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Define Target Role & Topics",
    desc: "Specify your role (e.g. Frontend, Backend, Fullstack), years of experience, and focus technologies like React, System Design, or Docker.",
  },
  {
    step: "02",
    title: "Simulate Real Interview Sets",
    desc: "Practice realistic, high-probability questions with model answers, complete with difficulty indicators and expandable solutions.",
  },
  {
    step: "03",
    title: "Unlock Instant Concept Explanations",
    desc: "Click 'Explain Concept' anytime to trigger an in-depth AI breakdown with architecture diagrams, code snippets, and common pitfalls.",
  },
];

const FAQS = [
  {
    q: "How does the AI personalize interview questions?",
    a: "PrepInt engineers structured schema prompts for Google's Gemini model using your specific designation, experience level, and focus topics to simulate authentic interview rounds.",
  },
  {
    q: "Can I save my sessions and revise later?",
    a: "Yes! Every session, question set, pin, and note is securely stored in your personal MongoDB database account so you can revisit anytime.",
  },
  {
    q: "Is there a limit on how many questions I can generate?",
    a: "You can create customized sessions with your desired question counts and use the 'Load More Questions' button anytime to practice additional rounds.",
  },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");
  const [openFaq, setOpenFaq] = useState(null);

  const openAuth = (mode = "login") => {
    setCurrentPage(mode);
    setOpenAuthModal(true);
  };

  const handleCTA = () => {
    if (!user) {
      openAuth("signup");
    } else {
      navigate("/dashboard");
    }
  };

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      {/* Background Ambient Glows */}
      <div className="w-[500px] h-[500px] bg-indigo-200/40 rounded-full blur-[120px] pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 -z-10" />
      <div className="w-[400px] h-[400px] bg-purple-200/30 rounded-full blur-[140px] pointer-events-none absolute top-[600px] right-0 -z-10" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Bar */}
        <header className="flex items-center justify-between py-6 border-b border-slate-200/60">
          <div className="flex items-center gap-3">
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

          {/* Center Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-slate-600">
            <a href="#features" className="hover:text-indigo-600 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-indigo-600 transition-colors">
              How It Works
            </a>
            <a href="#faq" className="hover:text-indigo-600 transition-colors">
              FAQ
            </a>
            <a
              href="https://github.com/alokprasad573/AI-Powered-Interview-Preparation-Web-Application"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-900 transition-colors"
            >
              <LuGithub className="text-sm" /> GitHub
            </a>
          </nav>

          {/* Right Action */}
          <div className="flex items-center gap-3">
            {user ? (
              <ProfileInfoCard />
            ) : (
              <>
                <button
                  className="hidden sm:inline-flex text-xs font-semibold text-slate-700 hover:text-indigo-600 px-3 py-2 cursor-pointer transition-colors"
                  onClick={() => openAuth("login")}
                >
                  Sign In
                </button>
                <button
                  className="bg-slate-900 hover:bg-indigo-600 text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
                  onClick={() => openAuth("signup")}
                >
                  Get Started
                </button>
              </>
            )}
          </div>
        </header>

        {/* Hero Section */}
        <section className="text-center pt-16 sm:pt-24 pb-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200/80 px-4 py-1.5 rounded-full mb-6 shadow-2xs">
            <LuSparkles className="text-indigo-600" />
            <span>AI-Powered Technical Interview Simulator</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.12] mb-6">
            Master Technical Interviews with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600">
              Targeted AI Practice
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl mx-auto">
            Generate role-specific interview simulations, unlock on-demand concept explanations, and track your progress with realistic technical questions powered by Google Gemini.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-12">
            <button
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-8 py-3.5 rounded-xl shadow-md shadow-indigo-500/20 active:scale-[0.98] transition-all cursor-pointer"
              onClick={handleCTA}
            >
              <span>{user ? "Go to Dashboard" : "Start Practicing Free"}</span>
              <LuArrowRight className="text-base" />
            </button>

            <a
              href="#how-it-works"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/80 text-sm font-semibold px-7 py-3.5 rounded-xl shadow-2xs transition-colors cursor-pointer"
            >
              <span>See How It Works</span>
            </a>
          </div>

          {/* Social Proof / Tech Stack Strip */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {TECH_BADGES.map((badge, idx) => (
              <span
                key={idx}
                className={`text-[11px] font-semibold px-3 py-1 rounded-full border ${badge.color}`}
              >
                {badge.name}
              </span>
            ))}
          </div>
        </section>

        {/* Product Workspace Preview Mockup */}
        <section className="mb-28 max-w-5xl mx-auto">
          <div className="rounded-2xl border border-slate-200/80 bg-white shadow-2xl shadow-indigo-500/8 p-4 sm:p-6 overflow-hidden">
            {/* Window Topbar */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="text-xs text-slate-400 font-mono ml-2">
                  prepint.dev/interview-prep/fullstack-lead
                </span>
              </div>
              <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Active Simulation
              </span>
            </div>

            {/* Mock Header */}
            <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider">
                  Target Session
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Senior Full Stack Engineer
                </h3>
                <p className="text-xs text-slate-500">React, Node.js, System Design, Microservices</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold bg-white border border-slate-200 px-3 py-1 rounded-lg text-slate-700">
                  5+ Years Exp
                </span>
                <span className="text-xs font-semibold bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-lg text-indigo-700">
                  10 Q&A Bank
                </span>
              </div>
            </div>

            {/* Mock Questions */}
            <div className="space-y-3">
              <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/30 flex items-start justify-between gap-3">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.2 rounded-md">
                      Medium
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">Q1</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-850">
                    How does Node.js event loop handle asynchronous I/O operations under high concurrent traffic?
                  </p>
                </div>
                <span className="text-xs font-semibold text-indigo-600 bg-white px-3 py-1.5 rounded-lg border border-indigo-200 shrink-0 shadow-2xs">
                  Explain Concept 💡
                </span>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-white flex items-start justify-between gap-3">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.2 rounded-md">
                      Hard
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">Q2</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-700">
                    Design a scalable rate-limiter using Redis token-bucket algorithm for microservices.
                  </p>
                </div>
                <span className="text-xs text-slate-400 shrink-0">Expand ▼</span>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="mb-28">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 block mb-1">
              Workflow
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
              How PrepInt Works in 3 Simple Steps
            </h2>
            <p className="text-sm text-slate-500">
              No generic questionnaires. Everything is tailored dynamically to your career ambitions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HOW_IT_WORKS.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-xs hover:border-indigo-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="text-2xl font-black text-indigo-600 mb-4 font-mono">
                    {item.step}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="mb-28">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 block mb-1">
              Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
              Features Built for Serious Developers
            </h2>
            <p className="text-sm text-slate-500">
              Designed to help you bridge the gap between building software and interviewing confidently.
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

        {/* FAQ Section */}
        <section id="faq" className="mb-28 max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 block mb-1">
              FAQ
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-500">
              Have questions? We have answers.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-2xs"
              >
                <button
                  type="button"
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm text-slate-900 cursor-pointer"
                  onClick={() => toggleFaq(idx)}
                >
                  <span>{faq.q}</span>
                  <LuChevronDown
                    className={`transform transition-transform duration-200 shrink-0 text-slate-400 ${
                      openFaq === idx ? "rotate-180 text-indigo-600" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <section className="mb-20">
          <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-14 text-center relative overflow-hidden shadow-xl">
            <div className="w-[300px] h-[300px] bg-indigo-500/20 rounded-full blur-[90px] absolute top-0 left-1/2 -translate-x-1/2 -z-0" />

            <div className="relative z-10 max-w-xl mx-auto">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 bg-white/10 px-3.5 py-1 rounded-full mb-4">
                <LuSparkles className="text-xs" /> Start Now • 100% Free
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
                Ready to Ace Your Next Interview?
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mb-8 leading-relaxed">
                Create a customized session in 30 seconds and master tricky concepts with AI assistance.
              </p>
              <button
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
                onClick={handleCTA}
              >
                {user ? "Open Your Dashboard" : "Create Free Account"}
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-200/80 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-slate-900 flex items-center justify-center p-1">
              <img
                src="/prepInt.svg"
                alt="PrepInt"
                className="w-full h-full filter invert brightness-0"
              />
            </div>
            <span className="font-semibold text-slate-800">PrepInt</span>
            <span>• AI-Powered Interview Preparation Platform</span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href="https://github.com/alokprasad573/AI-Powered-Interview-Preparation-Web-Application"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-900 transition-colors"
            >
              GitHub Repository
            </a>
            <span>© {new Date().getFullYear()} All rights reserved.</span>
          </div>
        </footer>
      </div>

      {/* Tabbed Auth Modal */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div className="w-full">
          {/* Top Tab Switcher */}
          <div className="flex items-center justify-center p-1 bg-slate-100 rounded-xl mb-5">
            <button
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                currentPage === "login"
                  ? "bg-white text-slate-900 shadow-2xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
              onClick={() => setCurrentPage("login")}
            >
              Sign In
            </button>
            <button
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                currentPage === "signup"
                  ? "bg-white text-slate-900 shadow-2xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
              onClick={() => setCurrentPage("signup")}
            >
              Create Account
            </button>
          </div>

          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && <SignUp setCurrentPage={setCurrentPage} />}
        </div>
      </Modal>
    </div>
  );
};

export default LandingPage;
