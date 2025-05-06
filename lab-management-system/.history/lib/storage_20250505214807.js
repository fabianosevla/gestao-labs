"use client";

import { useState, useEffect } from "react";

export const useMicroHardwares = () => {
    const [microHardwares, setMicroHardwares] = useState(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("microHardwares");
            return saved ? JSON.parse(saved) : [
                { id: 1, name: "Micro 01", type: "Resistor", value: "10kΩ", quantity: 50, manufacturer: "Vishay", acquisitionDate: "2023-05-10", status: "Ativo" },
                { id: 2, name: "Micro 02", type: "Capacitor", value: "100µF", quantity: 30, manufacturer: "Murata", acquisitionDate: "2023-06-15", status: "Inativo" },
            ];
        }
        return [];
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("microHardwares", JSON.stringify(microHardwares));
        }
    }, [microHardwares]);

    return [microHardwares, setMicroHardwares];
};

export const useMacroHardwares = () => {
    const [macroHardwares, setMacroHardwares] = useState(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("macroHardwares");
            return saved ? JSON.parse(saved) : [
                { id: 1, name: "Macro 01", brand: "Dell", model: "OptiPlex 7050", serialNumber: "ABC123", processor: "Intel i7", ram: "16GB", storage: "512GB SSD", acquisitionDate: "2023-05-10", status: "Ativo" },
                { id: 2, name: "Macro 02", brand: "HP", model: "EliteDesk 800", serialNumber: "XYZ789", processor: "Intel i5", ram: "8GB", storage: "256GB SSD", acquisitionDate: "2023-06-15", status: "Inativo" },
            ];
        }
        return [];
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("macroHardwares", JSON.stringify(macroHardwares));
        }
    }, [macroHardwares]);

    return [macroHardwares, setMacroHardwares];
};