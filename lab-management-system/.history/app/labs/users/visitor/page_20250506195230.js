"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useVisitorUsers } from "../../../../lib/storage";

export default function VisitorUsers() {
    const router = useRouter();
    const [visitorUsers, setVisitorUsers] = useVisitorUsers();
    const [searchName, setSearchName] = useState("");

    const handleCreate = () => {
        router.push("/labs/users/visitor/create");
    };

    const handleEdit = (id) => {
        router.push(`/labs/users/visitor/edit/${id}`);
    };

    const handleDelete = (id) => {
        const updatedVisitorUsers = visitorUsers.filter((user) => user.id !== id);
        setVisitorUsers(updatedVisitorUsers);
    };

    const filteredVisitors = visitorUsers.filter((user) =>
        user.name.toLowerCase().includes(searchName.toLowerCase())
    );

    return (
        <div className="p-6 pt-28">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">Visitantes</h1>
            <p className="text-gray-700 mb-6">Aqui você pode gerenciar os visitantes do sistema.</p>

            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="searchName">
                    Pesquisar por Nome
                </label>
                <input
                    type="text"
                    id="searchName"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    className="w-full max-w-md px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="Digite o nome para buscar"
                />
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
                            <th className="border p-3 text-gray-900 font-semibold text-left">Curso</th>
                            <th className="border p-3 text-gray-900 font-semibold text-left">CPF</th>
                            <th className="border p-3 text-gray-900 font-semibold text-left">Número de Matrícula</th>
                            <th className="border p-3 text-gray-900 font-semibold text-left">Tipo</th>
                            <th className="border p-3 text-gray-900 font-semibold text-left">Editar</th>
                            <th className="border p-3 text-gray-900 font-semibold text-left">Excluir</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredVisitors.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="border p-3 text-gray-700">{user.id}</td>
                                <td className="border p-3 text-gray-700">{user.name}</td>
                                <td className="border p-3 text-gray-700">{user.course || "N/A"}</td>
                                <td className="border p-3 text-gray-700">{user.cpf || "N/A"}</td>
                                <td className="border p-3 text-gray-700">{user.registrationNumber || "N/A"}</td>
                                <td className="border p-3 text-gray-700">{user.type || "N/A"}</td>
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