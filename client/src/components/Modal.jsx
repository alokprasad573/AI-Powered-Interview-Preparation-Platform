const Modal = ({ children, isOpen, onClose, title, hideHeader }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-slate-950/60 backdrop-blur-xs p-4">
        {/* Modal Content */}
        <div className="relative flex flex-col bg-white shadow-2xl rounded-2xl sm:rounded-3xl border border-stone-200/90 overflow-hidden max-h-[92vh]">
          {/* Modal Header */}
          {!hideHeader && (
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="md:text-lg font-medium text-gray-900">{title}</h3>
            </div>
          )}

          <button
            type="button"
            className="text-stone-400 bg-stone-100 hover:bg-stone-200 hover:text-slate-800 rounded-full w-8 h-8 flex justify-center items-center absolute top-4 right-4 z-10 transition-colors cursor-pointer"
            onClick={onClose}
          >
            <svg
              className="w-3.5 h-3.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>

          {/* Modal Body Scrollable */}
          <div className="flex-1 overflow-y-auto no-scrollbar">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
