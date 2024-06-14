import Image from "next/image";
import Hero from '@/components/Hero';
//import { Globe } from "@/components/ui/globe";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main >
      <div>
        <Navbar />
        <Hero />
        <hr  />
        
        {/* <Globe /> */}

      </div>
    </main>
  );
}
