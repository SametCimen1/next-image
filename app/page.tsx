
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/HeroSection";
import HerolImageUpload from "@/components/HerolImageUpload" 
import { SessionProvider } from "next-auth/react"
import { auth } from "@/auth";
import Footer from "@/components/Footer";
import Desc from '@/components/Desc'
import AImages from '@/components/AImages';
import { useRouter } from "next/navigation";

export default async function Home() {


  const session = await auth();

  return (
    <main className="flex flex-col" suppressHydrationWarning>
      <SessionProvider basePath={"/api/auth"} session={session}>
        <Hero />
        <HerolImageUpload />
        <Desc/>
        <AImages />
        <Footer/>
      </SessionProvider>
    </main>
  );
}