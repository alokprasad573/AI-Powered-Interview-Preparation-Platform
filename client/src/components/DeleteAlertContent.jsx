import { LuTriangleAlert } from "react-icons/lu";

const DeleteAlertContent = ({ content, onDelete, onClose }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
          <LuTriangleAlert className="text-xl" />
        </div>
        <div>
          <h4 className="text-base font-bold text-slate-900">
            Confirm Deletion
          </h4>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            {content || "Are you sure you want to delete this session? All generated questions and history will be permanently removed."}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2.5 mt-4 pt-3 border-t border-slate-100">
        {onClose && (
          <button
            type="button"
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </button>
        )}

        <button
          type="button"
          className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 transition-colors shadow-xs cursor-pointer"
          onClick={onDelete}
        >
          Delete Session
        </button>
      </div>
    </div>
  );
};

export default DeleteAlertContent;