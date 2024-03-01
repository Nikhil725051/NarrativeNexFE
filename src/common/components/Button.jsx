import React from "react";

export const Button = ({ title, onClick, disabled = false }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type="button"
      className={`text-white bg-gradient-to-br from-red-400 to-yellow-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 ${
        disabled ? "cursor-not-allowed" : ""
      }`}
    >
      {title}
    </button>
  );
};
