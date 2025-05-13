"use client";

import { useState, useEffect } from "react";

// Exemplo de hook para macroHardwares
export function useMacroHardwares() {
    const [macroHardwares, setMacroHardwares] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("Carregando macroHardwares");
        const fetchData = async () => {
            try {
                const response = await fetch("/api/macroHardwares");
                const data = await response.json();
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
        try {
            const response = await fetch("/api/macroHardwares");
            const data = await response.json();
            setMacroHardwares(data || []);
        } catch (error) {
            console.error("Erro ao atualizar macroHardwares:", error);
            setMacroHardwares([]);
        } finally {
            setLoading(false);
        }
    };

    return [macroHardwares, setMacroHardwares, loading, refreshMacroHardwares];
}

// Similar para microHardwares
export function useMicroHardwares() {
    const [microHardwares, setMicroHardwares] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("Carregando microHardwares");
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

// Similar para softwares
export function useSoftwares() {
    const [softwares, setSoftwares] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("Carregando softwares");
        const fetchData = async () => {
            try {
                const response = await fetch("/api/softwares");
                const data = await response.json();
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
        try {
            const response = await fetch("/api/softwares");
            const data = await response.json();
            setSoftwares(data || []);
        } catch (error) {
            console.error("Erro ao atualizar softwares:", error);
            setSoftwares([]);
        } finally {
            setLoading(false);
        }
    };

    return [softwares, setSoftwares, loading, refreshSoftwares];
}