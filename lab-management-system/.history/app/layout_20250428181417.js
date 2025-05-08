"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  if (pathname === "/login") return null;

  return (
    <nav className="bg-blue-700 text-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-semibold tracking-wide">Lab Management System</h1>
        <div className="flex space-x-6">
          {/* Usuários */}
          <div className="relative group">
            <button className="px-4 py-2 rounded-lg hover:bg-blue-800 transition duration-300 ease-in-out">
              Usuários
            </button>
            <div className="absolute left-0 mt-1 w-40 bg-white text-gray-800 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transform -translate-y-2 transition-all duration-300 ease-in-out z-10">
              <Link href="/users/visitors" className="block px-4 py-2 hover:bg-blue-50 rounded-t-lg">Visitantes</Link>
              <Link href="/users/admins" className="block px-4 py-2 hover:bg-blue-50 rounded-b-lg">Admin</Link>
            </div>
          </div>

          {/* Laboratórios */}
          <div className="relative group">
            <button className="px-4 py-2 rounded-lg hover:bg-blue-800 transition duration-300 ease-in-out">
              Laboratórios
            </button>
            <div className="absolute left-0 mt-1 w-40 bg-white text-gray-800 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transform -translate-y-2 transition-all duration-300 ease-in-out z-10">
              <div className="relative group/sub">
                <button className="block px-4 py-2 hover:bg-blue-50 w-full text-left">
                  Hardware
                </button>
                <div className="absolute left-40 top-0 w-40 bg-white text-gray-800 rounded-lg shadow-xl opacity-0 group-hover/sub:opacity-100 group-hover/sub:translate-x-0 transform -translate-x-2 transition-all duration-300 ease-in-out z-10">
                  <Link href="/labs/hardware/micro" className="block px-4 py-2 hover:bg-blue-50 rounded-t-lg">Micro</Link>
                  <Link href="/labs/hardware/macro" className="block px-4 py-2 hover:bg-blue-50 rounded-b-lg">Macro</Link>
                </div>
              </div>
              <Link href="/labs/software" className="block px-4 py-2 hover:bg-blue-50 rounded-b-lg">Software</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}