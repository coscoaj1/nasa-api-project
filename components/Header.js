import React from "react";
import { HiMoon } from "react-icons/hi";
import { HiSun } from "react-icons/hi";

export default function Header({ theme, toggleTheme }) {
  return (
    <header className="relative flex justify-between w-full h-12 gap-4 items-center dark:bg-[#212121] bg-white">
      <h1 className="ml-4 text-lg font-[500]">My SpaceBook</h1>
      <button
        data-testid="theme-toggle"
        className="p-2 rounded-full"
        id="toggle"
        onClick={toggleTheme}
      >
        {theme === "dark" ? (
          <HiSun data-testid="sun" className="w-8 h-8 mr-4" />
        ) : (
          <HiMoon data-testid="moon" className="w-8 h-8 mr-4" />
        )}
      </button>
    </header>
  );
}
