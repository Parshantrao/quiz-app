import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Quiz-app",
  description: "A dynamic and interactive web application for taking quizzes on various subjects with different difficulty levels. Fully automated with real-time scoring.",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
