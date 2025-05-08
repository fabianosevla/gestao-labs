"use client";

import "./globals.css";
import Link from "next/link";

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
                Hardware Micro
              </Link>
              <Link href="/labs/hardware/macro" className="hover:underline">
                Hardware Macro
              </Link>
              <Link href="/labs/software" className="hover:underline">
                Software
              </Link>
              <Link href="/labs/users/admin" className="hover:underline">
                Usuários Admin
              </Link>
              <Link href="/labs/users/visitor" className="hover:underline">
                Usuários Visitantes
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