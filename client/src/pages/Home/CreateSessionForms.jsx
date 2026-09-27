import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Input";
import SpinnerLoader from "../../components/loader/SpinnerLoader";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const CreateSessionForms = ({ onClose }) => {
  const [formData, setFormData] = useState({
    role: "",
    experience: "",
    description: "",
    topicsToFocus: "",
    numberOfQuestions: 5,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();

    const { role, experience, topicsToFocus, numberOfQuestions } = formData;

    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      setError("Please fill all required fields.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      // Calling AI API to generate questions
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role,
          experience,
          topicsToFocus,
          numberOfQuestions,
        },
      );

      const generatedQuestions = aiResponse.data;

      // Creating session
      const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
        ...formData,
        questions: generatedQuestions,
      });

      if (response.data?.session?._id) {
        if (onClose) onClose();
        navigate(`/interview-prep/${response.data.session._id}`);
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center">
      <h3 className="text-xl font-bold tracking-tight text-slate-900">
        Create Interview Session
      </h3>

      <p className="text-xs text-slate-500 mt-1 mb-5 leading-relaxed">
        Configure your target role and focus topics. Our AI will curate realistic questions tailored to your exact experience level.
      </p>

      <form onSubmit={handleCreateSession} className="flex flex-col gap-3">
        <Input
          value={formData.role}
          onChange={({ target }) => handleChange("role", target.value)}
          label="Target Role"
          placeholder="(e.g., Frontend Developer, Full Stack Engineer)"
          type="text"
        />

        <Input
          value={formData.experience}
          onChange={({ target }) => handleChange("experience", target.value)}
          label="Years of Experience"
          placeholder="(e.g., 2, 4, 6)"
          type="number"
        />

        <Input
          value={formData.topicsToFocus}
          onChange={({ target }) =>
            handleChange("topicsToFocus", target.value)
          }
          label="Topics to Focus On"
          placeholder="(Comma-separated: e.g., React, Node.js, System Design)"
          type="text"
        />

        <Input
          value={formData.description}
          onChange={({ target }) => handleChange("description", target.value)}
          label="Session Notes / Goals"
          placeholder="(Optional specific interview focus or goals)"
          type="text"
        />

        <Input
          value={formData.numberOfQuestions}
          onChange={({ target }) =>
            handleChange("numberOfQuestions", target.value)
          }
          label="Number of Questions"
          placeholder="Number of Questions to generate"
          type="number"
        />

        {error && (
          <p className="text-rose-600 text-xs font-medium py-1">{error}</p>
        )}

        <button
          type="submit"
          className="btn-primary w-full mt-3"
          disabled={isLoading}
        >
          {isLoading && <SpinnerLoader />}
          <span>{isLoading ? "Generating Questions..." : "Create Session"}</span>
        </button>
      </form>
    </div>
  );
};

export default CreateSessionForms;
