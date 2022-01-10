import React from "react";
import { HiMoon } from "react-icons/hi";
import { HiSun } from "react-icons/hi";

export default function Header({ theme, toggleTheme }) {
  return (
    <header className="relative flex w-full h-12 gap-4 items-center dark:bg-[#212121] bg-white">
      <h1 className="pl-4 text-lg font-[500]">My SpaceBook</h1>
      <button
        data-testid="theme-toggle"
        className="p-2 rounded-full"
        onClick={toggleTheme}
      >
        {theme === "dark" ? (
          <HiSun className="w-8 h-8" />
        ) : (
          <HiMoon className="w-8 h-8" />
        )}
      </button>
    </header>
  );
}
