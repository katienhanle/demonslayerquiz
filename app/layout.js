// app/layout.js
import "./globals.css";
import { Jersey_25 } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"


const jersey25 = Jersey_25({ subsets: ["latin"], weight: "400" });

export const metadata = { title: "Corps Exam", description: "Demon Slayer Inspired Personality Quiz" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={jersey25.className}>{children}<Analytics /></body>
    </html>
  );
}
