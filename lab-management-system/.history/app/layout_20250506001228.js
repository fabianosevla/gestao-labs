"use client";

import "./globals.css";
import Link from "next/link";
import { useState } from "react";

export default function RootLayout({ children }) {
  const [hardwareOpen, setHardwareOpen] = useState(false);
  const [usersOpen, setUsersOpen] = useState(false);

  return (
    <html lang="pt-BR">
      <body className="bg-gray-100">
        <nav className="bg-blue-600 text-white p-4 fixed w-full top-0 z-10 shadow-md">
          <div className="container mx-auto flex items-center">
            <span className="text-2xl mr-2">🔧</span>
            <Link href="/" className="text-2xl font-bold">
              Gerenciamento de Laboratórios
            </Link>
            <div className="ml-auto space-x-4 flex items-center">
              <div
                className="relative"
                onMouseEnter={() => setHardwareOpen(true)}
                onMouseLeave={() => setHardwareOpen(false)}
              >
                <span className="cursor-pointer hover:underline">Hardware</span>
                {hardwareOpen && (
                  <div className="absolute bg-blue-500 text-white rounded-lg shadow-lg mt-2 py-2 w-40">
                    <Link
                      href="/labs/hardware/micro"
                      className="block px-4 py-2 hover:bg-blue-700"
                    >
                      Micro
                    </Link>
                    <Link
                      href="/labs/hardware/macro"
                      className="block px-4 py-2 hover:bg-blue-700"
                    >
                      Macro
                    </Link>
                  </div>
                )}
              </div>
              <Link href="/labs/software" className="hover:underline">
                Software
              </Link>
              <div
                className="relative"
                onMouseEnter={() => setUsersOpen(true)}
                onMouseLeave={() => setUsersOpen(false)}
              >
                <span className="cursor-pointer hover:underline">Usuários</span>
                {usersOpen && (
                  <div className="absolute bg-blue-500 text-white rounded-lg shadow-lg mt-2 py-2 w-40">
                    <Link
                      href="/labs/users/admin"
                      className="block px-4 py-2 hover:bg-blue-700"
                    >
                      Administradores
                    </Link>
                    <Link
                      href="/labs/users/visitor"
                      className="block px-4 py-2 hover:bg-blue-700"
                    >
                      Visitantes
                    </Link>
                  </div>
                )}
              </div>
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