"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useVisitorUsers, updateVisitorUser } from "../../../../../../lib/storage";

export default function EditVisitorUser() {
    const router = useRouter();
    const { id } = useParams();
    const [visitorUsers, setVisitorUsers, loading, refreshVisitorUsers] = useVisitorUsers();
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        if (loading) {
            console.log("Aguardando carregamento dos usuários visitantes...");
            return;
        }

        console.log("ID recebido:", id);
        console.log("Usuários visitantes disponíveis:", visitorUsers);

        if (!id || isNaN(parseInt(id))) {
            console.log("ID inválido, redirecionando...");
            router.push("/labs/users/visitor");
            return;
        }

        const user = visitorUsers.find((u) => u.id === parseInt(id));
        console.log("Usuário encontrado:", user);

        if (user) {
            setFormData({ ...user });
        } else {
            console.log("Usuário não encontrado, redirecionando...");
            router.push("/labs/users/visitor");
        }
    }, [id, visitorUsers, loading, router]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Atualizando usuário visitante:", formData);

        const updatedUser = {
            name: formData.name,
            email: formData.email,
            institution: formData.institution,
            visitDate: formData.visitDate,
            status: formData.status,
        };

        await updateVisitorUser(parseInt(id), updatedUser);
        await refreshVisitorUsers(); // Recarrega os dados do banco
        router.push("/labs/users/visitor");
    };

    if (loading) {
        return <div>Carregando usuários visitantes...</div>;
    }

    if (!formData) {
        return <div>Usuário não encontrado.</div>;
    }

    return (
        <div className="p-6 pt-28">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">Editar Usuário Visitante</h1>
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
                        autoComplete="name"
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
                        autoComplete="email"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="institution">
                        Instituição
                    </label>
                    <input
                        type="text"
                        id="institution"
                        value={formData.institution}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        placeholder="Digite a instituição"
                        required
                        autoComplete="organization"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="visitDate">
                        Data da Visita
                    </label>
                    <input
                        type="date"
                        id="visitDate"
                        value={formData.visitDate}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        required
                        autoComplete="off"
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
                        autoComplete="off"
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