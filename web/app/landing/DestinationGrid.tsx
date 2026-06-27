

import DestinationCard from "./Destination";

const destinations = [
  {
    title: "Khuvsgul Lake",
    image:
      "sodo-sane-eDcdGQRSVj8-unsplash.jpg",
  },
  {
    title: "Gobi Desert",
    image:
      "usukhbayar-gankhuyag-fjCihZthrAo-unsplash.jpg",
  },
  {
    title: "Gorkhi-Terelj",
    image:
      "adil-edin-GUwlwDVQN_g-unsplash.jpg",
  },
  {
    title: "Altai Tavan Bogd",
    image:
      "konstantin-dyadyun-7-6Fhdc2LJc-unsplash.jpg",
  },
];

export default function DestinationGallery() {
  return (
    <section className="mx-auto max-w-7xl px-8 py-24">
      <div className="mb-12 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Destinations</p>

          <h2 className="text-5xl text-gray-600 font-semibold">
            Discover the Land of the
            <br />
            Eternal Blue Sky
          </h2>
        </div>

        <button className="rounded-full border px-5 py-2 text-sm">
          Explore All Regions
        </button>
      </div>

      <div className="grid gap-6 text-gray-600 md:grid-cols-4">
        {destinations.map((item) => (
          <DestinationCard
            key={item.title}
            {...item}
          />
        ))}
      </div>
    </section>
  );
}
