import { LuX } from "react-icons/lu";

const Modal = ({ children, isOpen, onClose, title, hideHeader }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-slate-900/50 backdrop-blur-2xs p-4 sm:p-6 overflow-y-auto transition-opacity"
      onClick={onClose}
    >
      {/* Modal Dialog Container */}
      <div
        className="relative flex flex-col bg-white shadow-2xl rounded-2xl overflow-hidden border border-slate-200/80 w-full max-w-lg max-h-[92vh] animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        {!hideHeader && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200/80 bg-slate-50/50">
            <h3 className="text-base font-semibold text-slate-900">{title}</h3>
          </div>
        )}

        {/* Close Button */}
        <button
          type="button"
          className="text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl p-1.5 absolute top-3.5 right-4 cursor-pointer transition-colors z-10"
          onClick={onClose}
          aria-label="Close modal"
        >
          <LuX className="text-lg" />
        </button>

        {/* Modal Body Scrollable */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;