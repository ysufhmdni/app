"use client";

import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";

export default function Berhasil() {

  const router = useRouter();

  const kembaliHome = () => {
    router.push("/");
  };

  return (

    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">

      <div className="text-center max-w-md">

        <CheckCircle
          size={80}
          className="text-green-400 mx-auto mb-6"
        />

        <h1 className="text-3xl font-bold mb-3">
          Pembayaran Berhasil
        </h1>

        <p className="text-zinc-400 mb-8">
          Terima kasih, pesanan kamu sudah kami terima.
          Silakan tunggu konfirmasi ya manies.
        </p>

        <button
          onClick={kembaliHome}
          className="bg-green-500 w-full py-3 rounded text-black font-bold hover:bg-green-400 transition"
        >
          Kembali ke Halaman Awal
        </button>

      </div>

    </div>

  );

}