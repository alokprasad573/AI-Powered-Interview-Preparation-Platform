import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LuCircleAlert, LuArrowRight } from "react-icons/lu";

import Input from "../../components/inputs/Input";
import { validateEmail, setCookie } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import SpinnerLoader from "../../components/loader/SpinnerLoader";

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email: email,
        password: password,
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
        setError("Invalid credentials or server error. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-6">
        <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center p-2 mb-3 shadow-xs">
          <img
            src="/prepInt.svg"
            alt="PrepInt"
            className="w-full h-full filter invert brightness-0"
          />
        </div>
        <h3 className="text-xl font-bold tracking-tight text-slate-900">
          Welcome Back
        </h3>
        <p className="text-xs text-slate-500 mt-1 max-w-xs">
          Sign in to access your saved interview sessions and AI practice hub.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleLogin} className="flex flex-col gap-3">
        {error && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200/80 text-rose-700 text-xs font-medium">
            <LuCircleAlert className="shrink-0 text-sm" />
            <span>{error}</span>
          </div>
        )}

        <Input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label="Email Address"
          placeholder="developer@example.com"
          type="email"
        />

        <Input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label="Password"
          placeholder="••••••••"
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
              <span>Sign In to Account</span>
              <LuArrowRight className="text-sm" />
            </>
          )}
        </button>

        {/* Switch to SignUp */}
        <div className="text-center pt-3 border-t border-slate-100 text-xs text-slate-500">
          Don't have an account yet?{" "}
          <button
            type="button"
            className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline cursor-pointer"
            onClick={() => {
              if (setCurrentPage) {
                setCurrentPage("signup");
              } else {
                navigate("/signup");
              }
            }}
          >
            Create an Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
