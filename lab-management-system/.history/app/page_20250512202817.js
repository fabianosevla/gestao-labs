"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMacroHardwares, useMicroHardwares, useSoftwares } from "../lib/storage";
import { useAuth } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();
  const [isMounted, setIsMounted] = useState(false);
  const [macroHardwares, , macroLoading, refreshMacroHardwares] = useMacroHardwares();
  const [microHardwares, , microLoading, refreshMicroHardwares] = useMicroHardwares();
  const [softwares, , softwareLoading, refreshSoftwares] = useSoftwares();
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    console.log("Componente montado no cliente");
    setIsMounted(true);
    refreshMacroHardwares();
    refreshMicroHardwares();
    refreshSoftwares();
  }, [refreshMacroHardwares, refreshMicroHardwares, refreshSoftwares]);

  // Renderiza um placeholder no servidor
  if (!isMounted) {
    return <div className="p-6 pt-28">Carregando no servidor...</div>;
  }

  if (macroLoading || microLoading || softwareLoading) {
    console.log("Carregando dados:", { macroLoading, microLoading, softwareLoading });
    return <div className="p-6 pt-28">Carregando dados...</div>;
  }

  console.log("Renderizando página:", { user, macroHardwaresLength: macroHardwares.length });

  const handleLogin = () => {
    router.push("/login");
  };

  const filteredMacroHardwares = macroHardwares.filter((hw) =>
    hw.name.toLowerCase().includes(searchName.toLowerCase())
  );
  const filteredMicroHardwares = microHardwares.filter((hw) =>
    hw.name.toLowerCase().includes(searchName.toLowerCase())
  );
  const filteredSoftwares = softwares.filter((sw) =>
    sw.name.toLowerCase().includes(searchName.toLowerCase())
  );

  if (user) {
    return (
      <ProtectedRoute>
        <div className="p-6 pt-28">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Bem-vindo ao Sistema</h1>
          <p className="text-gray-700 text-lg">
            Este é o sistema de gerenciamento de laboratórios da Universidade Federal de Itajubá.
            Use o menu acima para navegar entre as seções de Hardware e Software dos Laboratórios, assim como os Usuários.
          </p>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Consulta de Equipamentos e Softwares</h1>
        <button
          onClick={handleLogin}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Login
        </button>
      </div>

      <div className="mb-6">
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

      {/* Macro Hardwares */}
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Hardwares Macro</h2>
      <div className="overflow-x-auto mb-8">
        <table className="w-full border-collapse bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3 text-gray-900 font-semibold text-left">ID</th>
              <th className="border p-3 text-gray-900 font-semibold text-left">Nome</th>
            </tr>
          </thead>
          <tbody>
            {filteredMacroHardwares.map((hw) => (
              <tr key={hw.id.toString()} className="hover:bg-gray-50">
                <td className="border p-3 text-gray-700">{hw.id}</td>
                <td className="border p-3 text-gray-700">{hw.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Micro Hardwares */}
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Hardwares Micro</h2>
      <div className="overflow-x-auto mb-8">
        <table className="w-full border-collapse bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3 text-gray-900 font-semibold text-left">ID</th>
              <th className="border p-3 text-gray-900 font-semibold text-left">Nome</th>
            </tr>
          </thead>
          <tbody>
            {filteredMicroHardwares.map((hw) => (
              <tr key={hw.id.toString()} className="hover:bg-gray-50">
                <td className="border p-3 text-gray-700">{hw.id}</td>
                <td className="border p-3 text-gray-700">{hw.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Softwares */}
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Softwares</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3 text-gray-900 font-semibold text-left">ID</th>
              <th className="border p-3 text-gray-900 font-semibold text-left">Nome</th>
            </tr>
          </thead>
          <tbody>
            {filteredSoftwares.map((sw) => (
              <tr key={sw.id.toString()} className="hover:bg-gray-50">
                <td className="border p-3 text-gray-700">{sw.id}</td>
                <td className="border p-3 text-gray-700">{sw.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}