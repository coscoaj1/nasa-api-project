import React from "react";

export default function Header() {
  return (
    <nav className="relative w-full flex h-12 sm:h-16 gap-4 bg-black font-sans">
      <ul className="flex text-white items-center pl-6">
        <li>NASA APOD: Astronomy Picture of the Day</li>
      </ul>
    </nav>
  );
}
