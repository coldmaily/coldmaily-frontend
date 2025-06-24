import Hero from "@/components/LandingPage/Hero";
import Header from "@/components/LandingPage/Header";
import Footer from "@/components/LandingPage/Footer";


export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <Footer />
    </main>
  );
}
