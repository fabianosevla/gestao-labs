// app/labs/software/edit/[id]/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSoftwares, useLaboratories, useAdminUsers, useVisitorUsers, updateSoftware } from "../../../../../lib/storage";

export default function EditSoftware() {
    const router = useRouter();
    const { id } = useParams();
    const [softwares, loading, refreshSoftwares] = useSoftwares(); // Removido setSoftwares
    const [laboratories] = useLaboratories();
    const [adminUsers, adminLoading] = useAdminUsers(); // Removido setAdminUsers
    const [visitorUsers, visitorLoading] = useVisitorUsers(); // Removido setVisitorUsers
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        if (loading) {
            console.log("Aguardando carregamento dos softwares...");
            return;
        }

        console.log("ID recebido:", id);
        console.log("Softwares disponíveis:", softwares);

        if (!id || isNaN(parseInt(id))) {
            console.log("ID inválido, redirecionando...");
            router.push("/labs/software");
            return;
        }

        if (softwares && Array.isArray(softwares) && softwares.length > 0) {
            const software = softwares.find((sw) => sw.id === parseInt(id));
            console.log("Software encontrado:", software);

            if (software) {
                setFormData({ ...software });
            } else {
                console.log("Software não encontrado, redirecionando...");
                router.push("/labs/software");
            }
        }
    }, [id, softwares, loading, router]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Atualizando software:", formData);

        const updatedSoftware = {
            name: formData.name,
            laboratoryId: parseInt(formData.laboratoryId),
            userId: formData.userId || null, // Mantém o formato admin-/visitor-, ou null para "Ninguém"
            status: formData.status,
        };

        await updateSoftware(parseInt(id), updatedSoftware);
        await refreshSoftwares();
        router.push("/labs/software");
    };

    if (loading || adminLoading || visitorLoading) {
        return <div>Carregando dados...</div>;
    }

    if (!formData) {
        return <div>Software não encontrado.</div>;
    }

    const allUsers = [
        { id: "", name: "Ninguém" }, // Opção para "Ninguém"
        ...adminUsers.map((u) => ({ id: `admin-${u.id}`, name: u.name })),
        ...visitorUsers.map((u) => ({ id: `visitor-${u.id}`, name: u.name })),
    ];

    return (
        <div className="p-6 pt-28">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">Editar Software</h1>
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
                        placeholder="Digite o nome do software"
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
                        value={formData?.laboratoryId || ""}
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
                        value={formData?.userId || ""}
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
                        value={formData?.status || "ativo"}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border