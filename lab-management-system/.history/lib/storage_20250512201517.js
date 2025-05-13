"use client";

import { useState, useEffect } from "react";

// Exemplo de hook para macroHardwares
export function useMacroHardwares() {
    const [macroHardwares, setMacroHardwares] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulação de carregamento de dados (substitua por sua lógica real)
        const fetchData = async () => {
            try {
                const data = await fetch("/api/macroHardwares").then((res) => res.json());
                setMacroHardwares(data || []);
            } catch (error) {
                console.error("Erro ao carregar macroHardwares:", error);
                setMacroHardwares([]);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const refreshMacroHardwares = async () => {
        setLoading(true);
        const data = await fetch("/api/macroHardwares").then((res) => res.json());
        setMacroHardwares(data || []);
        setLoading(false);
    };

    return [macroHardwares, setMacroHardwares, loading, refreshMacroHardwares];
}

// Similar para microHardwares e softwares
export function useMicroHardwares() {
    const [microHardwares, setMicroHardwares] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetch("/api/microHardwares").then((res) => res.json());
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
        const data = await fetch("/api/microHardwares").then((res) => res.json());
        setMicroHardwares(data || []);
        setLoading(false);
    };

    return [microHardwares, setMicroHardwares, loading, refreshMicroHardwares];
}

export function useSoftwares() {
    const [softwares, setSoftwares] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetch("/api/softwares").then((res) => res.json());
                setSoftwares(data || []);
            } catch (error) {
                console.error("Erro ao carregar softwares:", error);
                setSoftwares([]);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const refreshSoftwares = async () => {
        setLoading(true);
        const data = await fetch("/api/softwares").then((res) => res.json());
        setSoftwares(data || []);
        setLoading(false);
    };

    return [softwares, setSoftwares, loading, refreshSoftwares];
}