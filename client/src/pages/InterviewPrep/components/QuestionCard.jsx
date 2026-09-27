import { useEffect, useRef, useState } from "react";
import { LuChevronDown, LuPinOff, LuPin, LuSparkles } from "react-icons/lu";
import AiResponsePreview from "./AiResponsePreview";

const QuestionCard = ({
  question,
  answer,
  onLearnMore,
  isPinned,
  onTogglePin,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isExpanded) {
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(contentHeight + 10);
    } else {
      setHeight(0);
    }
  }, [isExpanded]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className="group bg-white rounded-lg mb-4 overflow-hidden py-4 px-5 shadow-xl shadow-gray-100/70">
        <div className="flex items-start justify-between cursor-pointer">
          <div className="flex items-start gap-3.5">
            <span className="text-xs md:text-[15px] font-semibold text-gray-400 leading-4.5">
              Q
            </span>
            <h3
              className="text-xs md:text-[14px] font-medium text-gray-800 mr-0 md:mr-20"
              onClick={toggleExpand}
            >
              {question}
            </h3>
          </div>

          <div className="flex items-center justify-end ml-4 relative">
            <div className="relative flex items-center">
              <div
                className={`flex items-center transition-all duration-200 ease-in-out ${
                  isExpanded
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 md:opacity-0 md:translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                }`}
              >
                <button
                  className={`flex items-center gap-2 text-xs font-medium px-3 py-1 mr-2 rounded text-nowrap border cursor-pointer transition-colors ${
                    isPinned
                      ? "text-amber-800 bg-amber-100 border-amber-300"
                      : "text-zinc-600 bg-zinc-100 border-zinc-200 hover:text-amber-700 hover:bg-amber-50 hover:border-amber-200"
                  }`}
                  onClick={onTogglePin}
                >
                  {isPinned ? (
                    <LuPinOff className="text-xs text-amber-700" />
                  ) : (
                    <LuPin className="text-xs" />
                  )}
                </button>

                <button
                  className="flex items-center gap-2 text-xs text-amber-800 font-medium bg-amber-50 px-2.5 py-1 mr-2 rounded text-nowrap border border-amber-200 hover:bg-amber-100 hover:border-amber-300 cursor-pointer transition-colors"
                  onClick={() => {
                    setIsExpanded(true);
                    onLearnMore();
                  }}
                >
                  <LuSparkles className="text-amber-600" />
                  <span className="hidden md:block">Explain</span>
                </button>
              </div>

              <button
                className="text-gray-400 hover:text-gray-500 cursor-pointer"
                onClick={toggleExpand}
              >
                <LuChevronDown
                  size={20}
                  className={`transform transition-transform duration-300 ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        <div
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight: `${height}px` }}
        >
          <div
            ref={contentRef}
            className="mt-4 text-gray-700 bg-gray-50 px-5 py-3 rounded-lg"
          >
            <AiResponsePreview content={answer} />
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionCard;
