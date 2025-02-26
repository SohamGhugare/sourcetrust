import { Geist, Geist_Mono } from "next/font/google";
import Navbar from '../components/Navbar';
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Features from "../components/Features";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-white`}>
      <Navbar />
      <main className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Hero />
          <Stats />
          <Features />
        </div>
      </main>
    </div>
  );
}
