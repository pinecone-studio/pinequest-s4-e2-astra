
export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-8 py-16 md:grid-cols-3">
        <div>
          <h2 className="mb-4 text-2xl font-bold text-teal-700">
            MonTrip
          </h2>

          <p className="text-gray-500">
            © 2026 MonTrip AI Travel Platform.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-gray-600 font-semibold">
            Product
          </h3>

          <ul className="space-y-2 text-gray-500">
            <li>AI Planner</li>
            <li>Routes</li>
            <li>Pricing</li>
            <li>Adventure Guide</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-gray-600 font-semibold">
            Company
          </h3>

          <ul className="space-y-2 text-gray-500">
            <li>About Us</li>
            <li>Terms</li>
            <li>Privacy Policy</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}