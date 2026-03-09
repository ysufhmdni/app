"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Button Hamburger */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 bg-black p-1 rounded-md"
      >
        <div className="space-y-1">
          <span className="block w-6 h-0.5 bg-white"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
        </div>
      </button>

      {/* Menu */}
      {open && (
        <div className="fixed top-0 left-0 h-full w-64 bg-zinc-900 text-white p-6 z-40">
          <h2 className="text-xl font-bold mb-6">Tam</h2>

          <nav className="flex flex-col gap-4">
            <Link
              href="/"
              className="hover:text-green-400 transition"
              onClick={() => setOpen(false)}
            >
              Home
            </Link>

            <Link
              href="/about"
              className="hover:text-green-400 transition"
              onClick={() => setOpen(false)}
            >
              About
            </Link>

            <Link
              href="/contact"
              className="hover:text-green-400 transition"
              onClick={() => setOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}