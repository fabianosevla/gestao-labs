// app/labs/users/visitor/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useVisitorUsers, deleteVisitorUser } from "../../../../lib/storage";

export default function VisitorUsers() {
    const router = useRouter();
    const [visitorUsers, loading, refreshVisitorUsers] = useVisitorUsers(); // Removido setVisitorUsers
    const [searchName, setSearchName] = useState("");
    const [searchStatus, setSearchStatus] = useState("");

    const handleCreate = () => {
        router.push("/labs/users/visitor/create");
    };

    const handleEdit = (id) => {
        router.push(`/labs/users/visitor/edit/${id}`);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Tem certeza que deseja excluir este usuário visitante?")) {
            await deleteVisitorUser(id);
            await refreshVisitorUsers();
            alert("Usuário visitante excluído com sucesso!");
        }
    };

    const filteredVisitorUsers = visitorUsers.filter((user) => {
        const matchesName = user.name
            .toLowerCase()
            .includes(searchName.toLowerCase());
        const matchesStatus = searchStatus
            ? user.status.toLowerCase() === searchStatus.toLowerCase()
            : true;
        return matchesName && matchesStatus;
    });

    if (loading) {
        return <div>Carregando usuários visitantes...</div>;
    }

    return (
        <div className="p-6 pt-28">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">Usuários Visitantes</h1>
            <p className="text-gray-700 mb-6">Gerencie os usuários visitantes do laboratório.</p>

            <div className="mb-6 flex gap-4">
                <div className="flex-1">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="searchName">
                        Pesquisar por Nome
                    </label>
                    <input
                        type="text"
                        id="searchName"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        placeholder="Digite o nome para buscar"
                        autoComplete="off"
                    />
                </div>
                <div className="flex-1">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="searchStatus">
                        Pesquisar por Status
                    </label>
                    <select
                        id="searchStatus"
                        value={searchStatus}
                        onChange={(e) => setSearchStatus(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        autoComplete="off"
                    >
                        <option value="">Todos</option>
                        <option value="ativo">Ativo</option>
                        <option value="inativo">Inativo</option>
                    </select>
                </div>
            </div>

            <button
                onClick={handleCreate}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 text-left mb-6"
            >
                Criar
            </button>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-3 text-gray-900 font-semibold text-left">ID</th>
                            <th className="border p-3 text-gray-900 font-semibold text-left">Nome</th>
                            <th className="border p-3 text-gray-900 font-semibold text-left">Email</th>
                            <th className="border p-3 text-gray-900 font-semibold text-left">Instituição</th>
                            <th className="border p-3 text-gray-900 font-semibold text-left">Data da Visita</th>
                            <th className="border p-3 text-gray-900 font-semibold text-left">Status</th>
                            <th className="border p-3 text-gray-900 font-semibold text-left">Editar</th>
                            <th className="border p-3 text-gray-900 font-semibold text-left">Excluir</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredVisitorUsers.map((user) => (
                            <tr key={user.id.toString()} className="hover:bg-gray-50">
                                <td className="border p-3 text-gray-700">{user.id}</td>
                                <td className="border p-3 text-gray-700">{user.name}</td>
                                <td className="border p-3 text-gray-700">{user.email}</td>
                                <td className="border p-3 text-gray-700">{user.institution}</td>
                                <td className="border p-3 text-gray-700">{user.visitDate}</td>
                                <td className="border p-3 text-gray-700">{user.status}</td>
                                <td className="border p-3 text-gray-700">
                                    <button
                                        onClick={() => handleEdit(user.id)}
                                        className="text-blue-600 hover:text-blue-800"
                                        title="Editar"
                                    >
                                        ✏️
                                    </button>
                                </td>
                                <td className="border p-3 text-gray-700">
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="text-red-600 hover:text-red-800"
                                        title="Excluir"
                                    >
                                        ❌
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}