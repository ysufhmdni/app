"use client";

import { useState } from "react";
import Link from "next/link";
import { FaHome, FaUser, FaEnvelope } from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-5 left-5 z-50 bg-black p-3 rounded-md"
      >
        <div className="space-y-1">
          <span className="block w-6 h-0.5 bg-white"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
        </div>
      </button>

      {/* Sidebar */}
      {open && (
        <div className="fixed top-0 left-0 h-full w-64 bg-zinc-900 text-white p-6 z-40">
          <h2 className="text-xl font-bold mb-6">Tam</h2>

          <nav className="flex flex-col gap-5">

            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 hover:text-green-500 transition"
            >
              <FaHome />
              Home
            </Link>

            <Link
              href="/about"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 hover:text-green-500 transition"
            >
              <FaUser />
              About
            </Link>

            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 hover:text-green-500 transition"
            >
              <FaEnvelope />
              Contact
            </Link>

          </nav>
        </div>
      )}
    </>
  );
}