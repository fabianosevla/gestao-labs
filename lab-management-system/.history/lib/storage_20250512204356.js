"use client";

import { useState, useEffect } from "react";

// Hook para gerenciar micro hardwares
export function useMicroHardwares() {
    const [microHardwares, setMicroHardwares] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/microHardwares");
                const data = await response.json();
                setMicroHardwares(data || []);
            } catch (error) {
                console.error("Erro ao carregar microHardwares:", error);
                setMicroHardwares([]);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const refreshMicroHardwares = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/microHardwares");
            const data = await response.json();
            setMicroHardwares(data || []);
        } catch (error) {
            console.error("Erro ao atualizar microHardwares:", error);
            setMicroHardwares([]);
        } finally {
            setLoading(false);
        }
    };

    return [microHardwares, setMicroHardwares, loading, refreshMicroHardwares];
}

// Função para deletar um micro hardware
export async function deleteMicroHardware(id) {
    try {
        const response = await fetch(`/api/microHardwares/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) throw new Error("Erro ao deletar micro hardware");
        return true;
    } catch (error) {
        console.error("Erro ao deletar microHardware:", error);
        return false;
    }
}

// Hook para gerenciar laboratórios
export function useLaboratories() {
    const [laboratories, setLaboratories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/laboratories");
                const data = await response.json();
                setLaboratories(data || []);
            } catch (error) {
                console.error("Erro ao carregar laboratórios:", error);
                setLaboratories([]);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return [laboratories, setLaboratories, loading];
}

// Hook para gerenciar usuários admin
export function useAdminUsers() {
    const [adminUsers, setAdminUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/adminUsers");
                const data = await response.json();
                setAdminUsers(data || []);
            } catch (error) {
                console.error("Erro ao carregar admin users:", error);
                setAdminUsers([]);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return [adminUsers, setAdminUsers, loading];
}

// Hook para gerenciar usuários visitantes
export function useVisitorUsers() {
    const [visitorUsers, setVisitorUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/visitorUsers");
                const data = await response.json();
                setVisitorUsers(data || []);
            } catch (error) {
                console.error("Erro ao carregar visitor users:", error);
                setVisitorUsers([]);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return [visitorUsers, setVisitorUsers, loading];
}