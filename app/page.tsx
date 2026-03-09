"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {

  const router = useRouter();

  useEffect(() => {
    console.log("Halaman Home berhasil dibuka");
  }, []);

  const handleDaftar = () => {
    console.log("User klik tombol Daftar Sekarang");
    router.push("/daftar");
  };

  const handleAdmin = () => {
    console.log("Admin membuka halaman login");
    router.push("/admin/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">

      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center gap-10 px-10 py-16 bg-white dark:bg-black">

        {/* Logo */}
        <Image
          src="https://png.pngtree.com/png-clipart/20230412/original/pngtree-open-bukber-with-logo-text-effect-png-image_9048114.png"
          alt="Bukber"
          width={220}
          height={160}
          priority
        />

        {/* Text */}
        <div className="flex flex-col items-center gap-4 text-center">

          <h1 className="text-3xl font-semibold leading-snug text-black dark:text-zinc-50">
            Indahnya Kebersamaan di Bulan Ramadan
          </h1>

          <p className="max-w-md text-zinc-600 dark:text-zinc-400">
            Suasana hangat memperkuat tali silaturahmi dan menjadikan Ramadan penuh berkah.
          </p>

          <span
            className="font-medium text-zinc-900 dark:text-zinc-50 cursor-pointer"
            onClick={() => console.log("User melihat Join with us")}
          >
            Join with us
          </span>

        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4 w-full max-w-xs">

          <button
            onClick={handleDaftar}
            className="h-12 rounded-full bg-green-500 text-black font-semibold hover:bg-green-400 transition"
          >
            Daftar Sekarang
          </button>

          <button
            onClick={handleAdmin}
            className="h-12 rounded-full bg-zinc-800 text-white hover:bg-zinc-700 transition"
          >
            Login Admin
          </button>

        </div>

      </main>

    </div>
  );
}