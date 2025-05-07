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

export const useSoftwares = () => {
    const [softwares, setSoftwares] = useState(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("softwares");
            return saved ? JSON.parse(saved) : [];
        }
        return [];
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("softwares", JSON.stringify(softwares));
        }
    }, [softwares]);

    return [softwares, setSoftwares];
};

export const useAdminUsers = () => {
    const [adminUsers, setAdminUsers] = useState(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("adminUsers");
            return saved ? JSON.parse(saved) : [];
        }
        return [];
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("adminUsers", JSON.stringify(adminUsers));
        }
    }, [adminUsers]);

    return [adminUsers, setAdminUsers];
};

export const useVisitorUsers = () => {
    const [visitorUsers, setVisitorUsers] = useState(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("visitorUsers");
            return saved ? JSON.parse(saved) : [];
        }
        return [];
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("visitorUsers", JSON.stringify(visitorUsers));
        }
    }, [visitorUsers]);

    return [visitorUsers, setVisitorUsers];
};

export const useLaboratories = () => {
    const [laboratories, setLaboratories] = useState(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("laboratories");
            return saved ? JSON.parse(saved) : [];
        }
        return [];
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("laboratories", JSON.stringify(laboratories));
        }
    }, [laboratories]);

    return [laboratories, setLaboratories];
};