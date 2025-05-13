"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMicroHardwares, useLaboratories, useAdminUsers, useVisitorUsers, deleteMicroHardware } from "../../../../lib/storage";
import { useAuth } from "../../../../lib/authContext";

export default function MicroHardwares() {
    const router = useRouter();
    const { isAuthenticated } = useAuth();
    const [microHardwares, setMicroHardwares, loading, refreshMicroHardwares] = useMicroHardwares();
    const [laboratories] = useLaboratories();
    const [adminUsers, , adminLoading] = useAdminUsers();
    const [visitorUsers, , visitorLoading] = useVisitorUsers();
    const [searchName, setSearchName] = useState("");
    const [searchStatus, setSearchStatus] = useState("");

    const handleCreate = () => {
        router.push("/labs/hardware/micro/create");
    };

    const handleEdit = (id) => {
        router.push(`/labs/hardware/micro/edit/${id}`);
    };

    const handleDelete = async (id) => {
        await deleteMicroHardware(id);
        await refreshMicroHardwares();
    };

    const filteredMicroHardwares = microHardwares.filter((hw) => {
        const matchesName = hw.name.toLowerCase().includes(searchName.toLowerCase());
        const matchesStatus = searchStatus ? hw.status.toLowerCase() === searchStatus.toLowerCase() : true;
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
        return <div>Carregando hardwares micro...</div>;
    }

    return (
        <div className="p-6 pt-28">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">Hardware Micro</h1>
            <p className="text-gray-700 mb-6">Gerencie os hardwares micro do laboratório.</p>

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
                        {filteredMicroHardwares.map((hw) => (
                            <tr key={hw.id.toString()} className="hover:bg-gray-50">
                                <td className="border p-3 text-gray-700">{hw.id}</td>
                                <td className="border p-3 text-gray-700">{hw.name}</td>
                                <td className="border p-3 text-gray-700">{getLaboratoryName(hw.laboratoryId)}</td>
                                <td className="border p-3 text-gray-700">{getUserName(hw.userId)}</td>
                                <td className="border p-3 text-gray-700">{hw.status}</td>
                                {isAuthenticated && (
                                    <>
                                        <td className="border p-3 text-gray-700">
                                            <button
                                                onClick={() => handleEdit(hw.id)}
                                                className="text-blue-600 hover:text-blue-800"
                                                title="Editar"
                                            >
                                                ✏️
                                            </button>
                                        </td>
                                        <td className="border p-3 text-gray-700">
                                            <button
                                                onClick={() => handleDelete(hw.id)}
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