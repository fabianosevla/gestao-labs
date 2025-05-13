"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "../lib/authContext";
import { useAdminUsers } from "../lib/storage";

export default function Navbar() {
    const pathname = usePathname();
    const [isLoginPage, setIsLoginPage] = useState(true);
    const { isAuthenticated, login, logout, userRole } = useAuth();
    const [loginData, setLoginData] = useState({ username: "", password: "" });
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [adminUsers, , loading] = useAdminUsers();

    useEffect(() => {
        setIsLoginPage(pathname === "/login");
    }, [pathname]);

    const openLoginModal = () => setIsLoginModalOpen(true);
    const closeLoginModal = () => setIsLoginModalOpen(false);

    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        if (!loading && adminUsers) {
            login(loginData.username, loginData.password, adminUsers);
            closeLoginModal();
        }
    };

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
                    <Link href="/" className="text-2xl font-bold tracking-tight text-white hover:text-gray-200 transition">
                        Laboratórios UNIFEI
                    </Link>
                </div>
                <div className="flex items-center space-x-16">
                    {isAuthenticated && (
                        <>
                            {/* Usuários */}
                            <div className="relative group">
                                <button className="px-4 py-2 rounded-xl hover:bg-blue-800 transition duration-300 ease-in-out font-medium">
                                    Usuários
                                </button>
                                <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transform -translate-y-3 transition-all duration-300 ease-in-out z-10">
                                    <Link href="/labs/users/visitor" className="block px-4 py-2 hover:bg-blue-100 rounded-t-xl transition duration-200">Visitantes</Link>
                                    <Link href="/labs/users/admin" className="block px-4 py-2 hover:bg-blue-100 rounded-b-xl transition duration-200">Admin</Link>
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
                        </>
                    )}

                    {/* Botão de Login ou Logout */}
                    {!isAuthenticated ? (
                        <button
                            onClick={openLoginModal}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                            Login
                        </button>
                    ) : (
                        <button
                            onClick={logout}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
                        >
                            Logout
                        </button>
                    )}
                    {isLoginModalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Login</h2>
                                <form onSubmit={handleLoginSubmit}>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                            Usuário
                                        </label>
                                        <input
                                            type="text"
                                            id="username"
                                            name="username"
                                            value={loginData.username}
                                            onChange={handleLoginChange}
                                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                                            placeholder="Digite o usuário"
                                            required
                                            autoComplete="username"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                            Senha
                                        </label>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            value={loginData.password}
                                            onChange={handleLoginChange}
                                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                                            placeholder="Digite a senha"
                                            required
                                            autoComplete="current-password"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                                    >
                                        Entrar
                                    </button>
                                </form>
                                <button
                                    onClick={closeLoginModal}
                                    className="mt-4 w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300"
                                >
                                    Fechar
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}