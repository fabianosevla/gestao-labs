"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAdminUsers, updateAdminUser } from "../../../../../lib/storage";

export default function EditAdminUser() {
    const router = useRouter();
    const { id } = useParams();
    const [adminUsers, setAdminUsers, loading] = useAdminUsers();
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        if (loading) {
            console.log("Aguardando carregamento dos usuários administradores...");
            return;
        }

        console.log("ID recebido:", id);
        console.log("Usuários administradores disponíveis:", adminUsers);

        if (!id || isNaN(parseInt(id))) {
            console.log("ID inválido, redirecionando...");
            router.push("/labs/users/admin");
            return;
        }

        const user = adminUsers.find((u) => u.id === parseInt(id));
        console.log("Usuário encontrado:", user);

        if (user) {
            setFormData({ ...user });
        } else {
            console.log("Usuário não encontrado, redirecionando...");
            router.push("/labs/users/admin");
        }
    }, [id, adminUsers, loading, router]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Atualizando usuário:", formData);

        await updateAdminUser(parseInt(id), formData);

        // Atualizar o estado local
        const updatedUsers = adminUsers.map((u) =>
            u.id === parseInt(id) ? { ...formData, id: parseInt(id) } : u
        );
        setAdminUsers(updatedUsers);
        router.push("/labs/users/admin");
    };

    if (loading) {
        return <div>Carregando usuários administradores...</div>;
    }

    if (!formData) {
        return <div>Usuário não encontrado.</div>;
    }

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