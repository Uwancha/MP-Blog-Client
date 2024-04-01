import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto( { subsets: ["cyrillic"], weight: "300"} );

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
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
