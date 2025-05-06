"use client";

import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Gerenciamento de Laboratórios",
  description: "Sistema para gerenciamento de hardware de laboratórios",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-100">
        <nav className="bg-blue-600 text-white p-4 fixed w-full top-0 z-10 shadow-md">
          <div className="container mx-auto flex items-center">
            <span className="text-2xl mr-2">🔧</span>
            <Link href="/" className="text-2xl font-bold">
              Gerenciamento de Laboratórios
            </Link>
            <div className="ml-auto space-x-4">
              <Link href="/labs/hardware/micro" className="hover:underline">
                Micro
              </Link>
              <Link href="/labs/hardware/macro" className="hover:underline">
                Macro
              </Link>
              <Link href="/login" className="hover:underline">
                Login
              </Link>
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}