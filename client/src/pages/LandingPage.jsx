import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { APP_FEATURES } from "../utils/data";

import { LuSparkles, LuArrowRight, LuLock, LuShieldCheck } from "react-icons/lu";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Modal from "../components/Modal";
import HeroImage from "../../public/HeroImage.png";

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
    <div className="w-full min-h-screen bg-[#fafaf9] text-slate-900 selection:bg-amber-500 selection:text-white overflow-x-hidden">
      {/* Top Ambient Warm Glow */}
      <div className="w-full bg-gradient-to-b from-amber-50/80 via-orange-50/30 to-transparent relative pb-28 sm:pb-36 border-b border-amber-100/40">
        <div className="w-[500px] h-[500px] bg-gradient-to-br from-amber-300/25 to-orange-400/20 rounded-full blur-[110px] pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 animate-pulse-glow" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 relative z-10">
          {/* Header */}
          <header className="flex justify-between items-center mb-16 sm:mb-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center p-2 shadow-md shadow-slate-900/10">
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
                <span className="text-[11px] font-semibold text-amber-800 bg-amber-100/70 border border-amber-200 px-2 py-0.5 rounded-full">
                  AI 1.5
                </span>
              </div>
            </div>

            {user ? (
              <ProfileInfoCard />
            ) : (
              <button
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-xs sm:text-sm font-semibold text-white px-6 py-2.5 rounded-xl shadow-md shadow-amber-500/20 active:scale-[0.98] transition-all cursor-pointer"
                onClick={() => {
                  setCurrentPage("login");
                  setOpenAuthModal(true);
                }}
              >
                Login / Sign Up
              </button>
            )}
          </header>

          {/* Hero Content */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
            <div className="w-full lg:w-1/2">
              <div className="flex items-center justify-start mb-4">
                <div className="inline-flex items-center gap-2 text-xs text-amber-800 font-semibold bg-amber-100/80 px-3.5 py-1.5 rounded-full border border-amber-200/80 shadow-2xs">
                  <LuSparkles className="text-amber-600" />
                  <span>AI-Powered Interview Preparation Platform</span>
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl text-slate-900 font-bold mb-6 leading-[1.15] tracking-tight">
                Ace Interviews with <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 animate-text-shine font-extrabold">
                  AI-Powered
                </span>{" "}
                Learning
              </h1>
            </div>

            <div className="w-full lg:w-1/2">
              <p className="text-base sm:text-lg text-slate-600 mb-8 leading-relaxed">
                Get role-specific questions, expand answers when you need them,
                dive deeper into concepts, and organize everything your way.
                From preparation to mastery — your ultimate interview toolkit is
                here.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-slate-900 hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-600 text-sm font-semibold text-white px-8 py-3.5 rounded-xl shadow-lg shadow-slate-900/10 active:scale-[0.98] transition-all cursor-pointer"
                  onClick={handleCTA}
                >
                  <span>Get Started Free</span>
                  <LuArrowRight className="text-base" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image Section */}
      <div className="w-full relative z-10 px-4 sm:px-6 lg:px-8">
        <section className="flex items-center justify-center -mt-20 sm:-mt-28">
          <div className="relative w-full max-w-5xl">
            {/* Ambient Multi-Layer Warm Sunset Glow Behind Window */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-500/25 via-orange-500/20 to-amber-600/25 rounded-3xl sm:rounded-[36px] blur-2xl opacity-75 -z-10" />
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-4/5 h-24 bg-amber-400/20 blur-3xl -z-10 rounded-full" />

            {/* Main Window Frame Container */}
            <div className="relative rounded-2xl sm:rounded-3xl bg-white/85 border border-stone-200/90 shadow-[0_25px_60px_-15px_rgba(245,158,11,0.18)] backdrop-blur-xl p-2 sm:p-3 transition-transform duration-500">
              {/* Window Chrome Header Bar */}
              <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 mb-2 rounded-xl bg-stone-100/70 border border-stone-200/60 text-xs text-slate-500">
                {/* Window Dots */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-rose-400/80 border border-rose-500/30" />
                  <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-amber-400/80 border border-amber-500/30" />
                  <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-emerald-400/80 border border-emerald-500/30" />
                </div>

                {/* Center URL / Workspace Pill */}
                <div className="flex items-center gap-2 px-3 sm:px-4 py-1 rounded-lg bg-white/90 border border-stone-200/70 text-[11px] sm:text-xs font-mono text-slate-600 shadow-2xs">
                  <LuLock className="text-amber-600 text-[10px] sm:text-xs" />
                  <span className="text-slate-400 hidden xs:inline">https://</span>
                  <span className="font-semibold text-slate-800">prepint.dev</span>
                  <span className="text-slate-400">/workspace</span>
                </div>

                {/* Right Status Badge */}
                <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="hidden sm:inline font-semibold">Live AI Ready</span>
                </div>
              </div>

              {/* The Hero Image Container */}
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-stone-200/80 bg-stone-900/5 shadow-inner">
                <img
                  src={HeroImage}
                  alt="PrepInt Hero Dashboard Preview"
                  className="w-full h-auto max-h-[620px] object-cover sm:object-contain bg-white transition-transform duration-700 hover:scale-[1.01]"
                />

                {/* Subtle Inner Reflection Sheen */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-950/5 via-transparent to-white/20" />
              </div>

              {/* Floating Context Pill 1 - Bottom Left */}
              <div className="hidden lg:flex items-center gap-3 absolute -bottom-5 -left-6 bg-white/95 backdrop-blur-md border border-stone-200/90 rounded-2xl px-4 py-3 shadow-xl shadow-stone-900/10">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600">
                  <LuSparkles className="text-xl" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900">AI Concept Breakdown</span>
                    <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200/60 px-1.5 py-0.2 rounded">Instant</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Syntax-highlighted code logic & tips</p>
                </div>
              </div>

              {/* Floating Context Pill 2 - Top Right */}
              <div className="hidden lg:flex items-center gap-3 absolute -top-5 -right-6 bg-white/95 backdrop-blur-md border border-stone-200/90 rounded-2xl px-4 py-3 shadow-xl shadow-stone-900/10">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600">
                  <LuShieldCheck className="text-xl" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900">Target Role Tailored</span>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-1.5 py-0.2 rounded">Verified</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Targeted by designation & experience</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Features Section */}
      <div className="w-full mt-16 sm:mt-24 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="mt-8">
            <div className="text-center max-w-xl mx-auto mb-14">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block mb-1">
                Why Choose PrepInt
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
                Features That Make You Shine
              </h2>
              <p className="text-sm text-slate-500">
                Crafted to bridge the gap between building software and
                interviewing confidently.
              </p>
            </div>

            <div className="flex flex-col items-center gap-6 sm:gap-8">
              {/* First three cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                {APP_FEATURES.slice(0, 3).map((features) => (
                  <div
                    key={features.id}
                    className="bg-white p-6 sm:p-7 rounded-2xl shadow-xs hover:shadow-xl hover:shadow-amber-500/8 transition-all duration-300 border border-stone-200/80 hover:border-amber-300 hover:-translate-y-1 flex flex-col justify-between group"
                  >
                    <div>
                      <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-md inline-block mb-3">
                        {features.id}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2.5 group-hover:text-amber-600 transition-colors">
                        {features.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {features.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Remaining two cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
                {APP_FEATURES.slice(3).map((features) => (
                  <div
                    key={features.id}
                    className="bg-white p-6 sm:p-7 rounded-2xl shadow-xs hover:shadow-xl hover:shadow-amber-500/8 transition-all duration-300 border border-stone-200/80 hover:border-amber-300 hover:-translate-y-1 flex flex-col justify-between group"
                  >
                    <div>
                      <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-md inline-block mb-3">
                        {features.id}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2.5 group-hover:text-amber-600 transition-colors">
                        {features.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {features.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-xs text-slate-500 text-center py-8 border-t border-stone-200/80 bg-white/70 backdrop-blur-xs">
        <p>Made with 🧡 by developers, for developers • Happy Coding</p>
      </footer>

      {/* Auth Modal */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div className="w-full">
          {/* Top Switcher Tabs */}
          <div className="flex items-center justify-center p-1 bg-stone-100 rounded-xl mb-5">
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
          {currentPage === "signup" && (
            <SignUp setCurrentPage={setCurrentPage} />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default LandingPage;
