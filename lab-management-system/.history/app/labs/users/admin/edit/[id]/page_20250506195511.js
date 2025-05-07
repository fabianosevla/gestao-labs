"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAdminUsers } from "../../../../../../lib/storage";

export default function EditAdminUser() {
    const router = useRouter();
    const { id } = useParams();
    const [adminUsers, setAdminUsers] = useAdminUsers();
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        const user = adminUsers.find((u) => u.id === parseInt(id));
        if (user) {
            setFormData({ ...user });
        } else {
            router.push("/labs/users/admin");
        }
    }, [id, adminUsers, router]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedAdminUsers = adminUsers.map((u) =>
            u.id === parseInt(id) ? { ...formData } : u
        );
        await setAdminUsers(updatedAdminUsers);
        router.push("/labs/users/admin");
    };

    if (!formData) return <div>Carregando...</div>;

    return (
        <div className="p-6 pt-28">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">Editar Usuário Administrador</h1>
            <form className="max-w-lg" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Nome
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        placeholder="Digite o nome"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        placeholder="Digite o email"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Senha
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        placeholder="Digite a senha"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="registerDate">
                        Data de Registro
                    </label>
                    <input
                        type="date"
                        id="registerDate"
                        value={formData.registerDate}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                        Status
                    </label>
                    <select
                        id="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        required
                    >
                        <option value="ativo">Ativo</option>
                        <option value="inativo">Inativo</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    Salvar
                </button>
            </form>
        </div>
    );
}