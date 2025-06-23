// app/labs/hardware/macro/edit/[id]/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useMacroHardwares, useLaboratories, updateMacroHardware } from "../../../../../../lib/storage";

export default function EditMacroHardware() {
    const router = useRouter();
    const { id } = useParams();
    const [macroHardwares, loading, refreshMacroHardwares] = useMacroHardwares();
    const [laboratories] = useLaboratories();

    const [formData, setFormData] = useState(null);

    useEffect(() => {
        if (loading) {
            console.log("Aguardando carregamento dos hardwares macro...");
            return;
        }

        console.log("ID recebido:", id);
        console.log("Hardwares macro disponíveis:", macroHardwares);

        if (!id || isNaN(parseInt(id))) {
            console.log("ID inválido, redirecionando...");
            router.push("/labs/hardware/macro");
            return;
        }

        if (macroHardwares && Array.isArray(macroHardwares) && macroHardwares.length > 0) {
            const hardware = macroHardwares.find((hw) => hw.id === parseInt(id));
            console.log("Hardware encontrado:", hardware);

            if (hardware) {
                setFormData({
                    ...hardware,
                    quantity: hardware.quantity || 1,
                    model: hardware.model || "",
                    config1: hardware.config1 || "",
                    config2: hardware.config2 || "",
                    config3: hardware.config3 || "",
                });
            } else {
                console.log("Hardware não encontrado, redirecionando...");
                router.push("/labs/hardware/macro");
            }
        }
    }, [id, macroHardwares, loading, router]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: id === "quantity" ? parseInt(value) : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Atualizando hardware macro:", formData);

        const updatedHardware = {
            name: formData.name,
            laboratoryId: parseInt(formData.laboratoryId),
            quantity: formData.quantity,
            model: formData.model,
            config1: formData.config1,
            config2: formData.config2,
            config3: formData.config3,
            status: formData.status,
        };

        await updateMacroHardware(parseInt(id), updatedHardware);
        await refreshMacroHardwares();
        router.push("/labs/hardware/macro");
    };

    if (loading) {
        return <div>Carregando dados...</div>;
    }

    if (!formData) {
        return <div>Hardware não encontrado.</div>;
    }

    const quantityOptions = Array.from({ length: 200 }, (_, i) => i + 1);

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
                        value={formData?.name || ""}
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
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
                        Quantidade
                    </label>
                    <select
                        id="quantity"
                        value={formData?.quantity || 1}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        required
                    >
                        {quantityOptions.map((num) => (
                            <option key={num} value={num}>
                                {num}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="model">
                        Modelo
                    </label>
                    <input
                        type="text"
                        id="model"
                        value={formData?.model || ""}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        placeholder="Digite o modelo do hardware"
                        autoComplete="off"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="config1">
                        Configuração 1
                    </label>
                    <input
                        type="text"
                        id="config1"
                        value={formData?.config1 || ""}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        placeholder="Digite a primeira configuração"
                        autoComplete="off"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="config2">
                        Configuração 2
                    </label>
                    <input
                        type="text"
                        id="config2"
                        value={formData?.config2 || ""}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        placeholder="Digite a segunda configuração"
                        autoComplete="off"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="config3">
                        Configuração 3
                    </label>
                    <input
                        type="text"
                        id="config3"
                        value={formData?.config3 || ""}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        placeholder="Digite a terceira configuração"
                        autoComplete="off"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                        Status
                    </label>
                    <select
                        id="status"
                        value={formData?.status || "ativo"}
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