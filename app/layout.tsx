import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aisha AI Studio — Бизнес автоматтандыру тесті",
  description:
    "7 сұраққа жауап беріңіз және бизнесіңіздің автоматтандыру деңгейін біліңіз. 20% жеңілдік алыңыз!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="kk">
      <body>{children}</body>
    </html>
  );
}
