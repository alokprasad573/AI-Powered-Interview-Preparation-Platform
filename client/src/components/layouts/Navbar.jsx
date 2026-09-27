import ProfileInfoCard from "../cards/ProfileInfoCard";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="h-16 bg-white/85 backdrop-blur-md border-b border-stone-200/80 sticky top-0 z-40 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-4">
        <Link to="/workspace" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center p-2 shadow-xs transition-transform group-hover:scale-105">
            <img
              src="/prepInt.svg"
              alt="PrepInt"
              className="w-full h-full filter invert brightness-0"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Prep<span className="text-amber-500">Int</span>
            </span>
          </div>
        </Link>

        <ProfileInfoCard />
      </div>
    </header>
  );
};

export default Navbar;
