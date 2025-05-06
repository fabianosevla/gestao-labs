"use client";

import { useRouter } from "next/navigation";
import { useMicroHardwares } from "../../../lib/storage";

export default function Micro() {
    const router = useRouter();
    const [microHardwares] = useMicroHardwares();

    const handleCreate = () => {
        console.log("Redirecionando para /labs/hardware/micro/create");
        router.push("/labs/hardware/micro/create");
    };

    return (
        <div className="p-6 pt-28">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">Laboratório Micro</h1>
            <p className="text-gray-700 mb-6">Aqui você pode gerenciar os recursos do laboratório Micro.</p>
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
                            <th className="border p-3 text-gray-900 font-semibold text-left">Tipo</th>
                            <th className="border p-3 text-gray-900 font-semibold text-left">Valor</th>
                            <th className="border p-3 text-gray-900 font-semibold text-left">Quantidade</th>
                            <th className="border p-3 text-gray-900 font-semibold text-left">Fabricante</th>
                            <th className="border p-3 text-gray-900 font-semibold text-left">Data de Aquisição</th>
                            <th className="border p-3 text-gray-900 font-semibold text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {microHardwares.map((hardware) => (
                            <tr key={hardware.id} className="hover:bg-gray-50">
                                <td className="border p-3 text-gray-700">{hardware.id}</td>
                                <td className="border p-3 text-gray-700">{hardware.name}</td>
                                <td className="border p-3 text-gray-700">{hardware.type}</td>
                                <td className="border p-3 text-gray-700">{hardware.value}</td>
                                <td className="border p-3 text-gray-700">{hardware.quantity}</td>
                                <td className="border p-3 text-gray-700">{hardware.manufacturer}</td>
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