"use client";

import { MessageCircle } from "lucide-react";
import { useEffect } from "react";

export default function Contact() {
  const phoneNumber = "6285157715199"; // ganti dengan nomor WhatsApp kamu
  const message = "Halo, saya ingin bertanya tentang acara bukber.";

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  // console saat komponen dirender
  console.log("Contact component dirender");

  // console saat halaman dibuka
  useEffect(() => {
    console.log("Halaman Contact berhasil dibuka");
  }, []);

  const handleWhatsAppClick = () => {
    console.log("User klik tombol Chat WhatsApp");
    console.log("Nomor tujuan:", phoneNumber);
    console.log("Pesan yang dikirim:", message);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-800 text-white flex items-center justify-center px-6">

      <div className="text-center max-w-xl">

        <h1 className="text-4xl font-bold mb-6">
          Hubungi <span className="text-green-400">Kami</span>
        </h1>

        <p className="text-zinc-300 mb-10">
          Jika kamu memiliki pertanyaan lebih lanjut,
          silakan hubungi kami melalui WhatsApp.
        </p>

        {/* WhatsApp Button */}
        <a
          href={whatsappLink}
          target="_blank"
          onClick={handleWhatsAppClick}
          className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-400 text-black font-semibold px-6 py-3 rounded-xl transition"
        >
          <MessageCircle size={24} />
          Chat WhatsApp
        </a>

      </div>

    </div>
  );
}