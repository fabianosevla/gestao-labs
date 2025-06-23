// app/labs/laboratories/edit/[id]/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useLaboratories, useAdminUsers, updateLaboratory } from "../../../../../lib/storage";

export default function EditLaboratory() {
    const router = useRouter();
    const { id } = useParams();
    const [laboratories, loading, refreshLaboratories] = useLaboratories(); // Removido setLaboratories
    const [adminUsers, adminLoading] = useAdminUsers(); // Removido setAdminUsers
    const [formData, setFormData] = useState(null);
    const [generalCoordinatorInfo, setGeneralCoordinatorInfo] = useState({ phone: "", email: "" });
    const [labCoordinatorInfo, setLabCoordinatorInfo] = useState({ phone: "", email: "" });
    const [technicianInfo, setTechnicianInfo] = useState({ phone: "", email: "" });

    useEffect(() => {
        if (loading || adminLoading) {
            console.log("Aguardando carregamento dos laboratórios...");
            return;
        }

        console.log("ID recebido:", id);
        console.log("Laboratórios disponíveis:", laboratories);

        if (!id || isNaN(parseInt(id))) {
            console.log("ID inválido, redirecionando...");
            router.push("/labs/laboratories");
            return;
        }

        if (laboratories && Array.isArray(laboratories) && laboratories.length > 0) {
            const laboratory = laboratories.find((lab) => lab.id === parseInt(id));
            console.log("Laboratório encontrado:", laboratory);

            if (laboratory) {
                setFormData({
                    ...laboratory,
                    generalCoordinatorId: laboratory.generalCoordinatorId || "",
                    labCoordinatorId: laboratory.labCoordinatorId || "",
                    technicianId: laboratory.technicianId || "",
                    location: laboratory.location || "",
                    acronym: laboratory.acronym || "",
                    capacity: laboratory.capacity || "",
                });

                const generalCoordinator = adminUsers.find((u) => u.id === laboratory.generalCoordinatorId);
                const labCoordinator = adminUsers.find((u) => u.id === laboratory.labCoordinatorId);
                const technician = adminUsers.find((u) => u.id === laboratory.technicianId);

                setGeneralCoordinatorInfo({
                    phone: generalCoordinator ? generalCoordinator.phone || "N/A" : "N/A",
                    email: generalCoordinator ? generalCoordinator.email || "N/A" : "N/A",
                });
                setLabCoordinatorInfo({
                    phone: labCoordinator ? labCoordinator.phone || "N/A" : "N/A",
                    email: labCoordinator ? labCoordinator.email || "N/A" : "N/A",
                });
                setTechnicianInfo({
                    phone: technician ? technician.phone || "N/A" : "N/A",
                    email: technician ? technician.email || "N/A" : "N/A",
                });
            } else {
                console.log("Laboratório não encontrado, redirecionando...");
                router.push("/labs/laboratories");
            }
        }
    }, [id, laboratories, adminUsers, loading, adminLoading, router]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        if (id === "capacity") {
            setFormData((prev) => ({ ...prev, [id]: value === "" ? "" : parseInt(value) || "" }));
        } else {
            setFormData((prev) => ({ ...prev, [id]: value }));
        }

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
        console.log("Atualizando laboratório:", formData);

        const updatedLaboratory = {
            name: formData.name,
            location: formData.location,
            acronym: formData.acronym,
            capacity: formData.capacity === "" ? null : parseInt(formData.capacity),
            generalCoordinatorId: formData.generalCoordinatorId ? parseInt(formData.generalCoordinatorId) : null,
            labCoordinatorId: formData.labCoordinatorId ? parseInt(formData.labCoordinatorId) : null,
            technicianId: formData.technicianId ? parseInt(formData.technicianId) : null,
        };

        await updateLaboratory(parseInt(id), updatedLaboratory);
        await refreshLaboratories();
        router.push("/labs/laboratories");
    };

    if (loading || adminLoading) {
        return <div>Carregando dados...</div>;
    }

    if (!formData) {
        return <div>Laboratório não encontrado.</div>;
    }

    const adminOptions = [
        { id: "", name: "Ninguém" },
        ...adminUsers.map((u) => ({ id: u.id, name: u.name })),
    ];

    return (
        <div className="p-6 pt-28">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">Editar Laboratório</h1>
            <form className="max-w-lg" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Nome
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={formData?.name || ""}
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
                        value={formData?.location || ""}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        placeholder="Digite o prédio ou localização"
                        autoComplete="off"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="acronym">
                        Sigla
                    </label>
                    <input
                        type="text"
                        id="acronym"
                        value={formData?.acronym || ""}
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
                        type="number"
                        id="capacity"
                        value={formData?.capacity || ""}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        placeholder="Digite a capacidade do laboratório"
                        min="0"
                        autoComplete="off"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="generalCoordinatorId">
                        Coordenador Geral
                    </label>
                    <select
                        id="generalCoordinatorId"
                        value={formData?.generalCoordinatorId || ""}
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
                        value={formData?.labCoordinatorId || ""}
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
                        value={formData?.technicianId || ""}
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