const DeleteAlertContent = ({ content, onDelete }) => {
  return (
    <div className="p-6">
      <p className="text-sm text-slate-600 leading-relaxed">{content}</p>

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="bg-rose-600 hover:bg-rose-700 text-sm font-semibold text-white px-5 py-2.5 rounded-xl transition-colors cursor-pointer shadow-sm active:scale-[0.98]"
          onClick={onDelete}
        >
          Delete Session
        </button>
      </div>
    </div>
  );
};

export default DeleteAlertContent;
