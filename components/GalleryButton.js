import React from "react";

export default function GalleryButton({ changeDate, chevron, title }) {
  return (
    <button
      className="text-gray-600 dark:text-gray-300"
      onClick={changeDate}
      title={title}
      data-testid="decrement-button"
    >
      {chevron}
    </button>
  );
}
