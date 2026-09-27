import { useParams } from "react-router-dom";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";
import { LuCircleAlert, LuListCollapse } from "react-icons/lu";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import RoleInfoHeader from "./components/RoleInfoHeader";
import QuestionCard from "./components/QuestionCard";
import Drawer from "../../components/Drawer";
import SkeletonLoader from "../../components/loader/SkeletonLoader";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import AiResponsePreview from "./components/AiResponsePreview";
import SpinnerLoader from "../../components/loader/SpinnerLoader";

const InterviewPrep = () => {
  const { sessionId } = useParams();

  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);
  const [activeQuestionId, setActiveQuestionId] = useState(null);

  const [isUpdateLoader, setIsUpdateLoader] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [isExplainLoading, setIsExplainLoading] = useState(false);

  // Fetch session details by ID
  const fetchSessionDetailsById = async () => {
    if (!sessionId) return;
    try {
      setIsPageLoading(true);
      const response = await axiosInstance.get(
        API_PATHS.SESSION.GET_ONE_BY_ID(sessionId),
      );
      if (response.data?.session) {
        setSessionData(response.data.session);
      }
    } catch (error) {
      console.error("Error: ", error);
      setErrorMsg("Failed to load session details.");
    } finally {
      setIsPageLoading(false);
    }
  };

  // Generate Concept Explanation
  const generateConceptExplanation = async (questionId, question) => {
    if (activeQuestionId === questionId && openLearnMoreDrawer) {
      setOpenLearnMoreDrawer(false);
      setActiveQuestionId(null);
      setExplanation(null);
      return;
    }

    try {
      setErrorMsg("");
      setExplanation(null);
      setActiveQuestionId(questionId);
      setIsExplainLoading(true);
      setOpenLearnMoreDrawer(true);

      const response = await axiosInstance.post(
        API_PATHS.AI.GENERATE_EXPLANATION,
        { question },
      );

      if (response.data) {
        setExplanation(response.data);
      }
    } catch (error) {
      setExplanation(null);
      setErrorMsg("Failed to generate explanation. Try again later.");
      console.error("Error:", error);
    } finally {
      setIsExplainLoading(false);
    }
  };

  // Toggle Pin Question
  const toggleQuestionPinStatus = async (questionId) => {
    try {
      const response = await axiosInstance.post(
        API_PATHS.QUESTIONS.PIN(questionId),
      );
      if (response.data && response.data.question) {
        fetchSessionDetailsById();
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  // Add more questions to a session
  const uploadMoreQuestions = async () => {
    try {
      setIsUpdateLoader(true);

      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role: sessionData?.role,
          experience: sessionData?.experience,
          topicsToFocus: sessionData?.topicsToFocus,
          numberOfQuestions: 10,
        },
      );

      const generatedQuestions = aiResponse.data;

      const response = await axiosInstance.post(
        API_PATHS.QUESTIONS.ADD_TO_SESSION,
        {
          sessionId,
          questions: generatedQuestions,
        },
      );

      if (response.data) {
        toast.success("Added more questions successfully!");
        fetchSessionDetailsById();
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg("Something went wrong.");
      }
    } finally {
      setIsUpdateLoader(false);
    }
  };

  const handleCloseDrawer = () => {
    setOpenLearnMoreDrawer(false);
    setActiveQuestionId(null);
    setExplanation(null);
    setErrorMsg("");
  };

  useEffect(() => {
    let isMounted = true;

    const loadSession = async () => {
      if (!sessionId) return;
      try {
        setIsPageLoading(true);
        const response = await axiosInstance.get(
          API_PATHS.SESSION.GET_ONE_BY_ID(sessionId),
        );
        if (isMounted && response.data?.session) {
          setSessionData(response.data.session);
        }
      } catch (error) {
        console.error("Error: ", error);
        if (isMounted) setErrorMsg("Failed to load session details.");
      } finally {
        if (isMounted) setIsPageLoading(false);
      }
    };

    loadSession();

    return () => {
      isMounted = false;
    };
  }, [sessionId]);

  return (
    <DashboardLayout>
      <RoleInfoHeader
        role={sessionData?.role || ""}
        topicsToFocus={sessionData?.topicsToFocus || ""}
        experience={sessionData?.experience || "-"}
        questions={sessionData?.questions?.length || "-"}
        description={sessionData?.description || ""}
        lastUpdated={
          sessionData?.updatedAt
            ? moment(sessionData.updatedAt).format("Do MMM YYYY")
            : ""
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200/80">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Technical Interview Questions
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Click any question to view the answer and solution breakdown.
            </p>
          </div>

          <span className="text-xs font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-3 py-1 rounded-lg">
            {sessionData?.questions?.length || 0} Questions Total
          </span>
        </div>

        {/* Page load skeleton */}
        {isPageLoading && !sessionData ? (
          <SkeletonLoader count={5} />
        ) : (
          <div className="flex gap-6 items-start">
            {/* Questions List — responsive on desktop when drawer is open, full width on mobile */}
            <div
              className={`transition-all duration-300 w-full ${
                openLearnMoreDrawer ? "lg:w-[58%]" : "w-full"
              }`}
            >
              <AnimatePresence mode="popLayout">
                {sessionData?.questions?.map((data, index) => (
                  <motion.div
                    key={data._id || index}
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{
                      duration: 0.3,
                      type: "spring",
                      stiffness: 110,
                      delay: Math.min(index * 0.05, 0.4),
                      damping: 16,
                    }}
                    layout
                    layoutId={`questions-${data._id || index}`}
                    className="mb-4"
                  >
                    <>
                      <QuestionCard
                        index={index}
                        question={data?.question}
                        answer={data?.answer}
                        onLearnMore={() =>
                          generateConceptExplanation(data._id, data.question)
                        }
                        isPinned={data?.isPinned}
                        onTogglePin={() => toggleQuestionPinStatus(data._id)}
                        isActive={activeQuestionId === data._id}
                        isExplainLoading={
                          isExplainLoading && activeQuestionId === data._id
                        }
                      />

                      {!isPageLoading &&
                        sessionData?.questions?.length === index + 1 && (
                          <div className="flex items-center justify-center mt-8 pb-10">
                            <button
                              className="inline-flex items-center gap-2.5 text-sm font-semibold text-white bg-slate-900 hover:bg-indigo-600 px-6 py-3 rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-50"
                              disabled={isPageLoading || isUpdateLoader}
                              onClick={uploadMoreQuestions}
                            >
                              {isUpdateLoader ? (
                                <SpinnerLoader />
                              ) : (
                                <LuListCollapse className="text-lg" />
                              )}
                              <span>
                                {isUpdateLoader
                                  ? "Generating..."
                                  : "Load More Questions"}
                              </span>
                            </button>
                          </div>
                        )}
                    </>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        <Drawer
          isOpen={openLearnMoreDrawer}
          onClose={handleCloseDrawer}
          title={explanation?.title || ""}
        >
          {errorMsg && (
            <p className="flex items-start gap-2 text-sm text-amber-600 font-medium mb-4">
              <LuCircleAlert className="mt-0.5 shrink-0" /> {errorMsg}
            </p>
          )}

          {isExplainLoading && <SkeletonLoader count={2} />}

          {!isExplainLoading && explanation && (
            <AiResponsePreview content={explanation?.explanation} />
          )}
        </Drawer>
      </div>
    </DashboardLayout>
  );
};

export default InterviewPrep;
