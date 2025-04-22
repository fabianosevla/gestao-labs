"use client";

import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="bg-blue-600 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Lab Management System</h1>
                <div className="flex space-x-4">
                    <div className="relative group">
                        <button className="hover:bg-blue-700 px-3 py-2 rounded-md transition duration-300">
                            Usuários
                        </button>
                        <div className="absolute hidden group-hover:block bg-white text-gray-800 shadow-lg rounded-md mt-2">
                            <Link href="/users/visitors" className="block px-4 py-2 hover:bg-gray-100">Visitantes</Link>
                            <Link href="/users/admins" className="block px-4 py-2 hover:bg-gray-100">Admin</Link>
                        </div>
                    </div>
                    <div className="relative group">
                        <button className="hover:bg-blue-700 px-3 py-2 rounded-md transition duration-300">
                            Laboratórios
                        </button>
                        <div className="absolute hidden group-hover:block bg-white text-gray-800 shadow-lg rounded-md mt-2">
                            <div className="relative group">
                                <button className="block px-4 py-2 hover:bg-gray-100 w-full text-left">
                                    Hardware
                                </button>
                                <div className="absolute hidden group-hover:block bg-white text-gray-800 shadow-lg rounded-md mt-0 ml-40 top-0">
                                    <Link href="/labs/hardware/micro" className="block px-4 py-2 hover:bg-gray-100">Micro</Link>
                                    <Link href="/labs/hardware/macro" className="block px-4 py-2 hover:bg-gray-100">Macro</Link>
                                </div>
                            </div>
                            <Link href="/labs/software" className="block px-4 py-2 hover:bg-gray-100">Software</Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}