import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req:Request){

 const {
  nama,
  tanggal,
  jumlahOrang,
  pesanan,
  total,
  bukti,
  waktu
 } = await req.json();

 await db.query(
  "INSERT INTO pesanan (nama,tanggal,jumlahOrang,pesanan,total,bukti,waktu) VALUES (?,?,?,?,?,?,?)",
  [
   nama,
   tanggal,
   jumlahOrang,
   JSON.stringify(pesanan),
   total,
   bukti,
   waktu
  ]
 );

 return NextResponse.json({success:true});

}

export async function GET(){

 const [rows] = await db.query(
  "SELECT * FROM pesanan ORDER BY id DESC"
 );

 return NextResponse.json(rows);

}