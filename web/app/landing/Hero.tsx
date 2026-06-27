export default function Hero() {
  return (
    <section className="relative h-[800px] overflow-hidden">
      <img
        src="dembee-tsogoo-PU_hcOj2rFI-unsplash.jpg"
        alt="Mongolian sunset with ger"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/25" />

      <div className="relative mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-8 text-center text-white">
        <h1 className="max-w-4xl text-6xl font-bold">
          Plan Your Perfect Mongolian Adventure
          <span className="block text-teal-300">
            with AI
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-gray-200">
          Discover personalized travel routes across
          Mongolia with intelligent planning.
        </p>

        <div className="mt-10 flex gap-4">
          <button className="rounded-full bg-teal-700 px-8 py-4 font-medium">
            Start Planning Now
          </button>

          <button className="rounded-full bg-white px-8 py-4 text-black">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}

// pinequest-s4-e2-team-4 https://deih43ym53wif.cloudfront.net/large_yurta-mongolia-shutterstock_600892928_dc8a31bf9c.jpeg