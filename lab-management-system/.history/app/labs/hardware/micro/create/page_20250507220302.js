"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMicroHardwares, useLaboratories, useAdminUsers, useVisitorUsers, addMicroHardware } from "../../../../lib/storage";

export default function CreateMicroHardware() {
    const router = useRouter();
    const [microHardwares, setMicroHardwares, loading, refreshMicroHardwares] = useMicroHardwares();
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
        console.log("Salvando novo hardware micro:", formData);

        const newHardware = {
            name: formData.name,
            laboratoryId: parseInt(formData.laboratoryId),
            userId: formData.userId ? parseInt(formData.userId) : null, // Converte para inteiro ou null para "Ninguém"
            status: formData.status,
        };

        await addMicroHardware(newHardware);
        await refreshMicroHardwares();
        router.push("/labs/hardware/micro");
    };

    if (loading || adminLoading || visitorLoading) {
        return <div>Carregando dados...</div>;
    }

    const allUsers = [
        { id: "", name: "Ninguém" }, // Opção para "Ninguém"
        ...adminUsers.map((u) => ({ id: u.id, name: u.name })),
        ...visitorUsers.map((u) => ({ id: u.id, name: u.name })),
    ];

    return (
        <div className="p-6 pt-28">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">Criar Novo Hardware Micro</h1>
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
                        autoComplete="off"
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
                        Usuário Utilizador
                    </label>
                    <select
                        id="userId"
                        value={formData.userId}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    >
                        {allUsers.map((user) => (
                            <option key={user.id || "none"} value={user.id}>
                                {user.name}
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