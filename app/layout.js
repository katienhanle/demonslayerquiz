// app/layout.js
import "./globals.css";
import { Jersey_25 } from "next/font/google";

const jersey25 = Jersey_25({ subsets: ["latin"], weight: "400" });

export const metadata = { title: "Demon Slayer Quiz", description: "Which Hashira are you?" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={jersey25.className}>{children}</body>
    </html>
  );
}
