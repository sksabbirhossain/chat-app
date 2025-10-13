import Providers from "@/utils/Providers";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata = {
  title: "Chat App",
  description: "A simple chat application built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geist.className} bg-gray-200 antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
