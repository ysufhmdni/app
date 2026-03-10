"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Daftar() {

  const router = useRouter();

  const [namaKelompok, setNamaKelompok] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [jumlahOrang, setJumlahOrang] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return; // mencegah klik dua kali
    setLoading(true);

    if (!namaKelompok || !tanggal || !jumlahOrang) {
      alert("Lengkapi data terlebih dahulu");
      setLoading(false);
      return;
    }

    const dataAdmin =
      JSON.parse(localStorage.getItem("adminPesanan") || "[]");

    const userBaru = {
      id: Date.now(),
      nama: namaKelompok,
      tanggal: tanggal,
      jumlahOrang: jumlahOrang,
      pesanan: [],
      total: 0,
      bukti: null,
      waktu: null
    };

    dataAdmin.push(userBaru);

    localStorage.setItem(
      "adminPesanan",
      JSON.stringify(dataAdmin)
    );

    localStorage.setItem("userId", userBaru.id.toString());
    localStorage.setItem("namaUser", namaKelompok);

    alert("Data berhasil disimpan, silakan pilih menu!");

    router.push("/menu");
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-black text-white px-6">

      <div className="w-full max-w-md bg-zinc-900 p-8 rounded-xl shadow-lg">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Booking Bukber
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="Nama Lengkap Prennnn"
            value={namaKelompok}
            onChange={(e) => setNamaKelompok(e.target.value)}
            className="p-3 rounded-md bg-zinc-800 border border-zinc-700"
            required
          />

          <input
            type="date"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            className="p-3 rounded-md bg-zinc-800 border border-zinc-700"
            required
          />

          <input
            type="number"
            placeholder="Jumlah Orang"
            value={jumlahOrang}
            onChange={(e) => setJumlahOrang(e.target.value)}
            className="p-3 rounded-md bg-zinc-800 border border-zinc-700"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-green-500 text-black font-semibold p-3 rounded-md hover:bg-green-400 transition disabled:opacity-50"
          >
            {loading ? "Memproses..." : "Lanjut Pilih Menu"}
          </button>

        </form>

      </div>

    </div>
  );
}