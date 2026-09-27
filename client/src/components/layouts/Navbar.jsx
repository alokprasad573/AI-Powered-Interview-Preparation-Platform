import ProfileInfoCard from "../cards/ProfileInfoCard";
import { Link } from "react-router-dom";
import { LuSparkles } from "react-icons/lu";

const Navbar = () => {
  return (
    <header className="h-16 bg-white/85 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-40 transition-all duration-200">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/dashboard" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center p-1.5 shadow-sm group-hover:bg-indigo-600 transition-colors duration-200">
            <img
              src="/prepInt.svg"
              alt="PrepInt"
              className="w-full h-full filter invert brightness-0"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
              PrepInt
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200/60 px-2 py-0.5 rounded-full">
              <LuSparkles className="text-[10px]" /> AI 1.5
            </span>
          </div>
        </Link>

        <ProfileInfoCard />
      </div>
    </header>
  );
};

export default Navbar;
