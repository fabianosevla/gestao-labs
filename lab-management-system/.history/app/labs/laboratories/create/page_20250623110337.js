// app/labs/laboratories/create/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLaboratories, useAdminUsers, addLaboratory } from "../../../../lib/storage";

export default function CreateLaboratory() {
    const router = useRouter();
    const [laboratories, setLaboratories, loading, refreshLaboratories] = useLaboratories();
    const [adminUsers, , adminLoading] = useAdminUsers();
    const [formData, setFormData] = useState({
        name: "",
        location: "",
        acronym: "", // NOVO CAMPO: Sigla
        capacity: "", // NOVO CAMPO: Capacidade
        generalCoordinatorId: "",
        labCoordinatorId: "",
        technicianId: "",
    });
    const [generalCoordinatorInfo, setGeneralCoordinatorInfo] = useState({ phone: "", email: "" });
    const [labCoordinatorInfo, setLabCoordinatorInfo] = useState({ phone: "", email: "" });
    const [technicianInfo, setTechnicianInfo] = useState({ phone: "", email: "" });

    const handleChange = (e) => {
        const { id, value } = e.target;
        // Tratamento especial para capacidade para garantir que é um número
        if (id === "capacity") {
            setFormData((prev) => ({ ...prev, [id]: value === "" ? "" : parseInt(value) || "" }));
        } else {
            setFormData((prev) => ({ ...prev, [id]: value }));
        }

        // Atualizar informações de telefone e email automaticamente
        const selectedAdmin = adminUsers.find((u) => u.id === parseInt(value));
        if (id === "generalCoordinatorId") {
            setGeneralCoordinatorInfo({
                phone: selectedAdmin ? selectedAdmin.phone || "" : "",
                email: selectedAdmin ? selectedAdmin.email || "" : "",
            });
        } else if (id === "labCoordinatorId") {
            setLabCoordinatorInfo({
                phone: selectedAdmin ? selectedAdmin.phone || "" : "",
                email: selectedAdmin ? selectedAdmin.email || "" : "",
            });
        } else if (id === "technicianId") {
            setTechnicianInfo({
                phone: selectedAdmin ? selectedAdmin.phone || "" : "",
                email: selectedAdmin ? selectedAdmin.email || "" : "",
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Salvando novo laboratório:", formData);

        const newLaboratory = {
            name: formData.name,
            location: formData.location,
            acronym: formData.acronym, // Inclui o novo campo
            capacity: formData.capacity === "" ? null : parseInt(formData.capacity), // Inclui o novo campo, garante número ou null
            generalCoordinatorId: formData.generalCoordinatorId ? parseInt(formData.generalCoordinatorId) : null,
            labCoordinatorId: formData.labCoordinatorId ? parseInt(formData.labCoordinatorId) : null,
            technicianId: formData.technicianId ? parseInt(formData.technicianId) : null,
        };

        await addLaboratory(newLaboratory);
        await refreshLaboratories();
        router.push("/labs/laboratories");
    };

    if (loading || adminLoading) {
        return <div className="p-6 pt-28">Carregando dados...</div>;
    }

    const adminOptions = [
        { id: "", name: "Ninguém" },
        ...adminUsers.map((u) => ({ id: u.id, name: u.name })),
    ];

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
                        autoComplete="off"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                        Prédio/Localização
                    </label>
                    <input
                        type="text"
                        id="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        placeholder="Digite o prédio ou localização"
                        autoComplete="off"
                    />
                </div>
                {/* NOVOS CAMPOS AQUI */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="acronym">
                        Sigla
                    </label>
                    <input
                        type="text"
                        id="acronym"
                        value={formData.acronym}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        placeholder="Digite a sigla do laboratório (Ex: LAB01)"
                        autoComplete="off"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="capacity">
                        Capacidade (Nº de Pessoas)
                    </label>
                    <input
                        type="number" // Tipo number para capacidade
                        id="capacity"
                        value={formData.capacity}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        placeholder="Digite a capacidade do laboratório"
                        min="0"
                        autoComplete="off"
                    />
                </div>
                {/* FIM DOS NOVOS CAMPOS */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="generalCoordinatorId">
                        Coordenador Geral
                    </label>
                    <select
                        id="generalCoordinatorId"
                        value={formData.generalCoordinatorId}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    >
                        {adminOptions.map((admin) => (
                            <option key={admin.id || "none"} value={admin.id}>
                                {admin.name}
                            </option>
                        ))}
                    </select>
                    <div className="mt-2 text-gray-700">
                        <p>Fone: {generalCoordinatorInfo.phone || "N/A"}</p>
                        <p>Email: {generalCoordinatorInfo.email || "N/A"}</p>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="labCoordinatorId">
                        Coordenador do Lab
                    </label>
                    <select
                        id="labCoordinatorId"
                        value={formData.labCoordinatorId}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    >
                        {adminOptions.map((admin) => (
                            <option key={admin.id || "none"} value={admin.id}>
                                {admin.name}
                            </option>
                        ))}
                    </select>
                    <div className="mt-2 text-gray-700">
                        <p>Fone: {labCoordinatorInfo.phone || "N/A"}</p>
                        <p>Email: {labCoordinatorInfo.email || "N/A"}</p>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="technicianId">
                        Técnico
                    </label>
                    <select
                        id="technicianId"
                        value={formData.technicianId}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    >
                        {adminOptions.map((admin) => (
                            <option key={admin.id || "none"} value={admin.id}>
                                {admin.name}
                            </option>
                        ))}
                    </select>
                    <div className="mt-2 text-gray-700">
                        <p>Fone: {technicianInfo.phone || "N/A"}</p>
                        <p>Email: {technicianInfo.email || "N/A"}</p>
                    </div>
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