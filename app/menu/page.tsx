"use client";

import { useState, useEffect } from "react";
import { Plus, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Menu() {

  const router = useRouter();

  const [menuList,setMenuList] = useState<any[]>([]);
  const [pesanan,setPesanan] = useState<any[]>([]);
  const [animasi,setAnimasi] = useState<number | null>(null);

  // ambil menu dari database
  useEffect(()=>{

    const ambilMenu = async ()=>{

      const res = await fetch("/api/menu");

      const data = await res.json();

      // tambahkan tipe default agar tetap bisa difilter
      const menuDenganTipe = data.map((item:any)=>({
        ...item,
        tipe:"makanan", 
        kategori:"Menu Bukber",
        img:"/trump.jpeg"
      }));

      setMenuList(menuDenganTipe);

    };

    ambilMenu();

  },[]);

  const tambahPesanan = (menu:any)=>{

    setAnimasi(menu.id);
    setTimeout(()=>setAnimasi(null),200);

    const ada = pesanan.find((p)=>p.id===menu.id);

    if(ada){

      const update = pesanan.map((p)=>
        p.id===menu.id ? {...p, qty:p.qty+1} : p
      );

      setPesanan(update);

    }else{

      setPesanan([...pesanan,{...menu,qty:1}]);

    }

  };

  const kurangPesanan = (id:number)=>{

    const item = pesanan.find((p)=>p.id===id);
    if(!item) return;

    if(item.qty===1){

      setPesanan(pesanan.filter((p)=>p.id!==id));

    }else{

      const update = pesanan.map((p)=>
        p.id===id ? {...p,qty:p.qty-1} : p
      );

      setPesanan(update);

    }

  };

  const hapusPesanan = (id:number)=>{
    setPesanan(pesanan.filter((p)=>p.id!==id));
  };

  const total = pesanan.reduce((acc,item)=>acc+item.harga*item.qty,0);

  const lanjutPembayaran = ()=>{

    if(pesanan.length===0){
      alert("Silakan pilih menu dulu");
      return;
    }

    localStorage.setItem("pesanan",JSON.stringify(pesanan));
    localStorage.setItem("totalHarga",total.toString());

    router.push("/pembayaran");

  };

  const renderMenu = ()=>{

    return menuList.map((menu)=>{

      const dipilih = pesanan.find((p)=>p.id===menu.id);

      return(

        <div
          key={menu.id}
          className={`bg-zinc-200 text-black rounded-2xl p-6 flex justify-between items-center transition-all duration-200
          ${animasi===menu.id?"scale-105 shadow-xl":""}`}
        >

          <div>
            <p className="text-sm font-semibold">{menu.nama}</p>
            <p className="text-green-600">{menu.kategori}</p>
            <p className="text-green-600 font-bold">
              Rp{menu.harga.toLocaleString()}
            </p>
          </div>

          <div className="flex items-center gap-6">

            <img src={menu.img} className="w-14 h-14 object-cover rounded"/>

            {dipilih ? (

              <div className="flex items-center gap-2 bg-zinc-300 rounded-full px-2 py-1">

                <button
                  onClick={()=>kurangPesanan(menu.id)}
                  className="w-8 h-8 bg-zinc-600 text-white rounded-full"
                >
                  -
                </button>

                <span className="text-sm font-semibold">
                  {dipilih.qty}
                </span>

                <button
                  onClick={()=>tambahPesanan(menu)}
                  className="w-8 h-8 bg-green-500 text-white rounded-full"
                >
                  +
                </button>

              </div>

            ):(

              <button
                onClick={()=>tambahPesanan(menu)}
                className="w-12 h-12 bg-zinc-600 text-white rounded-full flex items-center justify-center"
              >
                <Plus/>
              </button>

            )}

          </div>

        </div>

      );

    });

  };

  return(

    <div className="min-h-screen bg-black text-white px-6 py-10">

      <h1 className="text-2xl font-bold mb-6 pt-20">
        Menu Buka Bersama
      </h1>

      <div className="flex flex-col gap-6 mb-32">
        {renderMenu()}
      </div>

      {pesanan.length>0 &&(

        <div className="fixed bottom-0 left-0 w-full bg-zinc-900 p-5 border-t border-zinc-800">

          <div className="max-w-xl mx-auto">

            <p className="text-sm text-zinc-400 mb-2">
              Pesanan Anda
            </p>

            {pesanan.map((item)=>(
              <div key={item.id} className="flex justify-between mb-2">
                <span>
                  {item.nama} x{item.qty} - Rp{(item.harga*item.qty).toLocaleString()}
                </span>
                <button
                  onClick={()=>hapusPesanan(item.id)}
                  className="text-red-500"
                >
                  <Trash size={18}/>
                </button>
              </div>
            ))}

            <div className="flex justify-between mt-3 font-bold">
              <span>Total</span>
              <span className="text-green-400">
                Rp{total.toLocaleString()}
              </span>
            </div>

            <button
              onClick={lanjutPembayaran}
              className="bg-green-500 w-full mt-4 py-3 rounded-lg text-black font-semibold hover:bg-green-400 transition"
            >
              Lanjut Pembayaran
            </button>

          </div>

        </div>

      )}

    </div>

  );

}