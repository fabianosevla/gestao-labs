"use client";

import "./globals.css";
import Link from "next/link";
import { useState } from "react";

export default function RootLayout({ children }) {
  const [hardwareOpen, setHardwareOpen] = useState(false);
  const [usersOpen, setUsersOpen] = useState(false);

  const handleClickOutside = (e) => {
    if (!e.target.closest(".dropdown")) {
      setHardwareOpen(false);
      setUsersOpen(false);
    }
  };

  return (
    <html lang="pt-BR">
      <body
        className="bg-gray-100 min-h-screen"
        onClick={handleClickOutside}
      >
        <nav className="bg-gradient-to-r from-blue-700 to-blue-500 text-white p-4 shadow-lg">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDEwMCAxMDAiPgogIDxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJub25lIi8+CiAgPHRleHQgeD0iMTAiIHk9IjUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiMwMDU1ODkiPlVOSUZFSTwvdGV4dD4KICA8Y2lyY2xlIGN4PSI4MCIgY3k9IjIwIiByPSI1IiBmaWxsPSIjMDA1NTg5Ii8+CiAgPGxpbmUgeDE9IjgwIiB5MT0iMzAiIHgyPSI4MCIgeTI9IjUwIiBzdHJva2U9IiMwMDU1ODkiIHN0cm9rZS13aWR0aD0iMiIvPgogIDxsaW5lIHgxPSI3MCIgeTE9IjUwIiB4Mj0iOTAiIHkyPSI1MCIgc3Ryb2tlPSIjMDA1NTg5IiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+"
                alt="Logo da Universidade Federal de Itajubá"
                className="h-10 w-10"
              />
              <Link href="/" className="text-2xl font-bold text-white hover:text-gray-200 transition">
                Gerenciamento de Laboratórios
              </Link>
            </div>
            <div className="relative flex items-center space-x-6">
              <div className="dropdown relative">
                <button
                  onClick={() => setHardwareOpen(!hardwareOpen)}
                  className="px-4 py-2 text-white hover:bg-blue-600 rounded-lg transition duration-300"
                >
                  Hardware
                </button>
                {hardwareOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-xl z-10 animate-fade-in">
                    <Link
                      href="/labs/hardware/micro"
                      className="block px-4 py-2 hover:bg-blue-100 transition"
                      onClick={() => setHardwareOpen(false)}
                    >
                      Micro
                    </Link>
                    <Link
                      href="/labs/hardware/macro"
                      className="block px-4 py-2 hover:bg-blue-100 transition"
                      onClick={() => setHardwareOpen(false)}
                    >
                      Macro
                    </Link>
                  </div>
                )}
              </div>
              <Link
                href="/labs/software"
                className="px-4 py-2 text-white hover:bg-blue-600 rounded-lg transition duration-300"
              >
                Software
              </Link>
              <div className="dropdown relative">
                <button
                  onClick={() => setUsersOpen(!usersOpen)}
                  className="px-4 py-2 text-white hover:bg-blue-600 rounded-lg transition duration-300"
                >
                  Usuários
                </button>
                {usersOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-xl z-10 animate-fade-in">
                    <Link
                      href="/labs/users/admin"
                      className="block px-4 py-2 hover:bg-blue-100 transition"
                      onClick={() => setUsersOpen(false)}
                    >
                      Administradores
                    </Link>
                    <Link
                      href="/labs/users/visitor"
                      className="block px-4 py-2 hover:bg-blue-100 transition"
                      onClick={() => setUsersOpen(false)}
                    >
                      Visitantes
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}

/* Adicionar animação no CSS global */
const style = document.createElement("style");
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fadeIn 0.2s ease-out;
  }
`;
document.head.appendChild(style);