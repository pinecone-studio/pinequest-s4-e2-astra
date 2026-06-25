import Header from "./Header";
import Hero from "./Hero";
import About from "./About";

export default function LandingPage() {
  return (
    <main className="bg-[#f8f8f8]">
      <Header />
      <Hero />
      <About />
    </main>
  );
}