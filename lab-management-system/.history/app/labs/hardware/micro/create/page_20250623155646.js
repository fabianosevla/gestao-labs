// app/labs/hardware/micro/create/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMicroHardwares, useLaboratories, addMicroHardware } from "../../../../../lib/storage";

export default function CreateMicroHardware() {
    const router = useRouter();
    const [microHardwares, loading, refreshMicroHardwares] = useMicroHardwares(); // Removido setMicroHardwares
    const [laboratories] = useLaboratories(); // Apenas laboratories, pois loading é o terceiro item no retorno
    // Removido useAdminUsers e useVisitorUsers

    const [formData, setFormData] = useState({
        name: "",
        laboratoryId: "",
        quantity: 1, // NOVO CAMPO: Quantidade, valor padrão 1
        model: "", // NOVO CAMPO: Modelo
        config1: "", // NOVO CAMPO: Configuração 1
        config2: "", // NOVO CAMPO: Configuração 2
        config3: "", // NOVO CAMPO: Configuração 3
        status: "ativo",
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        // Converte a quantidade para número
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
            quantity: formData.quantity, // Inclui o novo campo
            model: formData.model, // Inclui o novo campo
            config1: formData.config1, // Inclui o novo campo
            config2: formData.config2, // Inclui o novo campo
            config3: formData.config3, // Inclui o novo campo
            status: formData.status,
        };

        await addMicroHardware(newHardware);
        await refreshMicroHardwares();
        router.push("/labs/hardware/micro");
    };

    // Removido adminLoading e visitorLoading
    if (loading) {
        return <div>Carregando dados...</div>;
    }

    // Gerar opções para a combobox de quantidade (1 a 200)
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

                {/* NOVO CAMPO: Quantidade */}
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

                {/* NOVOS CAMPOS: Modelo e Configurações */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="model">
                        Modelo
                    </label>
                    <input
                        type="text"
                        id="model"
                        value={formData.model}
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
                        value={formData.config1}
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
                        value={formData.config2}
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
                        value={formData.config3}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        placeholder="Digite a terceira configuração"
                        autoComplete="off"
                    />
                </div>
                {/* FIM DOS NOVOS CAMPOS */}

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