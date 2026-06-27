export default function Hero() {
  return (
    <section className="relative h-[820px] overflow-hidden">

      {/* background image */}
      <img
        src="dembee-tsogoo-PU_hcOj2rFI-unsplash.jpg"
        alt="Монголын нар жаргах үеийн байгаль"
        className="absolute inset-0 h-full w-full object-cover scale-105"
      />

      {/* overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* content */}
      <div className="relative mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-8 text-center text-white">

        {/* badge */}
        <span className="mb-6 rounded-full bg-white/10 px-4 py-2 text-xs text-white backdrop-blur">
          AI аяллын маршрут төлөвлөгч
        </span>

        {/* title */}
        <h1 className="max-w-4xl text-5xl md:text-6xl font-bold leading-tight">
          Монгол орны аяллаа
          <br />
          <span className="text-teal-300">ухаалгаар төлөвлөөрэй</span>
        </h1>

        {/* description */}
        <p className="mt-6 max-w-2xl text-base md:text-lg text-gray-200 leading-relaxed">
          MonTrip нь таны төсөв, хугацаа, сонирхолд тулгуурлан
          хиймэл оюун ашиглан хамгийн оновчтой аяллын маршрутыг
          хэдхэн секундын дотор гаргаж өгнө.
        </p>

        {/* buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4">

          <button className="rounded-full bg-teal-700 px-8 py-4 font-medium hover:bg-teal-800 active:scale-95 transition">
            Аяллаа эхлүүлэх →
          </button>

          <button className="rounded-full bg-white px-8 py-4 text-black hover:bg-gray-100 active:scale-95 transition">
            Дэлгэрэнгүй
          </button>

        </div>

      </div>
    </section>
  );
}

// pinequest-s4-e2-team-4 https://deih43ym53wif.cloudfront.net/large_yurta-mongolia-shutterstock_600892928_dc8a31bf9c.jpeg