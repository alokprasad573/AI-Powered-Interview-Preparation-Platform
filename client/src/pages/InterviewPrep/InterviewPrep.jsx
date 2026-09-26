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

  // ✅ Separate loading states — session vs explanation
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
    // Toggle: clicking same question closes the drawer
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
      setIsExplainLoading(true); // ✅ only affects drawer — NOT the page
      setOpenLearnMoreDrawer(true);

      const response = await axiosInstance.post(
        API_PATHS.AI.GENERATE_EXPLANATION,
        { question },
      );

      if (response.data) {
        setExplanation(response.data); // e.g. { title: "...", explanation: "..." }
      }
    } catch (error) {
      setExplanation(null);
      setErrorMsg("Failed to generate explanation. Try again later.");
      console.error("Error:", error);
    } finally {
      setIsExplainLoading(false); // ✅ marks explanation done, page stays mounted
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
      setIsUpdateLoader(true)

      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS, {
          role: sessionData?.role,
          experience: sessionData?.experience,
          topicsToFocus: sessionData?.topicsToFocus,
          numberOfQuestions: 10
        }
      )

      const generatedQuestions = aiResponse.data

      const response = await axiosInstance.post(
        API_PATHS.QUESTIONS.ADD_TO_SESSION, {
          sessionId,
          questions: generatedQuestions
        }
      )

      if (response.data) {
        toast.success("Added More Q&A!!")
        fetchSessionDetailsById()
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setErrorMsg(error.response.data.message)
      } else {
        setErrorMsg("Something went wrong.")
      }
    } finally {
      setIsUpdateLoader(false)
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

      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Interview Q&A</h2>
        </div>

        {/* ✅ Page load skeleton — only shows on first load, never when explanation loads */}
        {isPageLoading && !sessionData ? (
          <SkeletonLoader count={5} />
        ) : (
          <div className="flex gap-4 items-start">
            {/* Questions List — shrinks to 50% when drawer is open */}
            <div
              className={`transition-all duration-300 ${openLearnMoreDrawer ? "w-1/2" : "w-full"}`}
            >
              <AnimatePresence mode="popLayout">
                {sessionData?.questions?.map((data, index) => (
                  <motion.div
                    key={data._id || index}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.4,
                      type: "spring",
                      stiffness: 100,
                      delay: index * 0.1,
                      damping: 15,
                    }}
                    layout
                    layoutId={`questions-${data._id || index}`}
                    className="mb-4"
                  >
                    <>
                      <QuestionCard
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
                        sessionData?.questions?.length == index + 1 && (
                          <div className="flex items-center justify-center mt-5">
                            <button
                              className="flex items-center gap-3 text-sm text-white font-medium bg-black  px-5 py-2 mr-2 rounded text-nowrap cursor-pointer"
                              disabled={isPageLoading || isUpdateLoader}
                              onClick={uploadMoreQuestions}
                            >
                              {isUpdateLoader ? (
                                <SpinnerLoader />
                              ) : (
                                <LuListCollapse className="text-lg" />
                              )}{" "}
                              Load More...
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
          {/* Error inside drawer */}
          {errorMsg && (
            <p className="flex items-start gap-2 text-sm text-amber-600 font-medium mb-4">
              <LuCircleAlert className="mt-0.5 shrink-0" /> {errorMsg}
            </p>
          )}

          {/* ✅ Skeleton only when explanation is loading */}
          {isExplainLoading && <SkeletonLoader count={2} />}

          {/* ✅ Explanation shows when NOT loading AND data exists */}
          {!isExplainLoading && explanation && (
            <AiResponsePreview content={explanation?.explanation} />
          )}
        </Drawer>
      </div>
    </DashboardLayout>
  );
};

export default InterviewPrep;
