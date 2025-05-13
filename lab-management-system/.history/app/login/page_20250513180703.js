"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../lib/authContext";

export default function Login() {
    const router = useRouter();
    const { login } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(true); // Assume que o modal abre automaticamente
    const [credentials, setCredentials] = useState({ username: "", password: "" });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setCredentials((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(credentials.username, credentials.password);
            router.push("/labs/laboratories");
        } catch (error) {
            console.error("Erro no login:", error);
            alert("Credenciais inválidas");
        }
    };

    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="p-6">
            {isModalOpen && (
                <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Login</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                    Usuário
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    value={credentials.username}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                                    placeholder="Digite o usuário"
                                    required
                                    autoComplete="off"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    Senha
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={credentials.password}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                                    placeholder="Digite a senha"
                                    required
                                    autoComplete="off"
                                />
                            </div>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                            >
                                Entrar
                            </button>
                        </form>
                        <button
                            onClick={closeModal}
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