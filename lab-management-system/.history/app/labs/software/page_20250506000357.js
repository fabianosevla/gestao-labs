"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSoftwares } from "../../../lib/storage";

export default function Software() {
    const router = useRouter();
    const [softwares, setSoftwares] = useSoftwares();
    const [searchName, setSearchName] = useState("");
    const [searchStatus, setSearchStatus] = useState("");

    const handleCreate = () => {
        router.push("/labs/software/create");
    };

    const handleEdit = (id) => {
        router.push(`/labs/software/edit/${id}`);
    };

    const handleDelete = (id) => {
        const updatedSoftwares = softwares.filter((s) => s.id !== id);
        setSoftwares(updatedSoftwares);
    };

    const filteredSoftwares = softwares.filter((software) => {
        const matchesName = software.name
            .toLowerCase()
            .includes(searchName.toLowerCase());
        const matchesStatus = searchStatus
            ? software.status.toLowerCase() === searchStatus.toLowerCase()
            : true;
        return matchesName && matchesStatus;
    });

    return (
        <div className="p-6 pt-28">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">Laboratório Software</h1>
            <p className="text-gray-700 mb-6">Aqui você pode gerenciar os softwares do laboratório.</p>

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
                            <th className="border p-3 text-gray-900 font-semibold text-left">Versão</th>
                            <th className="border p-3 text-gray-900 font-semibold text-left">Fabricante</th>
                            <th className="border p-3 text-gray-900 font-semibold text-left">Licença</th>
                            <th className="border p-3 text-gray-900 font-semibold text-left">Data de Aquisição</th>
                            <th className="border p-3 text-gray-900 font-semibold text-left">Status</th>
                            <th className="border p-3 text-gray-900 font-semibold text-left">Editar</th>
                            <th className="border p-3 text-gray-900 font-semibold text-left">Excluir</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSoftwares.map((software) => (
                            <tr key={software.id} className="hover:bg-gray-50">
                                <td className="border p-3 text-gray-700">{software.id}</td>
                                <td className="border p-3 text-gray-700">{software.name}</td>
                                <td className="border p-3 text-gray-700">{software.version}</td>
                                <td className="border p-3 text-gray-700">{software.manufacturer}</td>
                                <td className="border p-3 text-gray-700">{software.license}</td>
                                <td className="border p-3 text-gray-700">{software.acquisitionDate}</td>
                                <td className="border p-3 text-gray-700">{software.status}</td>
                                <td className="border p-3 text-gray-700">
                                    <button
                                        onClick={() => handleEdit(software.id)}
                                        className="text-blue-600 hover:text-blue-800"
                                        title="Editar"
                                    >
                                        ✏️
                                    </button>
                                </td>
                                <td className="border p-3 text-gray-700">
                                    <button
                                        onClick={() => handleDelete(software.id)}
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