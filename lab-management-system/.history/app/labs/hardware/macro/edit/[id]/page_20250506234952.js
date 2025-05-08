"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useMacroHardwares, useLaboratories } from "../../../../../../lib/storage";

export default function EditMacroHardware() {
    const router = useRouter();
    const { id } = useParams();
    const [macroHardwares, setMacroHardwares, loading] = useMacroHardwares();
    const [laboratories] = useLaboratories();
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        if (loading) {
            console.log("Aguardando carregamento dos macro hardwares...");
            return;
        }

        console.log("ID recebido:", id);
        console.log("Macro Hardwares disponíveis:", macroHardwares);

        if (!id || isNaN(parseInt(id))) {
            console.log("ID inválido, redirecionando...");
            router.push("/labs/hardware/macro");
            return;
        }

        const hardware = macroHardwares.find((hw) => hw.id === parseInt(id));
        console.log("Hardware encontrado:", hardware);

        if (hardware) {
            setFormData({ ...hardware });
        } else {
            console.log("Hardware não encontrado, redirecionando...");
            router.push("/labs/hardware/macro");
        }
    }, [id, macroHardwares, loading, router]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Dados do formulário ao salvar:", formData);
        const updatedMacroHardwares = macroHardwares.map((hw) =>
            hw.id === parseInt(id) ? { ...formData, laboratoryId: parseInt(formData.laboratoryId) } : hw
        );
        await setMacroHardwares(updatedMacroHardwares);
        router.push("/labs/hardware/macro");
    };

    if (loading) {
        return <div>Carregando macro hardwares...</div>;
    }

    if (!formData) {
        return <div>Hardware não encontrado.</div>;
    }

    return (
        <div className="p-6 pt-28">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">Editar Hardware Macro</h1>
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