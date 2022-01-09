import React from "react";
import { HiMoon } from "react-icons/hi";
import { HiSun } from "react-icons/hi";

export default function Header({ theme, toggleTheme }) {
  return (
    <nav className="relative flex w-full h-12 gap-4 dark:bg-[#212121] bg-white">
      <ul className="flex items-center pl-6">
        <li className="text-lg font-[500]">UnSpace</li>
        <button className="p-2 rounded-full" onClick={toggleTheme}>
          {theme === "dark" ? (
            <HiSun className="w-8 h-8" />
          ) : (
            <HiMoon className="w-8 h-8" />
          )}
        </button>
      </ul>
    </nav>
  );
}
