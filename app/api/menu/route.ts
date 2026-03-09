import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {

  try {

    const [rows] = await db.query(
      "SELECT * FROM menu"
    );

    return NextResponse.json(rows);

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      { error: "Gagal mengambil menu" },
      { status: 500 }
    );

  }

}