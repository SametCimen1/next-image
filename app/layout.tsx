import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/navigation/nav";
import { cn } from "@/lib/utils";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next-image",
  description: "AI and image editing tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <body className={cn("w-4/5 m-auto", inter.className)}> */}
      <body className={cn("", inter.className)}>
        <Nav/>
        {children}
      </body>
    </html>
  );
}