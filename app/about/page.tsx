import { UserPlus, QrCode, LayoutDashboard } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-800 text-white flex flex-col items-center justify-center px-6">

      <div className="max-w-5xl text-center pt-20">

        <h1 className="text-4xl font-bold mb-6">
          Tentang <span className="text-green-400">Bukber App</span>
        </h1>

        <p className="text-zinc-300 text-lg mb-12 leading-relaxed">
          Bukber App adalah platform yang memudahkan mahasiswa dan komunitas
          untuk melakukan pendaftaran acara buka bersama dengan cepat,
          praktis, dan modern.
        </p>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8">

          {/* Card 1 */}
          <div className="bg-zinc-900 p-8 rounded-xl hover:bg-zinc-800 transition flex flex-col items-center text-center">
            <UserPlus size={40} className="text-green-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Pendaftaran Mudah</h3>
            <p className="text-zinc-400">
              Peserta dapat mendaftar dengan cepat tanpa perlu membuat akun.
              Cukup isi nama dan pilih menu makanan.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-zinc-900 p-8 rounded-xl hover:bg-zinc-800 transition flex flex-col items-center text-center">
            <QrCode size={40} className="text-green-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Pembayaran Mudah</h3>
            <p className="text-zinc-400">
              Pembayaran dilakukan menggunakan QRIS sehingga lebih cepat,
              praktis, dan dapat digunakan oleh berbagai aplikasi pembayaran.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-zinc-900 p-8 rounded-xl hover:bg-zinc-800 transition flex flex-col items-center text-center">
            <LayoutDashboard size={40} className="text-green-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Mudah Diakses</h3>
            <p className="text-zinc-400">
              Anda dapat mengakses Aplikasi ini dimanapun dan kapanpun kalian berada.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}