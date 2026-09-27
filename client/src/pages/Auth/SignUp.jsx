import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LuCircleAlert } from "react-icons/lu";

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
      setError("Please enter full name.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters.");
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
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center">
      <h3 className="text-xl font-bold tracking-tight text-slate-900">
        Create an Account
      </h3>
      <p className="text-xs text-slate-500 mt-1 mb-4">
        Join us today by entering your details below.
      </p>

      <form onSubmit={handleSignUp} className="flex flex-col gap-1">
        {error && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium mb-2">
            <LuCircleAlert className="shrink-0 text-sm" />
            <span>{error}</span>
          </div>
        )}

        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

        <div className="grid grid-cols-1 gap-1">
          <Input
            value={fullName}
            onChange={({ target }) => setFullName(target.value)}
            label="Full Name"
            placeholder="John Doe"
            type="text"
          />

          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="email"
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 6 Characters"
            type="password"
          />
        </div>

        <button type="submit" className="btn-primary mt-3" disabled={isLoading}>
          {isLoading && <SpinnerLoader />}
          <span>{isLoading ? "Creating Account..." : "SIGN UP"}</span>
        </button>

        <p className="text-xs text-slate-600 text-center mt-4">
          Already have an account?{" "}
          <button
            type="button"
            className="font-semibold text-amber-600 hover:text-amber-700 hover:underline cursor-pointer"
            onClick={() => {
              if (setCurrentPage) {
                setCurrentPage("login");
              } else {
                navigate("/login");
              }
            }}
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
