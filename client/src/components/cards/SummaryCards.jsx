import { LuTrash2, LuCalendar, LuBrain, LuBriefcase, LuArrowRight } from "react-icons/lu";
import { getInitials } from "../../utils/helper";

const SummaryCards = ({
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) => {
  const totalQuestions = Number(questions) || 0;
  const totalYears = Number(experience) || 0;

  // Split comma-separated topics into tags (limit to 3 for clean UI)
  const topicTags = topicsToFocus
    ? topicsToFocus
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  return (
    <div
      className="group relative bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-xl hover:shadow-indigo-500/8 hover:border-indigo-300/80 transition-all duration-200 cursor-pointer flex flex-col justify-between"
      onClick={onSelect}
    >
      <div>
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 shrink-0 rounded-xl bg-slate-900 text-white font-bold text-sm flex items-center justify-center shadow-xs group-hover:bg-indigo-600 transition-colors">
              {getInitials(role) || "DEV"}
            </div>
            <div className="min-w-0">
              <h3 className="text-base font-semibold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
                {role || "Technical Role"}
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                <LuBriefcase className="text-xs text-slate-400" />
                <span>{totalYears} {totalYears === 1 ? "Year" : "Years"} exp</span>
              </div>
            </div>
          </div>

          <button
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            title="Delete session"
            aria-label="Delete session"
          >
            <LuTrash2 className="text-sm" />
          </button>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-4">
          {description || "No specific description provided for this session."}
        </p>

        {/* Focus Topic Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {topicTags.slice(0, 3).map((topic, i) => (
            <span
              key={i}
              className="text-[11px] font-medium text-slate-700 bg-slate-100 border border-slate-200/60 px-2.5 py-0.5 rounded-md"
            >
              {topic}
            </span>
          ))}
          {topicTags.length > 3 && (
            <span className="text-[11px] font-medium text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-md">
              +{topicTags.length - 3} more
            </span>
          )}
          {topicTags.length === 0 && (
            <span className="text-[11px] text-slate-400 italic">General Tech</span>
          )}
        </div>
      </div>

      {/* Footer Info Row */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1 font-medium text-slate-700">
            <LuBrain className="text-indigo-500 text-xs" />
            {totalQuestions} Q&A
          </span>
          {lastUpdated && (
            <span className="hidden sm:inline-flex items-center gap-1 text-slate-400 text-[11px]">
              <LuCalendar className="text-[11px]" />
              {lastUpdated}
            </span>
          )}
        </div>

        <span className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 group-hover:translate-x-0.5 transition-transform">
          Practice <LuArrowRight className="text-xs" />
        </span>
      </div>
    </div>
  );
};

export default SummaryCards;
