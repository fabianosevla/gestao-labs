"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSoftwares, useLaboratories } from "../../../../../lib/storage";

export default function EditSoftware() {
    const router = useRouter();
    const { id } = useParams();
    const [softwares, setSoftwares, loading] = useSoftwares();
    const [laboratories] = useLaboratories();
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

        const software = softwares.find((sw) => sw.id === parseInt(id));
        console.log("Software encontrado:", software);

        if (software) {
            setFormData({ ...software });
        } else {
            console.log("Software não encontrado, redirecionando...");
            router.push("/labs/software");
        }
    }, [id, softwares, loading, router]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Dados do formulário ao salvar:", formData);
        const updatedSoftwares = softwares.map((sw) =>
            sw.id === parseInt(id) ? { ...formData, laboratoryId: parseInt(formData.laboratoryId) } : sw
        );
        await setSoftwares(updatedSoftwares);
        router.push("/labs/software");
    };

    if (loading) {
        return <div>Carregando softwares...</div>;
    }

    if (!formData) {
        return <div>Software não encontrado.</div>;
    }

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
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        placeholder="Digite o nome do software"
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
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="user">
                        Usuário
                    </label>
                    <input
                        type="text"
                        id="user"
                        value={formData.user || ""}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        placeholder="Digite o usuário (opcional)"
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