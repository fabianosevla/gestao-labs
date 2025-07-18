// app/labs/users/admin/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminUsers, deleteAdminUser } from "../../../../lib/storage";
import { useAuth } from "../../../../lib/authContext";

export default function AdminUsers() {
    const router = useRouter();
    const { isAuthenticated } = useAuth();
    const [adminUsers, loading, refreshAdminUsers] = useAdminUsers(); // Removido setAdminUsers
    const [searchName, setSearchName] = useState("");
    const [searchStatus, setSearchStatus] = useState("");

    const handleCreate = () => {
        router.push("/labs/users/admin/create");
    };

    const handleEdit = (id) => {
        router.push(`/labs/users/admin/edit/${id}`);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Tem certeza que deseja excluir este usuário administrador?")) {
            await deleteAdminUser(id);
            await refreshAdminUsers();
            alert("Usuário administrador excluído com sucesso!");
        }
    };

    const filteredAdminUsers = adminUsers.filter((user) => {
        const matchesName = user.name
            .toLowerCase()
            .includes(searchName.toLowerCase());
        const matchesStatus = searchStatus
            ? user.status.toLowerCase() === searchStatus.toLowerCase()
            : true;
        return matchesName && matchesStatus;
    });

    if (loading) {
        return <div>Carregando usuários administradores...</div>;
    }

    return (
        <div className="p-6 pt-28">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">Usuários Administradores</h1>
            <p className="text-gray-700 mb-6">Gerencie os usuários administradores do laboratório.</p>

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

            {isAuthenticated && (
                <button
                    onClick={handleCreate}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 text-left mb-6"
                >
                    Criar
                </button>
            )}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-3 text-gray-900 font-semibold text-left">ID</th>
                            <th className="border p-3 text-gray-900 font-semibold text-left">Nome</th>
                            <th className="border p-3 text-gray-900 font-semibold text-left">Email</th>
                            <th className="border p-3 text-gray-900 font-semibold text-left">Usuário</th>
                            <th className="border p-3 text-gray-900 font-semibold text-left">Telefone</th>
                            <th className="border p-3 text-gray-900 font-semibold text-left">Função (Role)</th> {/* Adicionada coluna Role */}
                            <th className="border p-3 text-gray-900 font-semibold text-left">Status</th>
                            {isAuthenticated && (
                                <>
                                    <th className="border p-3 text-gray-900 font-semibold text-left">Editar</th>
                                    <th className="border p-3 text-gray-900 font-semibold text-left">Excluir</th>
                                </>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAdminUsers.map((user) => (
                            <tr key={user.id.toString()} className="hover:bg-gray-50">
                                <td className="border p-3 text-gray-700">{user.id}</td>
                                <td className="border p-3 text-gray-700">{user.name}</td>
                                <td className="border p-3 text-gray-700">{user.email}</td>
                                <td className="border p-3 text-gray-700">{user.username}</td>
                                <td className="border p-3 text-gray-700">{user.phone || "N/A"}</td>
                                <td className="border p-3 text-gray-700">{user.role || "N/A"}</td> {/* Exibir Role */}
                                <td className="border p-3 text-gray-700">{user.status}</td>
                                {isAuthenticated && (
                                    <>
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
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}