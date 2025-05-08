"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMacroHardwares, useLaboratories, useAdminUsers, useVisitorUsers } from "../../../../../lib/storage";

export default function CreateMacroHardware() {
    const router = useRouter();
    const [macroHardwares, setMacroHardwares] = useMacroHardwares();
    const [laboratories] = useLaboratories();
    const [adminUsers, , adminLoading] = useAdminUsers();
    const [visitorUsers, , visitorLoading] = useVisitorUsers();
    const [formData, setFormData] = useState({
        name: "",
        laboratoryId: "",
        userId: "",
        status: "ativo",
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newHardware = {
            id: macroHardwares.length + 1,
            name: formData.name,
            laboratoryId: parseInt(formData.laboratoryId),
            userId: formData.userId, // Armazena o userId com o prefixo (ex.: "admin-1" ou "visitor-1")
            status: formData.status,
        };
        await setMacroHardwares([...macroHardwares, newHardware]);
        router.push("/labs/hardware/macro");
    };

    // Combinar usuários administradores e visitantes com IDs únicos
    const allUsers = [
        ...adminUsers.map((u) => ({ id: `admin-${u.id}`, name: u.name, type: "admin" })),
        ...visitorUsers.map((u) => ({ id: `visitor-${u.id}`, name: u.name, type: "visitor" })),
    ];

    if (adminLoading || visitorLoading) {
        return <div>Carregando usuários...</div>;
    }

    return (
        <div className="p-6 pt-28">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">Criar Novo Hardware Macro</h1>
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
                        placeholder="Digite o nome do hardware"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="laboratoryId">
                        Laboratório
                    </label>
                    <select
                        id="laboratoryId"
                        value={formData.laboratoryId}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        required
                    >
                        <option value="">Selecione um laboratório</option>
                        {laboratories.map((lab) => (
                            <option key={lab.id} value={lab.id}>
                                {lab.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userId">
                        Usuário
                    </label>
                    <select
                        id="userId"
                        value={formData.userId}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        required
                    >
                        <option value="">Selecione um usuário</option>
                        {allUsers.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name} ({user.type})
                            </option>
                        ))}
                    </select>
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