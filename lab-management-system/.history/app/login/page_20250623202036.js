// app/login/page.js
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState(""); // Pode ser mudado para username, se o login for por username
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        // Esta função de login no login/page.js não tem a lógica de autenticação real.
        // A autenticação real está no Navbar, que usa o AuthContext.
        // Se você quiser que esta página de login funcione, você precisará:
        // 1. Importar useAuth aqui.
        // 2. Usar a função login(username, password, adminUsers) do AuthContext.
        // 3. Obter adminUsers através de useAdminUsers.
        // Por enquanto, apenas redireciona para a home.
        router.push("/");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96 transform transition-all hover:scale-105">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Gestão de Laboratórios UNIFEI</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your password"
                    />
                </div>
                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    Login
                </button>
            </div>
        </div>
    );
}