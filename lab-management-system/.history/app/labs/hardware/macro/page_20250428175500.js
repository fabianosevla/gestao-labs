"use client";

import { useState } from "react";

export default function Macro() {
    const [macroLabs, setMacroLabs] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        nome: "",
        descricao: "",
        localizacao: "",
        capacidade: "",
        equipamentos: "",
        tipoEquipamento: "",
        especificacaoTecnica: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        setMacroLabs([...macroLabs, formData]);
        setShowForm(false);
        setFormData({
            nome: "",
            descricao: "",
            localizacao: "",
            capacidade: "",
            equipamentos: "",
            tipoEquipamento: "",
            especificacaoTecnica: "",
        });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Hardware - Macro</h2>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Criar Hardware Macro
                </button>
            </div>

            {showForm ? (
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-4">Criar Hardware Macro</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2">Nome</label>
                            <input
                                type="text"
                                name="nome"
                                value={formData.nome}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2">Descrição</label>
                            <input
                                type="text"
                                name="descricao"
                                value={formData.descricao}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2">Localização</label>
                            <input
                                type="text"
                                name="localizacao"
                                value={formData.localizacao}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2">Capacidade</label>
                            <input
                                type="number"
                                name="capacidade"
                                value={formData.capacidade}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2">Equipamentos</label>
                            <input
                                type="text"
                                name="equipamentos"
                                value={formData.equipamentos}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2">Tipo de Equipamento</label>
                            <input
                                type="text"
                                name="tipoEquipamento"
                                value={formData.tipoEquipamento}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2">Especificação Técnica</label>
                            <input
                                type="text"
                                name="especificacaoTecnica"
                                value={formData.especificacaoTecnica}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end mt-6 space-x-4">
                        <button
                            onClick={() => setShowForm(false)}
                            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Salvar
                        </button>
                    </div>
                </div>
            ) : (
                <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-4 py-2 text-left">Nome</th>
                            <th className="px-4 py-2 text-left">Descrição</th>
                            <th className="px-4 py-2 text-left">Localização</th>
                            <th className="px-4 py-2 text-left">Tipo Equipamento</th>
                            <th className="px-4 py-2 text-left">Especificação Técnica</th>
                        </tr>
                    </thead>
                    <tbody>
                        {macroLabs.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-4 py-2 text-center text-gray-500">
                                    Nenhum laboratório Macro registrado.
                                </td>
                            </tr>
                        ) : (
                            macroLabs.map((lab, index) => (
                                <tr key={index} className="border-t">
                                    <td className="px-4 py-2">{lab.nome}</td>
                                    <td className="px-4 py-2">{lab.descricao}</td>
                                    <td className="px-4 py-2">{lab.localizacao}</td>
                                    <td className="px-4 py-2">{lab.tipoEquipamento}</td>
                                    <td className="px-4 py-2">{lab.especificacaoTecnica}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
}