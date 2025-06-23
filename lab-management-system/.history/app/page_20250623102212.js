// app/page.js
"use client";

import { useState, useEffect } from "react";
import { useLaboratories, useAdminUsers } from "../lib/storage"; // Importar os hooks
import { useAuth } from "../lib/authContext"; // Importar useAuth se quiser condicionar a visibilidade

export default function Home() {
  const [laboratories, , loadingLaboratories] = useLaboratories();
  const [adminUsers, , loadingAdminUsers] = useAdminUsers();
  const { isAuthenticated } = useAuth(); // Se quiser condicionar o formulário de solicitação

  // Estado para o modal de detalhes do laboratório
  const [isLabDetailsModalOpen, setIsLabDetailsModalOpen] = useState(false);
  const [selectedLaboratory, setSelectedLaboratory] = useState(null);

  // Estado para o formulário de solicitação
  const [selectedLabForRequest, setSelectedLabForRequest] = useState("");
  const [requestText, setRequestText] = useState("");

  // Funções para o modal de detalhes do laboratório
  const openLabDetailsModal = (lab) => {
    setSelectedLaboratory(lab);
    setIsLabDetailsModalOpen(true);
  };
  const closeLabDetailsModal = () => {
    setSelectedLaboratory(null);
    setIsLabDetailsModalOpen(false);
  };

  // Função para obter informações do administrador
  const getAdminInfo = (adminId) => {
    if (!adminId) return { name: "Ninguém", phone: "N/A", email: "N/A" };
    const admin = adminUsers.find((u) => u.id === parseInt(adminId));
    return admin
      ? { name: admin.name, phone: admin.phone || "N/A", email: admin.email || "N/A" }
      : { name: "Desconhecido", phone: "N/A", email: "N/A" };
  };

  // Lida com o envio da solicitação
  const handleSubmitRequest = (e) => {
    e.preventDefault();
    if (!selectedLabForRequest || !requestText) {
      alert("Por favor, selecione um laboratório e digite sua solicitação.");
      return;
    }

    const lab = laboratories.find((l) => l.id === parseInt(selectedLabForRequest));
    if (!lab) {
      alert("Laboratório selecionado não encontrado.");
      return;
    }

    const labCoordinator = getAdminInfo(lab.labCoordinatorId);
    const generalCoordinator = getAdminInfo(lab.generalCoordinatorId);

    let recipients = [];
    if (labCoordinator.email && labCoordinator.email !== "N/A") {
      recipients.push(labCoordinator.email);
    }
    if (generalCoordinator.email && generalCoordinator.email !== "N/A") {
      recipients.push(generalCoordinator.email);
    }

    // Se nenhum coordenador tiver email, pode enviar para o técnico ou alertar
    if (recipients.length === 0) {
      const technician = getAdminInfo(lab.technicianId);
      if (technician.email && technician.email !== "N/A") {
        recipients.push(technician.email);
      } else {
        alert(`Nenhum e-mail de contato encontrado para o laboratório ${lab.name}.`);
        return;
      }
    }

    console.log("--- Nova Solicitação ---");
    console.log(`Para o Laboratório: ${lab.name}`);
    console.log(`Destinatários (simulados): ${recipients.join(", ")}`);
    console.log("Mensagem:");
    console.log(requestText);
    console.log("------------------------");

    alert("Solicitação enviada com sucesso (simulado)! Verifique o console para os detalhes do e-mail.");
    setSelectedLabForRequest("");
    setRequestText("");
  };

  if (loadingLaboratories || loadingAdminUsers) {
    return <div className="p-6 pt-28 text-gray-700">Carregando dados...</div>;
  }

  return (
    <div className="p-6 pt-28">
      {/* Boas-vindas - Pode ser removido ou estilizado */}
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Bem-vindo ao Sistema</h1>
      <p className="text-gray-700 text-lg mb-8">
        Este é o sistema de gerenciamento de laboratórios da Universidade Federal de Itajubá.
      </p>

      {/* 1. Bloco de Consulta de Laboratórios */}
      <section className="bg-white shadow-md rounded-lg p-6 mb-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Informações Resumidas dos Laboratórios</h2>
        {laboratories.length === 0 ? (
          <p className="text-gray-600">Nenhum laboratório cadastrado.</p>
        ) : (
          <ul className="space-y-3">
            {laboratories.map((lab) => (
              <li
                key={lab.id}
                className="p-3 bg-gray-50 hover:bg-blue-50 rounded-md cursor-pointer flex justify-between items-center transition duration-200 ease-in-out border border-gray-200"
                onClick={() => openLabDetailsModal(lab)}
              >
                <span className="text-gray-800 font-medium">{lab.name}</span>
                <span className="text-yellow-500 text-xl">⭐</span> {/* Icone da estrela */}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Modal de Detalhes do Laboratório */}
      {isLabDetailsModalOpen && selectedLaboratory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 w-full max-w-lg shadow-xl relative animate-fade-in-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-3">Detalhes do Laboratório</h2>
            <button
              onClick={closeLabDetailsModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-3xl font-light"
              aria-label="Fechar"
            >
              &times;
            </button>
            <div className="space-y-4 text-gray-700">
              <p><strong>Nome:</strong> {selectedLaboratory.name}</p>
              <p><strong>Prédio/Localização:</strong> {selectedLaboratory.location || "N/A"}</p>

              {/* Coordenador Geral */}
              <div className="border-t pt-4 mt-4">
                <h3 className="font-semibold text-lg text-gray-800 mb-2">Coordenador Geral</h3>
                <p><strong>Nome:</strong> {getAdminInfo(selectedLaboratory.generalCoordinatorId).name}</p>
                <p><strong>Fone:</strong> {getAdminInfo(selectedLaboratory.generalCoordinatorId).phone}</p>
                <p><strong>Email:</strong> {getAdminInfo(selectedLaboratory.generalCoordinatorId).email}</p>
              </div>

              {/* Coordenador do Lab */}
              <div className="border-t pt-4 mt-4">
                <h3 className="font-semibold text-lg text-gray-800 mb-2">Coordenador do Laboratório</h3>
                <p><strong>Nome:</strong> {getAdminInfo(selectedLaboratory.labCoordinatorId).name}</p>
                <p><strong>Fone:</strong> {getAdminInfo(selectedLaboratory.labCoordinatorId).phone}</p>
                <p><strong>Email:</strong> {getAdminInfo(selectedLaboratory.labCoordinatorId).email}</p>
              </div>

              {/* Técnico */}
              <div className="border-t pt-4 mt-4">
                <h3 className="font-semibold text-lg text-gray-800 mb-2">Técnico</h3>
                <p><strong>Nome:</strong> {getAdminInfo(selectedLaboratory.technicianId).name}</p>
                <p><strong>Fone:</strong> {getAdminInfo(selectedLaboratory.technicianId).phone}</p>
                <p><strong>Email:</strong> {getAdminInfo(selectedLaboratory.technicianId).email}</p>
              </div>
            </div>
            <button
              onClick={closeLabDetailsModal}
              className="mt-8 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* 2. Bloco de Formulário de Solicitação */}
      <section className="bg-white shadow-md rounded-lg p-6 border border-gray-200 mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Formulário de Solicitação</h2>
        <form onSubmit={handleSubmitRequest} className="space-y-4">
          <div>
            <label htmlFor="selectLab" className="block text-gray-700 text-sm font-bold mb-2">
              Selecione o Laboratório
            </label>
            <select
              id="selectLab"
              value={selectedLabForRequest}
              onChange={(e) => setSelectedLabForRequest(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              required
            >
              <option value="">-- Selecione um Laboratório --</option>
              {laboratories.map((lab) => (
                <option key={lab.id} value={lab.id}>
                  {lab.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="requestText" className="block text-gray-700 text-sm font-bold mb-2">
              Detalhes da Solicitação
            </label>
            <textarea
              id="requestText"
              value={requestText}
              onChange={(e) => setRequestText(e.target.value)}
              rows="6"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              placeholder="Descreva sua solicitação aqui..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 w-full"
          >
            Enviar Solicitação
          </button>
        </form>
      </section>
    </div>
  );
}