import { LuTrash2 } from "react-icons/lu";
import { getInitials } from "../../utils/helper";

const SummaryCards = ({
  colors,
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

  return (
    <div
      className="h-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm shadow-gray-200/70 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg cursor-pointer group"
      onClick={onSelect}
    >
      <div
        className="relative p-4"
        style={{
          background:
            colors?.bgcolor ||
            "linear-gradient(135deg, #f3f4f6 0%, #ffffff 100%)",
        }}
      >
        <button
          className="absolute right-3 top-3 hidden h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[11px] font-semibold text-rose-500 shadow-sm transition-colors hover:bg-white group-hover:flex"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          aria-label="Delete session"
        >
          <LuTrash2 />
        </button>

        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-sm font-bold text-slate-900 shadow-sm">
            {getInitials(role)}
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="truncate text-base font-semibold text-slate-900">
              {role || "Untitled role"}
            </h2>
            <p className="mt-1 truncate text-xs text-slate-700/80">
              {topicsToFocus || "No focus area provided"}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3 px-3 pb-4 pt-3">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-slate-300 bg-slate-50 px-2.5 py-1 text-[10px] font-medium text-slate-700">
            {totalYears} {totalYears === 1 ? "Year" : "Years"} exp
          </span>
          <span className="rounded-full border border-slate-300 bg-slate-50 px-2.5 py-1 text-[10px] font-medium text-slate-700">
            {totalQuestions} Q&A
          </span>
          <span className="rounded-full border border-slate-300 bg-slate-50 px-2.5 py-1 text-[10px] font-medium text-slate-700">
            {lastUpdated || "No date"}
          </span>
        </div>

        <p className="text-xs leading-5 text-slate-600 line-clamp-2">
          {description || "No description available for this session."}
        </p>
      </div>
    </div>
  );
};

export default SummaryCards;
