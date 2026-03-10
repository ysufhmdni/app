export async function GET() {
  const menu = [
    {
      id: 1,
      nama: "Ayam Bakar",
      harga: 25000,
      kategori: "Menu Bukber",
      img: "/trump.jpeg"
    },
    {
      id: 2,
      nama: "Nasi Goreng",
      harga: 20000,
      kategori: "Menu Bukber",
      img: "/trump.jpeg"
    },
    {
      id: 3,
      nama: "Es Teh",
      harga: 5000,
      kategori: "Minuman",
      img: "/trump.jpeg"
    }
  ];

  return Response.json(menu);
}