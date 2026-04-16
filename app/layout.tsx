import type { Metadata } from "next";
import React from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Coach",
  description: "Your personal AI fitness coach",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-black">
        <div className="max-w-3xl mx-auto p-4">{children}</div>
      </body>
    </html>
  );
}
