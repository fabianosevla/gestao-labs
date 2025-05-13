"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useLaboratories, useAdminUsers, useVisitorUsers, updateLaboratory } from "../../../../../lib/storage";

export default function EditLaboratory() {
    const router = useRouter();
    const { id } = useParams();
    const [laboratories, setLaboratories, loading, refreshLaboratories] = useLaboratories();
    const [adminUsers, , adminLoading] = useAdminUsers();
    const [visitorUsers, , visitorLoading] = useVisitorUsers();
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        if (loading) {
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

        // Verifique se laboratories é um array não vazio antes de prosseguir
        if (laboratories && Array.isArray(laboratories) && laboratories.length > 0) {
            const laboratory = laboratories.find((lab) => lab.id === parseInt(id));
            console.log("Laboratório encontrado:", laboratory);

            if (laboratory) {
                setFormData({ ...laboratory });
            } else {
                console.log("Laboratório não encontrado, redirecionando...");
                router.push("/labs/laboratories");
            }
        }
    }, [id, laboratories, loading, router]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Atualizando laboratório:", formData);

        const updatedLaboratory = {
            name: formData.name,
            userId: formData.userId ? parseInt(formData.userId) : null, // Converte para inteiro ou null para "Ninguém"
        };

        await updateLaboratory(parseInt(id), updatedLaboratory);
        await refreshLaboratories();
        router.push("/labs/laboratories");
    };

    if (loading || adminLoading || visitorLoading) {
        return <div>Carregando dados...</div>;
    }

    if (!formData) {
        return <div>Laboratório não encontrado.</div>;
    }

    const allUsers = [
        { id: "", name: "Ninguém" }, // Opção para "Ninguém"
        ...adminUsers.map((u) => ({ id: u.id, name: u.name })),
        ...visitorUsers.map((u) => ({ id: u.id, name: u.name })),
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
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userId">
                        Usuário Responsável
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