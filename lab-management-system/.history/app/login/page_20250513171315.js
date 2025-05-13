"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminUsers } from "@/lib/storage";
import { useAuth } from "@/lib/authContext";

export default function Home() {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [loginData, setLoginData] = useState({ username: "", password: "" });
    const { isAuthenticated, login } = useAuth();
    const [adminUsers, , loading] = useAdminUsers();

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const openLoginModal = () => setIsLoginModalOpen(true);
    const closeLoginModal = () => setIsLoginModalOpen(false);

    const handleNavigation = (path) => {
        router.push(path);
        closeModal();
    };

    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        if (!loading && adminUsers) {
            const user = adminUsers.find(
                (u) => u.username === loginData.username && u.password === loginData.password && u.status === "ativo"
            );
            if (user) {
                login();
                closeLoginModal();
            } else {
                alert("Usuário ou senha inválidos, ou status inativo.");
            }
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Bem-vindo ao Sistema</h1>
            <p className="text-gray-700 text-lg mb-8">
                Este é o sistema de gerenciamento de laboratórios da Universidade Federal de Itajubá.
            </p>
            <div className="mt-8 flex space-x-4">
                <button
                    onClick={openModal}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    Consulta de Componentes
                </button>
                {!isAuthenticated && (
                    <button
                        onClick={openLoginModal}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Login
                    </button>
                )}
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Consulta de Componentes</h2>
                        <div className="flex flex-col space-y-3">
                            <button
                                onClick={() => handleNavigation("/labs/hardware/micro")}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                            >
                                Listar Hardwares - Micro
                            </button>
                            <button
                                onClick={() => handleNavigation("/labs/hardware/macro")}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                            >
                                Listar Hardwares - Macro
                            </button>
                            <button
                                onClick={() => handleNavigation("/labs/software")}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                            >
                                Listar Softwares
                            </button>
                        </div>
                        <button
                            onClick={closeModal}
                            className="mt-4 w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300"
                        >
                            Fechar
                        </button>
                    </div>
                </div>
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
    );
}