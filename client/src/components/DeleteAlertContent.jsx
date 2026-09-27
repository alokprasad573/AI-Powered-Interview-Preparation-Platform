const DeleteAlertContent = ({ content, onDelete}) => {
  return (
    <>
       <div className="p-5">
        <p className="text-[14px]">{content}</p>
        
        <div className="flex justify-end mt-6">
            <button
            type="button"
            className="bg-linear-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-sm hover:bg-black hover:text-white border border-white transition-colors cursor-pointer"
            onClick={onDelete}>
                Delete
            </button>
        </div>
       </div>
    </>
  )
}

export default DeleteAlertContent;