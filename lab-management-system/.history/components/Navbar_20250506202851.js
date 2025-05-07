"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
    const pathname = usePathname();
    const [isLoginPage, setIsLoginPage] = useState(true);

    useEffect(() => {
        setIsLoginPage(pathname === "/login");
    }, [pathname]);

    if (isLoginPage) return null;

    return (
        <nav className="bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-lg fixed top-0 left-0 w-full z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <img
                        src="/images/unifei.jpg"
                        alt="Logo da Universidade Federal de Itajubá"
                        className="h-10 w-10"
                    />
                    <h1 className="text-2xl font-bold tracking-tight">Lab Management System</h1>
                </div>
                <div className="flex space-x-16">
                    {/* Usuários */}
                    <div className="relative group">
                        <button className="px-4 py-2 rounded-xl hover:bg-blue-800 transition duration-300 ease-in-out font-medium">
                            Usuários
                        </button>
                        <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transform -translate-y-3 transition-all duration-300 ease-in-out z-10">
                            <Link href="/labs/users/visitors" className="block px-4 py-2 hover:bg-blue-100 rounded-t-xl transition duration-200">Visitantes</Link>
                            <Link href="/labs/users/admins" className="block px-4 py-2 hover:bg-blue-100 rounded-b-xl transition duration-200">Admin</Link>
                        </div>
                    </div>

                    {/* Laboratórios */}
                    <div className="relative group">
                        <button className="px-4 py-2 rounded-xl hover:bg-blue-800 transition duration-300 ease-in-out font-medium">
                            Laboratórios
                        </button>
                        <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transform -translate-y-3 transition-all duration-300 ease-in-out z-20">
                            <Link href="/labs/laboratories" className="block px-4 py-2 hover:bg-blue-100 rounded-t-xl transition duration-200">Laboratórios</Link>
                            <div className="relative group/sub">
                                <button className="block px-4 py-2 hover:bg-blue-100 w-full text-left transition duration-200">
                                    Hardware
                                </button>
                                <div className="absolute right-40 top-0 w-40 bg-white text-gray-800 rounded-xl shadow-2xl opacity-0 group-hover/sub:opacity-100 group-hover/sub:translate-x-0 transform translate-x-3 transition-all duration-300 ease-in-out z-20">
                                    <Link href="/labs/hardware/micro" className="block px-4 py-2 hover:bg-blue-100 rounded-t-xl transition duration-200">Micro</Link>
                                    <Link href="/labs/hardware/macro" className="block px-4 py-2 hover:bg-blue-100 rounded-b-xl transition duration-200">Macro</Link>
                                </div>
                            </div>
                            <Link href="/labs/software" className="block px-4 py-2 hover:bg-blue-100 rounded-b-xl transition duration-200">Software</Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}