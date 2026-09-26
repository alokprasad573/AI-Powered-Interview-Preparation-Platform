import { useEffect, useState } from "react";
import moment from "moment";
import { LuPlus } from "react-icons/lu";
import { CARD_BG } from "../../utils/data";
import { toast } from "react-hot-toast";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import SummaryCards from "../../components/cards/SummaryCards";
import Modal from "../../components/Modal";
import CreateSessionForms from "./CreateSessionForms";
import DeleteAlertContent from "../../components/DeleteAlertContent";

const Dashboard = () => {
  const navigate = useNavigate();

  const [sessions, setSessions] = useState([]);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  //Fetching all sessions
  const fetchAllSessions = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      setSessions(response.data || []);
    } catch (error) {
      console.error("Error fetching session data: ", error);
    }
  };
  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      fetchAllSessions();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const deleteSession = async (sessionData) => {
    try {
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData?._id));
      toast.success("Session Deleted Successfully.");
      setOpenDeleteAlert({
        open: false,
        data: null,
      });

      fetchAllSessions();
    } catch (error) {
      console.error("Error deleting session data:", error);
    }
  };

  return (
    <>
      <DashboardLayout>
        <div className="container mx-auto pt-4 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0">
            {sessions?.map((data, index) => (
              <SummaryCards
                key={data._id}
                colors={CARD_BG[index % CARD_BG.length]}
                role={data?.role || ""}
                topicsToFocus={data?.topicsToFocus || ""}
                experience={data?.experience || ""}
                questions={
                  Array.isArray(data?.questions) ? data.questions.length : 0
                }
                description={data?.description || ""}
                lastUpdated={
                  data?.updatedAt
                    ? moment(data.updatedAt).format("Do MMM YYYY")
                    : ""
                }
                onSelect={() => navigate(`/interview-prep/${data._id}`)}
                onDelete={() => setOpenDeleteAlert({ open: true, data })}
              />
            ))}
          </div>

          <button
            className="h-12 md:h-12 flex items-center justify-center gap-3 bg-linear-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white transition-colors cursor-pointer hover:shadow-2xl hover:shadow-orange-300 fixed bottom-10 md:bottom-20 right-10 md:right-20"
            onClick={() => setOpenCreateModal(true)}
          >
            <LuPlus className="text-2xl text-white" />
            Add New
          </button>
        </div>

        <Modal
          isOpen={openCreateModal}
          onClose={() => {
            setOpenCreateModal(false);
          }}
          hideHeader
        >
          <div>
            <CreateSessionForms />
          </div>
        </Modal>

        <Modal
          isOpen={openDeleteAlert?.open}
          onClose={() => {
            setOpenDeleteAlert({ open: false, data: null });
          }}
          title="Delete Alert"
        >
          <div className="w-[30vw]">
            <DeleteAlertContent
              content="Are you sure want to delete this session details?"
              onDelete={() => deleteSession(openDeleteAlert.data)}
            />
          </div>
        </Modal>
      </DashboardLayout>
    </>
  );
};

export default Dashboard;
