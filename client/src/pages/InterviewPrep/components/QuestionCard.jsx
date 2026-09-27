import { useEffect, useRef, useState } from "react";
import {
  LuChevronDown,
  LuPinOff,
  LuPin,
  LuSparkles,
  LuCopy,
  LuCheck,
  LuCode2,
} from "react-icons/lu";
import { toast } from "react-hot-toast";
import AiResponsePreview from "./AiResponsePreview";

const DIFFICULTY_VARIANTS = {
  Easy: "bg-emerald-50 text-emerald-700 border-emerald-200/70",
  Medium: "bg-amber-50 text-amber-700 border-amber-200/70",
  Hard: "bg-rose-50 text-rose-700 border-rose-200/70",
};

const QuestionCard = ({
  question,
  answer,
  onLearnMore,
  isPinned,
  onTogglePin,
  index = 0,
  isActive = false,
  isExplainLoading = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const [copied, setCopied] = useState(false);
  const contentRef = useRef(null);

  const difficulty =
    index % 3 === 0 ? "Easy" : index % 3 === 1 ? "Medium" : "Hard";

  useEffect(() => {
    if (isExpanded) {
      const contentHeight = contentRef.current?.scrollHeight || 0;
      setHeight(contentHeight + 20);
    } else {
      setHeight(0);
    }
  }, [isExpanded, answer]);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const copyQuestionText = (e) => {
    e.stopPropagation();
    if (!question) return;
    navigator.clipboard.writeText(question);
    setCopied(true);
    toast.success("Question copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`group bg-white rounded-2xl border transition-all duration-200 overflow-hidden shadow-xs hover:shadow-md ${
        isActive
          ? "border-indigo-500 ring-2 ring-indigo-100"
          : "border-slate-200/80 hover:border-slate-300"
      }`}
    >
      {/* Question Header */}
      <div
        className="p-4 sm:p-5 cursor-pointer flex flex-col gap-3"
        onClick={toggleExpand}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0 flex-1">
            <span className="shrink-0 flex items-center justify-center w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs mt-0.5">
              Q{index + 1}
            </span>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${
                    DIFFICULTY_VARIANTS[difficulty]
                  }`}
                >
                  {difficulty}
                </span>

                {isPinned && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                    <LuPin className="text-[10px]" /> Pinned
                  </span>
                )}
              </div>

              <h3 className="text-sm sm:text-[15px] font-semibold text-slate-850 leading-snug group-hover:text-indigo-600 transition-colors">
                {question}
              </h3>
            </div>
          </div>

          <button
            type="button"
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors shrink-0"
            onClick={(e) => {
              e.stopPropagation();
              toggleExpand();
            }}
            aria-label="Toggle answer accordion"
          >
            <LuChevronDown
              size={18}
              className={`transform transition-transform duration-200 ${
                isExpanded ? "rotate-180 text-indigo-600" : ""
              }`}
            />
          </button>
        </div>

        {/* Action Toolbar */}
        <div
          className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100/80 text-xs"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-2">
            <button
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium transition-colors cursor-pointer text-xs ${
                isPinned
                  ? "bg-amber-50 text-amber-700 border border-amber-200"
                  : "bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
              onClick={onTogglePin}
              title={isPinned ? "Unpin question" : "Pin question for revision"}
            >
              {isPinned ? <LuPinOff className="text-xs" /> : <LuPin className="text-xs" />}
              <span>{isPinned ? "Pinned" : "Pin"}</span>
            </button>

            <button
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer text-xs"
              onClick={copyQuestionText}
              title="Copy question text"
            >
              {copied ? <LuCheck className="text-emerald-600 text-xs" /> : <LuCopy className="text-xs" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>

          <button
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-semibold transition-all cursor-pointer text-xs shadow-2xs ${
              isActive
                ? "bg-indigo-600 text-white"
                : "bg-indigo-50 text-indigo-700 border border-indigo-200/80 hover:bg-indigo-100"
            }`}
            onClick={() => {
              setIsExpanded(true);
              onLearnMore();
            }}
            disabled={isExplainLoading}
          >
            <LuSparkles className={`text-xs ${isExplainLoading ? "animate-spin" : ""}`} />
            <span>{isExplainLoading ? "Explaining..." : "Explain Concept"}</span>
          </button>
        </div>
      </div>

      {/* Accordion Answer Content */}
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out bg-slate-50/70 border-t border-slate-100"
        style={{ maxHeight: `${height}px` }}
      >
        <div ref={contentRef} className="p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <LuCode2 className="text-indigo-500 text-sm" />
            <span>Recommended Solution & Explanation</span>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200/80 shadow-2xs text-sm text-slate-700 leading-relaxed">
            <AiResponsePreview content={answer} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
