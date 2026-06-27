interface DestinationCardProps {
  image: string;
  title: string;
}

export default function DestinationCard({
  image,
  title,
}: DestinationCardProps) {
  return (
    <div className="group cursor-pointer">

      {/* image */}
      <div className="overflow-hidden rounded-2xl shadow-md">
        <img
          src={image}
          alt={title}
          className="h-60 w-full object-cover transition duration-700 group-hover:scale-110"
        />
      </div>

      {/* content */}
      <div className="mt-3 flex items-center justify-between px-1">

        <span className="font-medium text-gray-800">
          {title}
        </span>

        <button className="text-xs font-medium text-teal-700 hover:text-teal-900 hover:underline transition">
          Маршрут үүсгэх →
        </button>

      </div>
    </div>
  );
}