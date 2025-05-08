"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useVisitorUsers } from "../../../../../../lib/storage";

export default function EditVisitor() {
    const router = useRouter();
    const { id } = useParams();
    const [visitorUsers, setVisitorUsers] = useVisitorUsers();
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        const user = visitorUsers.find((u) => u.id === parseInt(id));
        if (user) {
            setFormData({ ...user });
        } else {
            router.push("/labs/users/visitor");
        }
    }, [id, visitorUsers, router]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedVisitorUsers = visitorUsers.map((u) =>
            u.id === parseInt(id) ? { ...formData } : u
        );
        setVisitorUsers(updatedVisitorUsers);
        router.push("/labs/users/visitor");
    };

    if (!formData) return <div>Carregando...</div>;

    return (
        <div className="p-6 pt-28">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">Editar Visitante</h1>
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
                        placeholder="Digite o nome"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="course">
                        Curso
                    </label>
                    <input
                        type="text"
                        id="course"
                        value={formData.course || ""}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        placeholder="Digite o curso"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cpf">
                        CPF
                    </label>
                    <input
                        type="text"
                        id="cpf"
                        value={formData.cpf || ""}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        placeholder="Digite o CPF (ex.: 123.456.789-00)"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="registrationNumber">
                        Número de Matrícula
                    </label>
                    <input
                        type="text"
                        id="registrationNumber"
                        value={formData.registrationNumber || ""}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        placeholder="Digite o número de matrícula"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                        Tipo
                    </label>
                    <select
                        id="type"
                        value={formData.type || "aluno"}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        required
                    >
                        <option value="aluno">Aluno</option>
                        <option value="professor">Professor</option>
                        <option value="visitante_nao_matriculado">Visitante Não Matriculado</option>
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