import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "./Navbar";

const DashboardLayout = ({ children }) => {
  const { user } = useContext(UserContext);
  return (
    <div className="min-h-screen bg-[#fafaf9] flex flex-col selection:bg-amber-500 selection:text-white">
      <Navbar />

      {user && <main className="flex-1 pb-16">{children}</main>}
    </div>
  );
};

export default DashboardLayout;
