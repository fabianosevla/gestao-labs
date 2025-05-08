"use client";

import { useRouter } from "next/navigation";
import { useMacroHardwares } from "../../lib/storage";

export default function Macro() {
    const router = useRouter();
    const [macroHardwares] = useMacroHardwares();

    const handleCreate = () => {
        router.push("/labs/hardware/macro/create");
    };

    return (
        <div className="p-6 pt-28">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">Laboratório Macro</h1>
            <p className="text-gray-700 mb-6">Aqui você pode gerenciar os recursos do laboratório Macro.</p>
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
                            <th className="border p-3 text-gray-900 font-semibold text-left">Marca</th>
                            <th className="border p-3 text-gray-900 font-semibold text-left">Modelo</th>
                            <th className="border p-3 text-gray-900 font-semibold text-left">Número de Série</th>
                            <th className="border p-3 text-gray-900 font-semibold text-left">Processador</th>
                            <th className="border p-3 text-gray-900 font-semibold text-left">RAM</th>
                            <th className="border p-3 text-gray-900 font-semibold text-left">Armazenamento</th>
                            <th className="border p-3 text-gray-900 font-semibold text-left">Data de Aquisição</th>
                            <th className="border p-3 text-gray-900 font-semibold text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {macroHardwares.map((hardware) => (
                            <tr key={hardware.id} className="hover:bg-gray-50">
                                <td className="border p-3 text-gray-700">{hardware.id}</td>
                                <td className="border p-3 text-gray-700">{hardware.name}</td>
                                <td className="border p-3 text-gray-700">{hardware.brand}</td>
                                <td className="border p-3 text-gray-700">{hardware.model}</td>
                                <td className="border p-3 text-gray-700">{hardware.serialNumber}</td>
                                <td className="border p-3 text-gray-700">{hardware.processor}</td>
                                <td className="border p-3 text-gray-700">{hardware.ram}</td>
                                <td className="border p-3 text-gray-700">{hardware.storage}</td>
                                <td className="border p-3 text-gray-700">{hardware.acquisitionDate}</td>
                                <td className="border p-3 text-gray-700">{hardware.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}