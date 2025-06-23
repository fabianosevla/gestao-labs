// app/labs/hardware/micro/create/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMicroHardwares, useLaboratories, addMicroHardware } from "../../../../../lib/storage";

export default function CreateMicroHardware() {
    const router = useRouter();
    const [microHardwares, loading, refreshMicroHardwares] = useMicroHardwares();
    const [laboratories] = useLaboratories();

    const [formData, setFormData] = useState({
        name: "",
        laboratoryId: "",
        quantity: 1, // Campo Quantidade
        specification: "", // RENOMEADO: de 'model' para 'specification'
        // REMOVIDOS: config1, config2, config3
        status: "ativo",
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: id === "quantity" ? parseInt(value) : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Salvando novo hardware micro:", formData);

        const newHardware = {
            name: formData.name,
            laboratoryId: parseInt(formData.laboratoryId),
            quantity: formData.quantity,
            specification: formData.specification, // Novo nome do campo
            // Campos config1, config2, config3 NÃO estão no objeto
            status: formData.status,
        };

        await addMicroHardware(newHardware);
        await refreshMicroHardwares();
        router.push("/labs/hardware/micro");
    };

    if (loading) {
        return <div>Carregando dados...</div>;
    }

    const quantityOptions = Array.from({ length: 200 }, (_, i) => i + 1);

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
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
                        Quantidade
                    </label>
                    <select
                        id="quantity"
                        value={formData.quantity}
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

                {/* CAMPO RENOMEADO: Especificação */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="specification">
                        Especificação
                    </label>
                    <input
                        type="text"
                        id="specification"
                        value={formData.specification}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        placeholder="Digite a especificação do hardware"
                        autoComplete="off"
                    />
                </div>
                {/* CAMPOS config1, config2, config3 REMOVIDOS */}

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