import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LuCircleAlert, LuArrowRight } from "react-icons/lu";

import Input from "../../components/inputs/Input";
import ProfilePhotoSelector from "../../components/inputs/ProfilePhotoSelector";
import { UserContext } from "../../context/userContext";
import { validateEmail, setCookie } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import uploadImage from "../../utils/uploadImage";
import SpinnerLoader from "../../components/loader/SpinnerLoader";

const SignUp = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email: email,
        password: password,
        profileImageUrl: profileImageUrl,
      });

      const { token } = response.data;
      if (token) {
        setCookie("token", token, 7);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Registration failed. Please check your details and try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-5">
        <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center p-2 mb-3 shadow-xs">
          <img
            src="/prepInt.svg"
            alt="PrepInt"
            className="w-full h-full filter invert brightness-0"
          />
        </div>
        <h3 className="text-xl font-bold tracking-tight text-slate-900">
          Create an Account
        </h3>
        <p className="text-xs text-slate-500 mt-1 max-w-xs">
          Join PrepInt to curate AI-powered interview sets and ace your tech rounds.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSignUp} className="flex flex-col gap-3">
        {error && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200/80 text-rose-700 text-xs font-medium">
            <LuCircleAlert className="shrink-0 text-sm" />
            <span>{error}</span>
          </div>
        )}

        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

        <Input
          value={fullName}
          onChange={({ target }) => setFullName(target.value)}
          label="Full Name"
          placeholder="Alex Johnson"
          type="text"
        />

        <Input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label="Email Address"
          placeholder="alex@example.com"
          type="email"
        />

        <Input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label="Password"
          placeholder="At least 6 characters"
          type="password"
        />

        <button
          type="submit"
          className="btn-primary w-full mt-3 flex items-center justify-center gap-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <SpinnerLoader />
          ) : (
            <>
              <span>Create Free Account</span>
              <LuArrowRight className="text-sm" />
            </>
          )}
        </button>

        {/* Switch to Login */}
        <div className="text-center pt-3 border-t border-slate-100 text-xs text-slate-500">
          Already have an account?{" "}
          <button
            type="button"
            className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline cursor-pointer"
            onClick={() => {
              if (setCurrentPage) {
                setCurrentPage("login");
              } else {
                navigate("/login");
              }
            }}
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
