import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { getInitials } from "../../utils/helper";

const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    clearUser();
    navigate("/");
  };

  if (!user) {
    return (
      <div className="flex items-center gap-3 animate-pulse">
        <div className="w-11 h-11 bg-gray-200 rounded-full" />
        <div className="flex flex-col gap-1.5">
          <div className="w-20 h-3 bg-gray-200 rounded" />
          <div className="w-12 h-2.5 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center">
        {user.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt={user.name || "profile_photo"}
            className="w-11 h-11 bg-gray-300 rounded-full mr-3 object-cover"
          />
        ) : (
          <div className="w-11 h-11 bg-gray-200 text-gray-700 font-bold rounded-full mr-3 flex items-center justify-center text-sm">
            {getInitials(user.name) || "U"}
          </div>
        )}
        <div>
          <div className="text-[15px] text-black font-bold leading-3">
            {user.name || ""}
          </div>
          <button
            className="text-amber-600 text-sm font-semibold cursor-pointer hover:underline"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileInfoCard;
