import React from "react";

export default function IncrementButton({ incrementDate }) {
  return (
    <button
      className="text-gray-600 dark:text-gray-300"
      onClick={incrementDate}
      title="previous image"
      data-testid="decrement-button"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  );
}
