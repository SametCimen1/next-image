import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Hero12 from "@/components/HeroSection";

export default function Home() {
  return (
    <main className="flex flex-col mt-5">
    
      <Hero12></Hero12>

      {/* <Link className="mb-5" href="/login">
        <Button variant={'secondary'}>Login</Button>
      </Link>
      <Link className="mb-5" href="/signup">
        <Button >Signup</Button>
      </Link>
      <Link className="" href="/home">
        <Button variant={"ghost"}>Home Page</Button>
      </Link> */}

    </main>
  );
}
