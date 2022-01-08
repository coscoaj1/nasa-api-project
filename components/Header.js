import React from "react";

export default function Header() {
  return (
    <nav className="w-full flex h-12 sm:h-24 gap-4 bg-black font-sans">
      <ul className="flex text-white">
        <li>NASA APOD: Astronomy Picture of the Day</li>
      </ul>
    </nav>
  );
}
