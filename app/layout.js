import Providers from "@/utils/Providers";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Chat App",
    template: "%s - Chat App",
  },
  description: "A real-time chat app built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.className} bg-gray-200 antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
