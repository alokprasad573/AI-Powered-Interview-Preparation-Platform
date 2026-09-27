import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { getInitials } from "../../utils/helper";
import { LuLogOut } from "react-icons/lu";

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
        <div className="w-10 h-10 bg-slate-200 rounded-full" />
        <div className="hidden sm:flex flex-col gap-1.5">
          <div className="w-20 h-3 bg-slate-200 rounded" />
          <div className="w-12 h-2.5 bg-slate-200 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {user.profileImageUrl ? (
        <img
          src={user.profileImageUrl}
          alt={user.name || "profile_photo"}
          className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100 border border-slate-200 shadow-xs"
        />
      ) : (
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-semibold rounded-full flex items-center justify-center text-xs shadow-xs ring-2 ring-slate-100">
          {getInitials(user.name) || "U"}
        </div>
      )}

      <div className="flex flex-col">
        <span className="text-sm font-semibold text-slate-800 leading-tight">
          {user.name || "Developer"}
        </span>
        <button
          className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-rose-600 font-medium cursor-pointer transition-colors"
          onClick={handleLogout}
        >
          <LuLogOut className="text-[10px]" /> Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfoCard;
