"use client";

import { useState, useEffect } from "react";

export const useMicroHardwares = () => {
    const [microHardwares, setMicroHardwares] = useState(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("microHardwares");
            return saved ? JSON.parse(saved) : [];
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
            return saved ? JSON.parse(saved) : [];
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