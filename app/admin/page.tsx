"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2, Check, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Admin(){

  const router = useRouter();

  const [data,setData] = useState<any[]>([]);
  const [editIndex,setEditIndex] = useState<number | null>(null);
  const [editData,setEditData] = useState<any>({});

  useEffect(()=>{

    const isLogin = localStorage.getItem("adminLogin");

    if(!isLogin){
      router.push("/admin/login");
      return;
    }

    const pesanan =
      JSON.parse(localStorage.getItem("adminPesanan") || "[]");

    setData(pesanan);

  },[router]);

  const logout = ()=>{

    localStorage.removeItem("adminLogin");
    router.push("/admin/login");

  };

  const hapusData = (index:number)=>{

    if(!confirm("Yakin ingin menghapus data ini?")) return;

    const update = [...data];

    update.splice(index,1);

    setData(update);

    localStorage.setItem(
      "adminPesanan",
      JSON.stringify(update)
    );

  };

  const mulaiEdit = (index:number)=>{

    setEditIndex(index);
    setEditData({...data[index]});

  };

  const simpanEdit = ()=>{

    if(editIndex === null) return;

    const update = [...data];

    update[editIndex] = {
      ...editData,
      jumlahOrang:Number(editData.jumlahOrang)
    };

    setData(update);

    localStorage.setItem(
      "adminPesanan",
      JSON.stringify(update)
    );

    setEditIndex(null);

  };

  const totalMasuk = data.reduce(
    (acc,item)=>acc + (Number(item.total) || 0),
    0
  );

  return(

    <div className="min-h-screen bg-black text-white p-10">

      <div className="flex justify-between items-center mb-4">

        <h1 className="text-2xl font-bold">
          Dashboard Admin
        </h1>

        <button
          onClick={logout}
          className="flex items-center gap-2 bg-red-500 px-4 py-2 rounded hover:bg-red-400 transition"
        >
          <LogOut size={18}/>
          Logout
        </button>

      </div>

      <p className="text-green-400 font-bold mb-6">
        Total Pembayaran Masuk : Rp{totalMasuk.toLocaleString()}
      </p>

      <div className="overflow-x-auto">

        <table className="w-full border border-zinc-700">

          <thead className="bg-zinc-900">

            <tr>
              <th className="p-3 border border-zinc-700">Nama</th>
              <th className="p-3 border border-zinc-700">Tanggal</th>
              <th className="p-3 border border-zinc-700">Orang</th>
              <th className="p-3 border border-zinc-700">Pesanan</th>
              <th className="p-3 border border-zinc-700">Total Bayar</th>
              <th className="p-3 border border-zinc-700">Bukti</th>
              <th className="p-3 border border-zinc-700">Jam Bayar</th>
              <th className="p-3 border border-zinc-700">Aksi</th>
            </tr>

          </thead>

          <tbody>

            {data.length === 0 ? (

              <tr>
                <td colSpan={8} className="p-6 text-center text-zinc-400">
                  Belum ada pesanan
                </td>
              </tr>

            ) : (

              data.map((item,index)=>(

                <tr key={index} className="text-center">

                  <td className="p-3 border border-zinc-700">
                    {item.nama}
                  </td>

                  <td className="p-3 border border-zinc-700 text-cyan-400">
                    {item.tanggal || "-"}
                  </td>

                  <td className="p-3 border border-zinc-700 text-yellow-400">
                    {item.jumlahOrang || "-"}
                  </td>

                  <td className="p-3 border border-zinc-700">

                    {item.pesanan?.length > 0 ? (

                      item.pesanan.map((p:any)=>(
                        <p key={p.id}>
                          {p.nama} x{p.qty}
                        </p>
                      ))

                    ) : (

                      <span className="text-zinc-500">
                        Belum pilih menu
                      </span>

                    )}

                  </td>

                  <td className="p-3 border border-zinc-700 text-green-400 font-bold">
                    Rp{Number(item.total || 0).toLocaleString()}
                  </td>

                  <td className="p-3 border border-zinc-700">

                    {item.bukti ? (

                      <img
                        src={item.bukti}
                        className="w-20 mx-auto rounded"
                      />

                    ) : (

                      <span className="text-zinc-500">
                        Belum bayar
                      </span>

                    )}

                  </td>

                  <td className="p-3 border border-zinc-700 text-green-400">
                    {item.waktu || "-"}
                  </td>

                  <td className="p-3 border border-zinc-700">

                    <div className="flex justify-center gap-4">

                      <button
                        onClick={()=>mulaiEdit(index)}
                        className="text-yellow-400 hover:text-yellow-300"
                      >
                        <Pencil size={20}/>
                      </button>

                      <button
                        onClick={()=>hapusData(index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={20}/>
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}