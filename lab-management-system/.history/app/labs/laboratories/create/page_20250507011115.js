"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLaboratories, useAdminUsers, useVisitorUsers } from "../../../../lib/storage";
import Dexie from "dexie";

export default function CreateLaboratory() {
    const router = useRouter();
    const [laboratories, setLaboratories, loading] = useLaboratories();
    const [adminUsers] = useAdminUsers();
    const [visitorUsers] = useVisitorUsers();
    const [formData, setFormData] = useState({
        name: "",
        location: "",
        responsibleId: "",
        capacity: "",
        status: "ativo",
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Salvando novo laboratório:", formData);

        const db = new Dexie("LabManagementDB");
        await db.version(1).stores({
            laboratories: "++id, name, location, responsibleId, capacity, status",
        }).laboratories.add({
            name: formData.name,
            location: formData.location,
            responsibleId: parseInt(formData.responsibleId) || null,
            capacity: parseInt(formData.capacity) || 0,
            status: formData.status,
        });

        // Recarregar os laboratórios após adição
        const updatedLabs = await db.laboratories.toArray();
        setLaboratories(updatedLabs);
        router.push("/labs/laboratories");
    };

    // Combinar usuários administradores e visitantes
    const allUsers = [
        ...adminUsers.map((u) => ({ id: u.id, name: u.name })),
        ...visitorUsers.map((u) => ({ id: u.id, name: u.name })),
    ];

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="p-6 pt-28">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">Criar Novo Laboratório</h1>
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
                        placeholder="Digite o nome do laboratório"
                        required
                        autocomplete="name"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                        Localização
                    </label>
                    <input
                        type="text"
                        id="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        placeholder="Ex.: Prédio B, Sala 203"
                        required
                        autocomplete="address-line1"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="responsibleId">
                        Responsável
                    </label>
                    <select
                        id="responsibleId"
                        value={formData.responsibleId}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        required
                        autocomplete="name"
                    >
                        <option value="">Selecione um responsável</option>
                        {allUsers.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="capacity">
                        Capacidade
                    </label>
                    <input
                        type="number"
                        id="capacity"
                        value={formData.capacity}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        placeholder="Digite a capacidade (número de pessoas)"
                        required
                        autocomplete="off"
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
                        autocomplete="off"
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