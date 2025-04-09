import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import PageBackground from "./shared/PageBackground";
import LoadingSpinner from "./shared/LoadingSpinner";

function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState({});
  const { signup, authError, clearError, currentUser } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      navigate("/home");
    }
  }, [currentUser, navigate]);

  // Validate form
  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.name) {
      errors.name = "Name is required";
      isValid = false;
    } else if (formData.name.length < 2) {
      errors.name = "Name must be at least 2 characters";
      isValid = false;
    }

    if (!formData.email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Mark field as touched
    setTouched({
      ...touched,
      [name]: true,
    });

    // Clear any auth errors when user starts typing
    if (authError) clearError();
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true,
    });
    validateForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await signup(
        formData.name,
        formData.email,
        formData.password,
      );
      if (success) {
        navigate("/home");
      }
    } catch (err) {
      console.error("Signup error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToWelcome = () => {
    navigate("/");
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
      <div className="flex overflow-hidden relative justify-center items-center w-full h-screen bg-neutral-950 min-h-[716px]">
        <PageBackground />
        <div className="relative p-5 z-[1] w-full max-w-md">
          <div className="mb-8 text-4xl font-bold text-white text-center leading-tight max-md:text-3xl max-sm:text-2xl">
            Create your Lira account
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-zinc-900/50 rounded-lg p-8 backdrop-blur-sm"
          >
            {authError && (
              <div className="mb-6 p-3 bg-red-900/50 border border-red-800 rounded-lg text-red-200 text-sm">
                {authError}
              </div>
            )}

            <div className="mb-6">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-semibold text-neutral-300 text-left"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 bg-zinc-800 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent ${
                  touched.name && formErrors.name
                    ? "border-red-500"
                    : "border-zinc-700"
                }`}
                aria-invalid={
                  touched.name && formErrors.name ? "true" : "false"
                }
              />
              {touched.name && formErrors.name && (
                <p className="mt-1 text-sm text-red-400">{formErrors.name}</p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-semibold text-neutral-300 text-left"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 bg-zinc-800 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent ${
                  touched.email && formErrors.email
                    ? "border-red-500"
                    : "border-zinc-700"
                }`}
                aria-invalid={
                  touched.email && formErrors.email ? "true" : "false"
                }
              />
              {touched.email && formErrors.email && (
                <p className="mt-1 text-sm text-red-400">{formErrors.email}</p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-semibold text-neutral-300 text-left"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 bg-zinc-800 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent ${
                  touched.password && formErrors.password
                    ? "border-red-500"
                    : "border-zinc-700"
                }`}
                aria-invalid={
                  touched.password && formErrors.password ? "true" : "false"
                }
              />
              {touched.password && formErrors.password && (
                <p className="mt-1 text-sm text-red-400">
                  {formErrors.password}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-semibold text-neutral-300 text-left"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 bg-zinc-800 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent ${
                  touched.confirmPassword && formErrors.confirmPassword
                    ? "border-red-500"
                    : "border-zinc-700"
                }`}
                aria-invalid={
                  touched.confirmPassword && formErrors.confirmPassword
                    ? "true"
                    : "false"
                }
              />
              {touched.confirmPassword && formErrors.confirmPassword && (
                <p className="mt-1 text-sm text-red-400">
                  {formErrors.confirmPassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full px-0 py-4 text-base font-semibold leading-6 text-white bg-indigo-700 rounded-lg transition-all cursor-pointer border-[none] duration-[0.2s] hover:bg-indigo-600 ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <LoadingSpinner size="small" color="white" />
                  <span className="ml-2">Creating account...</span>
                </span>
              ) : (
                "Sign Up"
              )}
            </button>

            <div className="mt-6 text-center text-neutral-400">
              Already have an account?{" "}
              <button
                type="button"
                onClick={navigateToLogin}
                className="text-indigo-400 hover:text-indigo-300"
              >
                Log in
              </button>
            </div>
          </form>

          <button
            onClick={handleBackToWelcome}
            className="mt-6 text-neutral-400 hover:text-white flex items-center justify-center mx-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Welcome
          </button>
        </div>
      </div>
    </>
  );
}

export default SignupPage;
