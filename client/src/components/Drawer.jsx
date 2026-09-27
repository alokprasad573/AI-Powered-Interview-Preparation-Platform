import { LuX, LuSparkles } from "react-icons/lu";

const Drawer = ({ isOpen, onClose, title, children }) => {
  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 top-16 bg-slate-900/40 backdrop-blur-2xs z-30 lg:hidden transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Slide-over Drawer Panel */}
      <aside
        className={`fixed top-16 right-0 z-40 h-[calc(100dvh-64px)] w-full sm:w-[500px] md:w-[45vw] lg:w-[40vw] bg-white border-l border-slate-200/90 shadow-2xl flex flex-col transition-transform duration-200 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        tabIndex="-1"
        aria-labelledby="drawer-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200/80 bg-slate-50/50">
          <div className="flex items-center gap-2.5 min-w-0 pr-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <LuSparkles className="text-sm" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 block">
                Concept Deep Dive
              </span>
              <h4
                id="drawer-title"
                className="text-sm sm:text-base font-semibold text-slate-900 truncate"
              >
                {title || "Technical Explanation"}
              </h4>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl p-1.5 transition-colors cursor-pointer shrink-0"
            aria-label="Close drawer"
          >
            <LuX className="text-lg" />
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div className="flex-1 overflow-y-auto px-5 py-4 custom-scrollbar text-sm text-slate-700 leading-relaxed">
          {children}
        </div>
      </aside>
    </>
  );
};

export default Drawer;