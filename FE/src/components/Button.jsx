import React from "react";

const Button = ({
  children,
  type = "button",
  onClick,
  className = "",
  variant = "default", // 'default', 'create', 'update', 'delete', 'read'
  ...props
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "create":
        return "bg-green-500 hover:bg-green-600 text-white";
      case "update":
        return "bg-blue-700 hover:bg-blue-800 text-white";
      case "delete":
        return "bg-red-500 hover:bg-red-700 text-white";
      case "read":
        return "bg-gray-500 hover:bg-gray-600 text-white";
      default:
        return "bg-yellow-500 hover:bg-yellow-600 text-white";
    }
  };

  const buttonContent =
    children ||
    (variant === "default"
      ? "Submit"
      : variant.charAt(0).toUpperCase() + variant.slice(1));

  const handleClick = (e) => {
    if (variant === "delete") {
      if (window.confirm("Are you sure you want to delete?")) {
        onClick && onClick(e);
      }
    } else {
      onClick && onClick(e);
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      className={`px-4 py-2 m-1 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 ${getVariantClasses()} ${className}`}
      {...props}
    >
      {buttonContent}
    </button>
  );
};

export default Button;
