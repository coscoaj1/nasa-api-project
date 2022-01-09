import React from "react";
import { HiMoon } from "react-icons/hi";
import { HiSun } from "react-icons/hi";

export default function Header({ theme, toggleTheme }) {
  return (
    <nav className="relative flex w-full h-12 gap-2 dark:bg-[#212121] bg-white">
      <h1 className="text-lg font-[500]">UnSpace</h1>
      <button className="p-2 rounded-full" onClick={toggleTheme}>
        {theme === "dark" ? (
          <HiSun className="w-8 h-8" />
        ) : (
          <HiMoon className="w-8 h-8" />
        )}
      </button>
    </nav>
  );
}
