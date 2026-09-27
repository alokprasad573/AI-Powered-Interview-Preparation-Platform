/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState, useMemo } from "react";
import moment from "moment";
import {
  LuPlus,
  LuSearch,
  LuLayers,
  LuSparkles,
  LuBookOpen,
} from "react-icons/lu";
import { CARD_BG } from "../../utils/data";
import { toast } from "react-hot-toast";
import WorkSpaceLayout from "../../components/layouts/WorkspaceLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import SummaryCards from "../../components/cards/SummaryCards";
import Modal from "../../components/Modal";
import CreateSessionForms from "./CreateSessionForms";
import DeleteAlertContent from "../../components/DeleteAlertContent";

const WorkSpace = () => {
  const navigate = useNavigate();

  const [sessions, setSessions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  // Fetching all sessions
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

  // Filter sessions by search term
  const filteredSessions = useMemo(() => {
    if (!searchTerm.trim()) return sessions;
    const term = searchTerm.toLowerCase();
    return sessions.filter(
      (s) =>
        s?.role?.toLowerCase().includes(term) ||
        s?.topicsToFocus?.toLowerCase().includes(term) ||
        s?.description?.toLowerCase().includes(term),
    );
  }, [sessions, searchTerm]);

  // Quick stats calculation
  const totalQuestionsPracticed = useMemo(() => {
    return sessions.reduce((acc, curr) => {
      return acc + (Array.isArray(curr?.questions) ? curr.questions.length : 0);
    }, 0);
  }, [sessions]);

  return (
    <WorkSpaceLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        {/* Header Title & Top Action */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Interview Workspace
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Select an ongoing preparation track or create a new AI-targeted
              session.
            </p>
          </div>

          <button
            className="self-start sm:self-auto inline-flex items-center gap-2 bg-linear-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-sm font-semibold text-white px-5 py-2.5 rounded-xl shadow-md shadow-amber-500/20 active:scale-[0.98] transition-all cursor-pointer"
            onClick={() => setOpenCreateModal(true)}
          >
            <LuPlus className="text-lg" />
            <span>New Session</span>
          </button>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 mb-6">
          <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-2xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-600">
              <LuLayers className="text-lg" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">
                Total Sessions
              </p>
              <h3 className="text-lg font-bold text-slate-900">
                {sessions.length}
              </h3>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-2xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-emerald-600">
              <LuBookOpen className="text-lg" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">
                Questions Mastered
              </p>
              <h3 className="text-lg font-bold text-slate-900">
                {totalQuestionsPracticed}
              </h3>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-2xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600">
              <LuSparkles className="text-lg" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">AI Engine</p>
              <h3 className="text-lg font-bold text-slate-900">
                Google Gemini
              </h3>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        {sessions.length > 0 && (
          <div className="mb-6">
            <div className="relative max-w-md">
              <LuSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-base" />
              <input
                type="text"
                placeholder="Search roles or focus topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-stone-200/80 rounded-xl text-sm text-slate-900 placeholder:text-stone-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/15 transition-all shadow-2xs"
              />
            </div>
          </div>
        )}

        {/* Sessions Grid */}
        {filteredSessions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredSessions.map((data, index) => (
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
        ) : sessions.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-3xl border border-stone-200/80 p-8 sm:p-12 text-center max-w-xl mx-auto shadow-2xs mt-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-600 mx-auto mb-4">
              <LuSparkles className="text-2xl" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
              No interview sessions yet
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-6 leading-relaxed">
              Start practicing with targeted AI-curated questions tailored to
              your dream job designation and experience.
            </p>
            <button
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-linear-to-r hover:from-amber-500 hover:to-orange-600 text-sm font-semibold text-white px-6 py-2.5 rounded-xl shadow-md transition-all cursor-pointer active:scale-[0.98]"
              onClick={() => setOpenCreateModal(true)}
            >
              <LuPlus className="text-lg" />
              <span>Create Your First Session</span>
            </button>
          </div>
        ) : (
          /* Search Not Found State */
          <div className="bg-white rounded-2xl border border-stone-200/80 p-8 text-center max-w-md mx-auto">
            <p className="text-sm font-semibold text-slate-700">
              No sessions match "{searchTerm}"
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Try searching with a different keyword or clear search.
            </p>
          </div>
        )}
      </div>

      {/* Create Session Modal */}
      <Modal
        isOpen={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        hideHeader
      >
        <div>
          <CreateSessionForms />
        </div>
      </Modal>

      {/* Delete Alert Modal */}
      <Modal
        isOpen={openDeleteAlert?.open}
        onClose={() => setOpenDeleteAlert({ open: false, data: null })}
        title="Delete Session"
      >
        <div className="w-[90vw] sm:w-95">
          <DeleteAlertContent
            content="Are you sure you want to delete this session? This action cannot be undone."
            onDelete={() => deleteSession(openDeleteAlert.data)}
          />
        </div>
      </Modal>
    </WorkSpaceLayout>
  );
};

export default WorkSpace;
