"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLaboratories, useMicroHardwares, useMacroHardwares, useSoftwares } from "../../../lib/storage";

export default function Laboratories() {
    const router = useRouter();
    const [laboratories, setLaboratories] = useLaboratories();
    const [microHardwares] = useMicroHardwares();
    const [macroHardwares] = useMacroHardwares();
    const [softwares] = useSoftwares();
    const [searchName, setSearchName] = useState("");
    const [searchStatus, setSearchStatus] = useState("");

    const handleCreate = () => {
        router.push("/labs/laboratories/create");
    };

    const handleEdit = (id) => {
        router.push(`/labs/laboratories/edit/${id}`);
    };

    const handleDelete = (id) => {
        const updatedLaboratories = laboratories.filter((lab) => lab.id !== id);
        setLaboratories(updatedLaboratories);
    };

    const filteredLaboratories = laboratories.filter((lab) => {
        const matchesName = lab.name
            .toLowerCase()
            .includes(searchName.toLowerCase());
        const matchesStatus = searchStatus
            ? lab.status.toLowerCase() === searchStatus.toLowerCase()
            : true;
        return matchesName && matchesStatus;
    });

    const getAssociatedItems = (labId) => {
        const micro = microHardwares.filter((item) => item.laboratoryId === labId);
        const macro = macroHardwares.filter((item) => item.laboratoryId === labId);
        const software = softwares.filter((item) => item.laboratoryId === labId);
        return { micro, macro, software };
    };

    return (
        <div className="p-6 pt-28">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">Laboratórios</h1>
            <p className="text-gray-700 mb-6">Aqui você pode gerenciar os laboratórios da universidade.</p>

            <div className="mb-6 flex gap-4">
                <div className="flex-1">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="searchName">
                        Pesquisar por Nome
                    </label>
                    <input
                        type="text"
                        id="searchName"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        placeholder="Digite o nome para buscar"
                    />
                </div>
                <div className="flex-1">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="searchStatus">
                        Pesquisar por Status
                    </label>
                    <select
                        id="searchStatus"
                        value={searchStatus}
                        onChange={(e) => setSearchStatus(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    >
                        <option value="">Todos</option>
                        <option value="ativo">Ativo</option>
                        <option value="inativo">Inativo</option>
                    </select>
                </div>
            </div>

            <button
                onClick={handleCreate}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 text-left mb-6"
            >
                Criar
            </button>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-3 text-gray-900 font-semibold text-left">ID</th>
                            <th className="border p-3 text-gray-900 font-semibold text-left">Nome</th>
                            <th className="border p-3 text-gray-900 font-semibold text-left">Localização</th>
                            <th className="border p-3 text-gray-900 font-semibold text-left">Responsável</th>
                            <th className="border p-3 text-gray-900 font-semibold text-left">Capacidade</th>
                            <th className="border p-3 text-gray-900 font-semibold text-left">Status</th>
                            <th className="border p-3 text-gray-900 font-semibold text-left">Editar</th>
                            <th className="border p-3 text-gray-900 font-semibold text-left">Excluir</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLaboratories.map((lab) => {
                            const associatedItems = getAssociatedItems(lab.id);
                            return (
                                <tr key={lab.id} className="hover:bg-gray-50">
                                    <td className="border p-3 text-gray-700">{lab.id}</td>
                                    <td className="border p-3 text-gray-700">{lab.name}</td>
                                    <td className="border p-3 text-gray-700">{lab.location}</td>
                                    <td className="border p-3 text-gray-700">{lab.responsible}</td>
                                    <td className="border p-3 text-gray-700">{lab.capacity}</td>
                                    <td className="border p-3 text-gray-700">{lab.status}</td>
                                    <td className="border p-3 text-gray-700">
                                        <button
                                            onClick={() => handleEdit(lab.id)}
                                            className="text-blue-600 hover:text-blue-800"
                                            title="Editar"
                                        >
                                            ✏️
                                        </button>
                                    </td>
                                    <td className="border p-3 text-gray-700">
                                        <button
                                            onClick={() => handleDelete(lab.id)}
                                            className="text-red-600 hover:text-red-800"
                                            title="Excluir"
                                        >
                                            ❌
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Itens Associados por Laboratório</h2>
                {filteredLaboratories.map((lab) => {
                    const associatedItems = getAssociatedItems(lab.id);
                    return (
                        <div key={lab.id} className="mb-6">
                            <h3 className="text-xl font-semibold text-gray-900">{lab.name}</h3>
                            <div className="mt-2">
                                <h4 className="text-lg font-medium text-gray-800">Hardware Micro</h4>
                                {associatedItems.micro.length > 0 ? (
                                    <ul className="list-disc pl-5 text-gray-700">
                                        {associatedItems.micro.map((item) => (
                                            <li key={item.id}>{item.name} (Usuário: {item.user || "Nenhum"})</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-700">Nenhum Hardware Micro associado.</p>
                                )}
                            </div>
                            <div className="mt-2">
                                <h4 className="text-lg font-medium text-gray-800">Hardware Macro</h4>
                                {associatedItems.macro.length > 0 ? (
                                    <ul className="list-disc pl-5 text-gray-700">
                                        {associatedItems.macro.map((item) => (
                                            <li key={item.id}>{item.name} (Usuário: {item.user || "Nenhum"})</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-700">Nenhum Hardware Macro associado.</p>
                                )}
                            </div>
                            <div className="mt-2">
                                <h4 className="text-lg font-medium text-gray-800">Software</h4>
                                {associatedItems.software.length > 0 ? (
                                    <ul className="list-disc pl-5 text-gray-700">
                                        {associatedItems.software.map((item) => (
                                            <li key={item.id}>{item.name} (Usuário: {item.user || "Nenhum"})</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-700">Nenhum Software associado.</p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}