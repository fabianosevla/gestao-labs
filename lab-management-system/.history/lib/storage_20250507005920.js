import { useState, useEffect } from "react";
import Dexie from "dexie";

// Inicialização do banco de dados Dexie
const db = new Dexie("LabManagementDB");
db.version(1).stores({
    laboratories: "++id, name, location, responsible, capacity, status",
    macroHardwares: "++id, name, laboratoryId, user, status",
    microHardwares: "++id, name, laboratoryId, user, status",
    softwares: "++id, name, laboratoryId, user, status",
    adminUsers: "++id, name, email, status",
    visitorUsers: "++id, name, email, institution, visitDate, status",
});

// Hook para Laboratórios
export function useLaboratories() {
    const [laboratories, setLaboratories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadLaboratories = async () => {
            try {
                setLoading(true);
                const data = await db.laboratories.toArray();
                setLaboratories(data);
            } catch (error) {
                console.error("Erro ao carregar laboratórios:", error);
            } finally {
                setLoading(false);
            }
        };
        loadLaboratories();
    }, []);

    return [laboratories, setLaboratories, loading];
}

// Hook para Hardwares Macro
export function useMacroHardwares() {
    const [macroHardwares, setMacroHardwares] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadMacroHardwares = async () => {
            try {
                setLoading(true);
                const data = await db.macroHardwares.toArray();
                setMacroHardwares(data);
            } catch (error) {
                console.error("Erro ao carregar hardwares macro:", error);
            } finally {
                setLoading(false);
            }
        };
        loadMacroHardwares();
    }, []);

    return [macroHardwares, setMacroHardwares, loading];
}

// Hook para Hardwares Micro
export function useMicroHardwares() {
    const [microHardwares, setMicroHardwares] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadMicroHardwares = async () => {
            try {
                setLoading(true);
                const data = await db.microHardwares.toArray();
                setMicroHardwares(data);
            } catch (error) {
                console.error("Erro ao carregar hardwares micro:", error);
            } finally {
                setLoading(false);
            }
        };
        loadMicroHardwares();
    }, []);

    return [microHardwares, setMicroHardwares, loading];
}

// Hook para Softwares
export function useSoftwares() {
    const [softwares, setSoftwares] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadSoftwares = async () => {
            try {
                setLoading(true);
                const data = await db.softwares.toArray();
                setSoftwares(data);
            } catch (error) {
                console.error("Erro ao carregar softwares:", error);
            } finally {
                setLoading(false);
            }
        };
        loadSoftwares();
    }, []);

    return [softwares, setSoftwares, loading];
}

// Hook para Usuários Administradores
export function useAdminUsers() {
    const [adminUsers, setAdminUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadAdminUsers = async () => {
            try {
                setLoading(true);
                const data = await db.adminUsers.toArray();
                setAdminUsers(data);
            } catch (error) {
                console.error("Erro ao carregar usuários administradores:", error);
            } finally {
                setLoading(false);
            }
        };
        loadAdminUsers();
    }, []);

    return [adminUsers, setAdminUsers, loading];
}

// Hook para Usuários Visitantes
export function useVisitorUsers() {
    const [visitorUsers, setVisitorUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadVisitorUsers = async () => {
            try {
                setLoading(true);
                const data = await db.visitorUsers.toArray();
                setVisitorUsers(data);
            } catch (error) {
                console.error("Erro ao carregar usuários visitantes:", error);
            } finally {
                setLoading(false);
            }
        };
        loadVisitorUsers();
    }, []);

    return [visitorUsers, setVisitorUsers, loading];
}