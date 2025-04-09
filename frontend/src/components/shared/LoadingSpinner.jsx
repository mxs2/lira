import React from "react";

function LoadingSpinner({ size = "medium", color = "indigo" }) {
  // Size classes
  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-10 h-10",
    large: "w-16 h-16",
  };

  // Color classes
  const colorClasses = {
    white: "border-white/20 border-t-white",
    indigo: "border-indigo-500/20 border-t-indigo-500",
    teal: "border-teal-500/20 border-t-teal-500",
  };

  // Get the appropriate classes based on props
  const spinnerSize = sizeClasses[size] || sizeClasses.medium;
  const spinnerColor = colorClasses[color] || colorClasses.indigo;

  return (
    <div className="flex justify-center items-center">
      <div
        className={`${spinnerSize} border-4 ${spinnerColor} rounded-full animate-spin`}
      ></div>
    </div>
  );
}

export default LoadingSpinner;
