"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Pembayaran() {

  const router = useRouter();

  const [pesanan,setPesanan] = useState<any[]>([]);
  const [nama,setNama] = useState("");
  const [bukti,setBukti] = useState<string | null>(null);
  const [loading,setLoading] = useState(false);

  useEffect(()=>{

    const dataPesanan =
      JSON.parse(localStorage.getItem("pesanan") || "[]");

    const namaUser =
      localStorage.getItem("namaUser") || "";

    setPesanan(dataPesanan);
    setNama(namaUser);

  },[]);

  const total = pesanan.reduce(
    (acc,item)=>acc + item.harga * item.qty,
    0
  );

  const uploadBukti = (e:any)=>{

    const file = e.target.files[0];
    if(!file) return;

    const img = new Image();
    const reader = new FileReader();

    reader.onload = (event:any)=>{

      img.src = event.target.result;

      img.onload = ()=>{

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const maxWidth = 400;
        const scale = maxWidth / img.width;

        canvas.width = maxWidth;
        canvas.height = img.height * scale;

        ctx?.drawImage(img,0,0,canvas.width,canvas.height);

        const compressed =
          canvas.toDataURL("image/jpeg",0.6);

        setBukti(compressed);

      };

    };

    reader.readAsDataURL(file);

  };

  const kirimPembayaran = ()=>{

    if(loading) return;

    if(!bukti){
      alert("Upload bukti pembayaran");
      return;
    }

    if(pesanan.length === 0){
      alert("Tidak ada pesanan");
      return;
    }

    setLoading(true);

    const dataAdmin =
      JSON.parse(localStorage.getItem("adminPesanan") || "[]");

    // cari data user yang belum bayar
    const index = dataAdmin.findIndex(
      (item:any)=> item.nama === nama && !item.bukti
    );

    if(index !== -1){

      // UPDATE data lama
      dataAdmin[index] = {
        ...dataAdmin[index],
        pesanan: pesanan,
        total: total,
        bukti: bukti,
        waktu: new Date().toLocaleTimeString()
      };

    }else{

      // jika belum ada data
      dataAdmin.push({
        id: Date.now(),
        nama: nama,
        pesanan: pesanan,
        total: total,
        bukti: bukti,
        waktu: new Date().toLocaleTimeString()
      });

    }

    localStorage.setItem(
      "adminPesanan",
      JSON.stringify(dataAdmin)
    );

    localStorage.removeItem("pesanan");

    router.push("/berhasil");

  };

  return(

    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">

      <div className="w-full max-w-md text-center">

        <h1 className="text-2xl font-bold mb-6">
          Pembayaran
        </h1>

        <img
          src="/arman.png"
          className="w-64 mx-auto mb-4 rounded-lg"
        />

        <p className="text-zinc-400 mb-6">
          Scan QRIS untuk melakukan pembayaran
        </p>

        <p className="text-3xl font-bold text-green-400 mb-6">
          Rp{total.toLocaleString()}
        </p>

        <input
          type="file"
          accept="image/*"
          onChange={uploadBukti}
          className="mb-4 w-full"
        />

        {bukti &&(
          <img
            src={bukti}
            className="w-40 mx-auto rounded mb-4"
          />
        )}

        <button
          onClick={kirimPembayaran}
          disabled={loading}
          className="bg-green-500 w-full py-3 rounded text-black font-bold hover:bg-green-400 transition disabled:opacity-50"
        >
          {loading ? "Mengirim..." : "Kirim Bukti Pembayaran"}
        </button>

      </div>

    </div>

  );

}