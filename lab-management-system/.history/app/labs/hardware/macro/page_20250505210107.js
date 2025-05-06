"use client";

import { useRouter } from "next/navigation";

export default function Macro() {
    const router = useRouter();

    const handleCreate = () => {
        router.push("/labs/hardware/macro/create");
    };

    return (
        <div className="p-6 pt-28">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">Laboratório Macro</h1>
            <p className="text-gray-700 mb-6">Aqui você pode gerenciar os recursos do laboratório Macro.</p>
            <button
                onClick={handleCreate}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 text-left"
            >
                Criar
            </button>
        </div>
    );
}