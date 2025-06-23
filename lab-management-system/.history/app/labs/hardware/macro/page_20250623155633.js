// app/labs/hardware/macro/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMacroHardwares, useLaboratories, deleteMacroHardware } from "../../../../lib/storage";
import { useAuth } from "../../../../lib/authContext";

export default function MacroHardwares() {
    const router = useRouter();
    const { isAuthenticated } = useAuth();
    const [macroHardwares, loading, refreshMacroHardwares] = useMacroHardwares(); // Removido setMacroHardwares
    const [laboratories] = useLaboratories(); // Apenas laboratories, pois loading é o terceiro item no retorno
    // Removido useAdminUsers e useVisitorUsers

    const [searchName, setSearchName] = useState("");
    const [searchStatus, setSearchStatus] = useState("");
    const [searchModel, setSearchModel] = useState(""); // NOVO CAMPO DE BUSCA: Modelo

    const handleCreate = () => {
        router.push("/labs/hardware/macro/create");
    };

    const handleEdit = (id) => {
        router.push(`/labs/hardware/macro/edit/${id}`);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Tem certeza que deseja excluir este hardware macro?")) {
            await deleteMacroHardware(id);
            await refreshMacroHardwares();
            alert("Hardware macro excluído com sucesso!");
        }
    };

    const filteredMacroHardwares = macroHardwares.filter((hw) => {
        const matchesName = hw.name.toLowerCase().includes(searchName.toLowerCase());
        const matchesStatus = searchStatus ? hw.status.toLowerCase() === searchStatus.toLowerCase() : true;
        const matchesModel = searchModel ? hw.model?.toLowerCase().includes(searchModel.toLowerCase()) : true; // Filtra por modelo
        return matchesName && matchesStatus && matchesModel;
    });

    const getLaboratoryName = (labId) => {
        const lab = laboratories.find((l) => l.id === labId);
        return lab ? lab.name : "Nenhum";
    };

    // Removida a função getUserName, pois o campo userId foi retirado dos hardwares
    // if (!userId && userId !== 0) return "Ninguém";
    // const fullUserId = userId.toString().startsWith("admin-") ? userId : userId.toString().startsWith("visitor-") ? userId : `admin-${userId}`;
    // const [type, id] = fullUserId.split("-");
    // const user = type === "admin" ? adminUsers.find((u) => u.id === parseInt(id)) : visitorUsers.find((u) => u.id === parseInt(id));
    // return user ? user.name : "Desconhecido";

    // Removido adminLoading e visitorLoading
    if (loading) {
        return <div>Carregando hardwares macro...</div>;
    }

    return (
        <div className="p-6 pt-28">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">Hardware Macro</h1>
            <p className="text-gray-700 mb-6">Gerencie os hardwares macro do laboratório.</p>

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
                        autoComplete="off"
                    />
                </div>
                <div className="flex-1">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="searchModel">
                        Pesquisar por Modelo
                    </label>
                    <input
                        type="text"
                        id="searchModel"
                        value={searchModel}
                        onChange={(e) => setSearchModel(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        placeholder="Digite o modelo para buscar"
                        autoComplete="off"
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
                        autoComplete="off"
                    >
                        <option value="">Todos</option>
                        <option value="ativo">Ativo</option>
                        <option value="inativo">Inativo</option>
                    </select>
                </div>
            </div>

            {isAuthenticated && (
                <button
                    onClick={handleCreate}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 text-left mb-6"
                >
                    Criar
                </button>
            )}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-3 text-gray-900 font-semibold text-left">ID</th>
                            <th className="border p-3 text-gray-900 font-semibold text-left">Nome</th>
                            <th className="border p-3 text-gray-900 font-semibold text-left">Laboratório</th>
                            <th className="border p-3 text-gray-900 font-semibold text-left">Quantidade</th> {/* NOVA COLUNA */}
                            <th className="border p-3 text-gray-900 font-semibold text-left">Modelo</th> {/* NOVA COLUNA */}
                            <th className="border p-3 text-gray-900 font-semibold text-left">Config. 1</th> {/* NOVA COLUNA */}
                            <th className="border p-3 text-gray-900 font-semibold text-left">Config. 2</th> {/* NOVA COLUNA */}
                            <th className="border p-3 text-gray-900 font-semibold text-left">Config. 3</th> {/* NOVA COLUNA */}
                            <th className="border p-3 text-gray-900 font-semibold text-left">Status</th>
                            {isAuthenticated && (
                                <>
                                    <th className="border p-3 text-gray-900 font-semibold text-left">Editar</th>
                                    <th className="border p-3 text-gray-900 font-semibold text-left">Excluir</th>
                                </>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMacroHardwares.map((hw) => (
                            <tr key={hw.id.toString()} className="hover:bg-gray-50">
                                <td className="border p-3 text-gray-700">{hw.id}</td>
                                <td className="border p-3 text-gray-700">{hw.name}</td>
                                <td className="border p-3 text-gray-700">{getLaboratoryName(hw.laboratoryId)}</td>
                                <td className="border p-3 text-gray-700">{hw.quantity || "N/A"}</td> {/* EXIBIR QUANTIDADE */}
                                <td className="border p-3 text-gray-700">{hw.model || "N/A"}</td> {/* EXIBIR MODELO */}
                                <td className="border p-3 text-gray-700">{hw.config1 || "N/A"}</td> {/* EXIBIR CONFIG 1 */}
                                <td className="border p-3 text-gray-700">{hw.config2 || "N/A"}</td> {/* EXIBIR CONFIG 2 */}
                                <td className="border p-3 text-gray-700">{hw.config3 || "N/A"}</td> {/* EXIBIR CONFIG 3 */}
                                <td className="border p-3 text-gray-700">{hw.status}</td>
                                {isAuthenticated && (
                                    <>
                                        <td className="border p-3 text-gray-700">
                                            <button
                                                onClick={() => handleEdit(hw.id)}
                                                className="text-blue-600 hover:text-blue-800"
                                                title="Editar"
                                            >
                                                ✏️
                                            </button>
                                        </td>
                                        <td className="border p-3 text-gray-700">
                                            <button
                                                onClick={() => handleDelete(hw.id)}
                                                className="text-red-600 hover:text-red-800"
                                                title="Excluir"
                                            >
                                                ❌
                                            </button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}