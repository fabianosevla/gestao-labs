"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useMacroHardwares, useLaboratories, useAdminUsers, useVisitorUsers } from "../../../../../../lib/storage";

export default function EditMacroHardware() {
    const router = useRouter();
    const { id } = useParams();
    const [macroHardwares, setMacroHardwares] = useMacroHardwares();
    const [laboratories] = useLaboratories();
    const [adminUsers] = useAdminUsers();
    const [visitorUsers] = useVisitorUsers();
    const [formData, setFormData] = useState(null);

    const allUsers = [...adminUsers, ...visitorUsers];

    useEffect(() => {
        const hw = macroHardwares.find((h) => h.id === parseInt(id));
        if (hw) {
            setFormData({ ...hw });
        } else {
            router.push("/labs/hardware/macro");
        }
    }, [id, macroHardwares, router]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedMacroHardwares = macroHardwares.map((h) =>
            h.id === parseInt(id) ? { ...formData } : h
        );
        setMacroHardwares(updatedMacroHardwares);
        router.push("/labs/hardware/macro");
    };

    if (!formData) return <div>Carregando...</div>;

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
                        placeholder="Digite o nome do hardware macro"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Descrição
                    </label>
                    <input
                        type="text"
                        id="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        placeholder="Digite a descrição"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="manufacturer">
                        Fabricante
                    </label>
                    <input
                        type="text"
                        id="manufacturer"
                        value={formData.manufacturer}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        placeholder="Digite o fabricante"
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
                    <select
                        id="user"
                        value={formData.user}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    >
                        <option value="">Nenhum</option>
                        {allUsers.map((user) => (
                            <option key={user.id} value={user.name}>
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