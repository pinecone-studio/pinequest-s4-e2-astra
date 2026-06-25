
export default function Hero() {
  return (
    <section className="relative h-[800px] overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
        alt="Mongolia"
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