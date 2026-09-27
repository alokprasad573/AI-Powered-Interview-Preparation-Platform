import ProfileInfoCard from "../cards/ProfileInfoCard";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="h-16 bg-white border border-b border-gray-200 backdrop-blur-[2px] py-2.5 px-4 md:px-0 sticky top-0 z-30">
        <div className="container mx-auto flex items-center justify-between gap-5">
          <Link to="/dashboard" className="flex items-center gap-2.5 group">
            <img
              src="/prepInt.svg"
              alt="PrepInt"
              className="w-8 h-8 object-contain transition-transform group-hover:scale-105"
            />
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Prep<span className="text-amber-500">Int</span>
            </span>
          </Link>

          <ProfileInfoCard />
        </div>
      </div>
    </>
  );
};

export default Navbar;
