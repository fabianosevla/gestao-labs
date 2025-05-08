"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLaboratories, deleteLaboratory } from "../../../lib/storage";

export default function Laboratories() {
    const router = useRouter();
    const [laboratories, setLaboratories, loading, refreshLaboratories] = useLaboratories();
    const [searchName, setSearchName] = useState("");

    const handleCreate = () => {
        router.push("/labs/laboratories/create");
    };

    const handleEdit = (id) => {
        router.push(`/labs/laboratories/edit/${id}`);
    };

    const handleDelete = async (id) => {
        await deleteLaboratory(id);
        await refreshLaboratories();
    };

    const filteredLaboratories = laboratories.filter((lab) =>
        lab.name.toLowerCase().includes(searchName.toLowerCase())
    );

    if (loading) {
        return <div>Carregando laboratórios...</div>;
    }

    return (
        <div className="p-6 pt-28">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">Laboratórios</h1>
            <p className="text-gray-700 mb-6">Gerencie os laboratórios.</p>

            <div className="mb-6">
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
                            <th className="border p-3 text-gray-900 font-semibold text-left">Responsável</th>
                            <th className="border p-3 text-gray-900 font-semibold text-left">Editar</th>
                            <th className="border p-3 text-gray-900 font-semibold text-left">Excluir</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLaboratories.map((lab) => (
                            <tr key={lab.id.toString()} className="hover:bg-gray-50">
                                <td className="border p-3 text-gray-700">{lab.id}</td>
                                <td className="border p-3 text-gray-700">{lab.name}</td>
                                <td className="border p-3 text-gray-700">{user}</td>
                                <td className="border p-3 text-gray-700">
                                    <button
                                        onClick={() => handleEdit(lab.id)}
                                        className="text-blue-600 hover:text-blue-800"
                                        title="Editar"
                                    >
                                        ✏️
                                    </button>
                                </td>
                                <td className="border p-3 text-gray-700">
                                    <button
                                        onClick={() => handleDelete(lab.id)}
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