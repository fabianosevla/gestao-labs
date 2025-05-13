"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleNavigation = (path) => {
    router.push(path);
    closeModal();
  };

  return (
    <div className="p-6">
      {/* Conteúdo existente da página inicial */}
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Bem-vindo ao Sistema</h1>
      <p className="text-gray-700 text-lg mb-8">
        Este é o sistema de gerenciamento de laboratórios da Universidade Federal de Itajubá.
      </p>

      {/* Botão para abrir o popup */}
      <div className="mt-8">
        <button
          onClick={openModal}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Consulta de Componentes
        </button>
      </div>

      {/* Modal/Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Consulta de Componentes</h2>
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => handleNavigation("/labs/hardware/micro")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Listar Hardwares - Micro
              </button>
              <button
                onClick={() => handleNavigation("/labs/hardware/macro")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Listar Hardwares - Macro
              </button>
              <button
                onClick={() => handleNavigation("/labs/software")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Listar Softwares
              </button>
            </div>
            <button
              onClick={closeModal}
              className="mt-4 w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}