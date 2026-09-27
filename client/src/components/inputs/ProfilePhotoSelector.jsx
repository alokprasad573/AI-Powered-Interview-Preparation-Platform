import { useRef, useState } from "react";
import { LuUser, LuCamera, LuTrash2 } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setImage(file);
      const newPreview = URL.createObjectURL(file);
      if (setPreview) {
        setPreview(newPreview);
      }
      setPreviewUrl(newPreview);
    }
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    setImage(null);
    setPreviewUrl(null);
    if (setPreview) {
      setPreview(null);
    }
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const onChooseFile = () => {
    inputRef.current?.click();
  };

  const displayImage = preview || previewUrl;

  return (
    <div className="flex flex-col items-center justify-center mb-5">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      <div
        className="relative group cursor-pointer"
        onClick={onChooseFile}
        title="Click to upload profile photo"
      >
        {displayImage ? (
          <div className="relative">
            <img
              src={displayImage}
              alt="Profile preview"
              className="w-20 h-20 rounded-full object-cover ring-2 ring-indigo-500/30 border-2 border-white shadow-md"
            />
            <button
              type="button"
              className="w-7 h-7 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center absolute -bottom-1 -right-1 shadow-sm transition-colors cursor-pointer"
              onClick={handleRemoveImage}
              title="Remove photo"
            >
              <LuTrash2 className="text-xs" />
            </button>
          </div>
        ) : (
          <div className="w-20 h-20 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 group-hover:border-indigo-500 group-hover:bg-indigo-50/40 flex items-center justify-center transition-all shadow-2xs">
            <LuUser className="text-3xl text-slate-400 group-hover:text-indigo-600 transition-colors" />
            <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center absolute -bottom-1 -right-1 shadow-xs group-hover:scale-105 transition-transform">
              <LuCamera className="text-xs" />
            </div>
          </div>
        )}
      </div>

      <span className="text-[11px] text-slate-500 mt-2 font-medium">
        {displayImage ? "Click to change photo" : "Upload avatar (optional)"}
      </span>
    </div>
  );
};

export default ProfilePhotoSelector;
