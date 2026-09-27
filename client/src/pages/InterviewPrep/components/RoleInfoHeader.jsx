import { Link } from "react-router-dom";
import { LuArrowLeft, LuBriefcase, LuBrain, LuCalendar, LuSparkles } from "react-icons/lu";

const RoleInfoHeader = ({
  role,
  topicsToFocus,
  experience,
  questions,
  lastUpdated,
}) => {
  const totalYears = Number(experience) || 0;

  const topicsList = topicsToFocus
    ? topicsToFocus
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  return (
    <div className="bg-white border-b border-slate-200/80 py-6 sm:py-8 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors mb-4 group"
        >
          <LuArrowLeft className="group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Dashboard</span>
        </Link>

        {/* Role & Badges */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200/60 px-2.5 py-0.5 rounded-full">
                <LuSparkles className="text-[10px]" /> Interview Simulation
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              {role || "Technical Role Preparation"}
            </h1>

            {/* Focus Topics */}
            {topicsList.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 mt-3">
                <span className="text-xs text-slate-400 font-medium mr-1">Focus:</span>
                {topicsList.map((topic, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-medium text-slate-700 bg-slate-100 border border-slate-200/80 px-2.5 py-0.5 rounded-md"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Quick Metrics Pills */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 text-slate-700 text-xs font-medium px-3.5 py-1.5 rounded-xl shadow-xs">
              <LuBriefcase className="text-slate-400 text-sm" />
              <span>{totalYears} {totalYears === 1 ? "Year" : "Years"} Exp</span>
            </div>

            <div className="flex items-center gap-1.5 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold px-3.5 py-1.5 rounded-xl shadow-xs">
              <LuBrain className="text-indigo-500 text-sm" />
              <span>{questions} Q&A Generated</span>
            </div>

            {lastUpdated && (
              <div className="hidden sm:flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 text-slate-500 text-xs font-medium px-3.5 py-1.5 rounded-xl">
                <LuCalendar className="text-slate-400 text-sm" />
                <span>{lastUpdated}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleInfoHeader;
