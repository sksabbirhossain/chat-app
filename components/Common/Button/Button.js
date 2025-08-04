import React from "react";

const Button = ({ children, isLoading, isPending, disabled }) => {
  return (
    <button
      type="submit"
      disabled={isLoading || isPending || disabled}
      aria-busy={isLoading || isPending}
      aria-disabled={isLoading || isPending}
      className="w-full cursor-pointer rounded bg-green-600 p-2 font-semibold text-white capitalize transition-colors duration-200 ease-in-out hover:bg-green-700 focus:outline-none disabled:cursor-not-allowed disabled:bg-green-800/60 disabled:transition-none"
    >
      {isLoading || isPending ? (
        <span className="flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-6 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 6l0 -3" />
            <path d="M16.25 7.75l2.15 -2.15" />
            <path d="M18 12l3 0" />
            <path d="M16.25 16.25l2.15 2.15" />
            <path d="M12 18l0 3" />
            <path d="M7.75 16.25l-2.15 2.15" />
            <path d="M6 12l-3 0" />
            <path d="M7.75 7.75l-2.15 -2.15" />
          </svg>
        </span>
      ) : (
        <span>{children}</span>
      )}
    </button>
  );
};

export default Button;
