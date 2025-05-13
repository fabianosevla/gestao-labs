"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSoftwares, useLaboratories, useAdminUsers, useVisitorUsers, deleteSoftware } from "../../../lib/storage";
import { useAuth } from "../../../lib/authContext";

export default function Softwares() {
    const router = useRouter();
    const { isAuthenticated } = useAuth();
    const [softwares, setSoftwares, loading, refreshSoftwares] = useSoftwares();
    const [laboratories] = useLaboratories();
    const [adminUsers, , adminLoading] = useAdminUsers();
    const [visitorUsers, , visitorLoading] = useVisitorUsers();
    const [searchName, setSearchName] = useState("");
    const [searchStatus, setSearchStatus] = useState("");

    const handleCreate = () => {
        router.push("/labs/software/create");
    };

    const handleEdit = (id) => {
        router.push(`/labs/software/edit/${id}`);
    };

    const handleDelete = async (id) => {
        await deleteSoftware(id);
        await refreshSoftwares();
    };

    const filteredSoftwares = softwares.filter((sw) => {
        const matchesName = sw.name.toLowerCase().includes(searchName.toLowerCase());
        const matchesStatus = searchStatus ? sw.status.toLowerCase() === searchStatus.toLowerCase() : true;
        return matchesName && matchesStatus;
    });

    const getLaboratoryName = (labId) => {
        const lab = laboratories.find((l) => l.id === labId);
        return lab ? lab.name : "Nenhum";
    };

    const getUserName = (userId) => {
        if (!userId && userId !== 0) return "Ninguém";
        const user = adminUsers.find((u) => u.id === parseInt(userId)) || visitorUsers.find((u) => u.id === parseInt(userId));
        return user ? user.name : "Desconhecido";
    };

    if (loading || adminLoading || visitorLoading) {
        return <div>Carregando softwares...</div>;
    }

    return (
        <div className="p-6 pt-28">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">Softwares</h1>
            <p className="text-gray-700 mb-6">Gerencie os softwares do laboratório.</p>

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
                            <th className="border p-3 text-gray-900 font-semibold text-left">Laboratório</th>
                            <th className="border p-3 text-gray-900 font-semibold text-left">Usuário Utilizador</th>
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
                        {filteredSoftwares.map((sw) => (
                            <tr key={sw.id.toString()} className="hover:bg-gray-50">
                                <td className="border p-3 text-gray-700">{sw.id}</td>
                                <td className="border p-3 text-gray-700">{sw.name}</td>
                                <td className="border p-3 text-gray-700">{getLaboratoryName(sw.laboratoryId)}</td>
                                <td className="border p-3 text-gray-700">{getUserName(sw.userId)}</td>
                                <td className="border p-3 text-gray-700">{sw.status}</td>
                                {isAuthenticated && (
                                    <>
                                        <td className="border p-3 text-gray-700">
                                            <button
                                                onClick={() => handleEdit(sw.id)}
                                                className="text-blue-600 hover:text-blue-800"
                                                title="Editar"
                                            >
                                                ✏️
                                            </button>
                                        </td>
                                        <td className="border p-3 text-gray-700">
                                            <button
                                                onClick={() => handleDelete(sw.id)}
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