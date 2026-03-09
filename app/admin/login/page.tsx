"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginAdmin(){

  const router = useRouter();

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");

  const login = () => {

    if(username === "admin" && password === "1234"){

      localStorage.setItem("adminLogin","true");

      router.push("/admin");

    } else {

      alert("Username atau Password salah");

    }

  };

  return(

    <div className="min-h-screen bg-black text-white flex justify-center items-center">

      <div className="bg-zinc-900 p-8 rounded-xl w-80">

        <h1 className="text-xl font-bold mb-6 text-center">
          Login Admin
        </h1>

        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 mb-3 rounded bg-zinc-800"
          onChange={(e)=>setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded bg-zinc-800"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="bg-green-500 w-full py-3 rounded text-black font-semibold"
        >
          Login
        </button>

      </div>

    </div>

  )

}