import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Input";
import SpinnerLoader from "../../components/loader/SpinnerLoader";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const CreateSessionForms = () => {
  const [formData, setFormData] = useState({
    role: "",
    experience: "",
    description: "",
    topicsToFocus: "",
    numberOfQuestions: 0

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
      setError("Please fill all requires fields");
      return;
    }

    setError(" ");
    setIsLoading(true);

    try {

      //Calling ai API to generate question
      const aiResponse = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS, {
        role,
        experience,
        topicsToFocus,
        numberOfQuestions
      })

      const generatedQuestions = aiResponse.data;

      //Creating sessions
      const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
        ...formData,
        questions: generatedQuestions,
      })

      if (response.data?.session?._id) {
        navigate(`/interview-prep/${response.data?.session?._id}`)
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
    <>
      <div className="w-[90vw] md:w-[35vw] p-7 flex flex-col justify-center">
        <h3 className="text-lg font-semibold text-black">
          Start a New Interview Journey
        </h3>

        <p className="text-xs text-slate-700 mt-1.25 mb-3">
          Fill out a few quick and unlock your personalized set of interview
          questions!
        </p>

        <form onSubmit={handleCreateSession} className="flex flex-col">
          <Input
            value={formData.role}
            onChange={({ target }) => handleChange("role", target.value)}
            label="Target Role"
            placeholder="(e.g., Frontend Developer, UI/UX Designer, etc.)"
            text="text"
          />

          <Input
            value={formData.experience}
            onChange={({ target }) => handleChange("experience", target.value)}
            label="Years of Experience"
            placeholder="(e.g., 1 year, 3 years, 5+ years)"
            type="number"
          />

          <Input
            value={formData.topicsToFocus}
            onChange={({ target }) =>
              handleChange("topicsToFocus", target.value)
            }
            label="Topics to Focus On"
            placeholder="(Comma-Seperated, e.g., React, Node.js, MongoDB)"
            type="text"
          />

          <Input
            value={formData.description}
            onChange={({ target }) => handleChange("description", target.value)}
            label="Description"
            placeholder="(Any specific goals or notes in this session.)"
            type="text"
          />

          <Input
            value={formData.numberOfQuestions}
            onChange={({ target }) => handleChange("numberOfQuestions", target.value)}
            label="Number Question"
            placeholder="Number of Questions want to generate"
            type="number"
          />

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button
            type="submit"
            className="btn-primary w-full mt-2"
            disabled={isLoading}
          >
            {isLoading && <SpinnerLoader />}Create Session
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateSessionForms;
