import { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      //update image state
      setImage(file);

      //Generate preview URL from the file
      const preview = URL.createObjectURL(file);
      if (setPreview) {
        setPreview(preview);
      }

      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);

    if (setPreview) {
      setPreview(null);
    }
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <>
      <div className="flex justify-center mb-5">
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleImageChange}
          className="hidden"
        />

        {!image ? (
          <div
            className="w-20 h-20 flex items-center justify-center bg-amber-50/80 border-2 border-dashed border-amber-200 hover:border-amber-400 rounded-full relative cursor-pointer group transition-colors"
            onClick={onChooseFile}
            title="Upload profile photo"
          >
            <LuUser className="text-3xl text-amber-500/80 group-hover:text-amber-600 transition-colors" />

            <div className="w-7 h-7 flex items-center justify-center bg-slate-900 text-white rounded-full absolute -bottom-1 -right-1 shadow-md group-hover:bg-amber-500 transition-colors">
              <LuUpload className="text-xs" />
            </div>
          </div>
        ) : (
          <div className="relative group">
            <img
              src={preview || previewUrl}
              alt="profile photo"
              className="w-20 h-20 rounded-full object-cover border-2 border-amber-300 shadow-sm"
            />
            <button
              type="button"
              className="w-7 h-7 flex items-center justify-center bg-rose-500 hover:bg-rose-600 text-white rounded-full absolute -bottom-1 -right-1 shadow-md cursor-pointer transition-colors"
              onClick={handleRemoveImage}
              title="Remove photo"
            >
              <LuTrash className="text-xs" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfilePhotoSelector;
