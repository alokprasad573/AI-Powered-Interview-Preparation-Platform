import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LuCircleAlert } from "react-icons/lu";

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

  // Handle Login Form Submit
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
        setError("Invalid credentials. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center">
      <h3 className="text-xl font-bold tracking-tight text-slate-900">
        Welcome Back
      </h3>
      <p className="text-xs text-slate-500 mt-1 mb-5">
        Please enter your details to log in
      </p>

      <form onSubmit={handleLogin} className="flex flex-col gap-1">
        {error && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium mb-2">
            <LuCircleAlert className="shrink-0 text-sm" />
            <span>{error}</span>
          </div>
        )}

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
          placeholder="Min 8 Characters"
          type="password"
        />

        <button type="submit" className="btn-primary mt-3" disabled={isLoading}>
          {isLoading && <SpinnerLoader />}
          <span>{isLoading ? "Signing in..." : "LOGIN"}</span>
        </button>

        <p className="text-xs text-slate-600 text-center mt-4">
          Don't have an account?{" "}
          <button
            type="button"
            className="font-semibold text-amber-600 hover:text-amber-700 hover:underline cursor-pointer"
            onClick={() => {
              if (setCurrentPage) {
                setCurrentPage("signup");
              } else {
                navigate("/signup");
              }
            }}
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
