import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "./components/header";

const roboto = Roboto( { subsets: ["cyrillic"], weight: ["100", "300", "400", "500", "700", "900"]} );

export const metadata: Metadata = {
  title: "MP Blog | Home",
  description: "MP blog site",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Header />
        {children}
      </body>
    </html>
  );
};