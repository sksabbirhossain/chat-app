import React from "react";

const Button = ({ children }) => {
  return (
    <button
      type="submit"
      className="w-full cursor-pointer rounded bg-green-600 p-2 font-semibold text-white transition-colors duration-200 ease-in-out hover:bg-green-700 focus:bg-green-600 focus:outline-none"
    >
      {children}
    </button>
  );
};

export default Button;
