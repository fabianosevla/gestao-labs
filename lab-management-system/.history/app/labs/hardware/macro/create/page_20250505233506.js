"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMacroHardwares } from "../../../lib/storage";

export default function CreateMacro() {
    const router = useRouter();
    const [macroHardwares, setMacroHardwares] = useMacroHardwares();
    const [formData, setFormData] = useState({
        name: "",
        brand: "",
        model: "",
        serialNumber: "",
        processor: "",
        ram: "",
        storage: "",
        acquisitionDate: "",
        status: "ativo",
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newHardware = {
            id: macroHardwares.length + 1,
            ...formData,
        };
        setMacroHardwares([...macroHardwares, newHardware]);
        router.push("/labs/hardware/macro");
    };

    return (
        <div className="p-6 pt-28">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">Criar Novo Hardware Macro</h1>
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
                        placeholder="Digite o nome do computador"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="brand">
                        Marca
                    </label>
                    <input
                        type="text"
                        id="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        placeholder="Ex.: Dell, HP"
                        required
                    />
                </div>
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
                        placeholder="Ex.: OptiPlex 7050"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="serialNumber">
                        Número de Série
                    </label>
                    <input
                        type="text"
                        id="serialNumber"
                        value={formData.serialNumber}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        placeholder="Digite o número de série"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="processor">
                        Capacidade de Processamento
                    </label>
                    <input
                        type="text"
                        id="processor"
                        value={formData.processor}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        placeholder="Ex.: Intel i7, 3.2 GHz"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ram">
                        Memória RAM
                    </label>
                    <input
                        type="text"
                        id="ram"
                        value={formData.ram}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        placeholder="Ex.: 16GB"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="storage">
                        Armazenamento
                    </label>
                    <input
                        type="text"
                        id="storage"
                        value={formData.storage}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        placeholder="Ex.: 512GB SSD"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="acquisitionDate">
                        Data de Aquisição
                    </label>
                    <input
                        type="date"
                        id="acquisitionDate"
                        value={formData.acquisitionDate}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        required
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