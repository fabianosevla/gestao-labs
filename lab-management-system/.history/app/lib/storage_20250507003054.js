import { useState, useEffect } from "react";
import Dexie from "dexie";

// Inicialização do banco de dados Dexie
const db = new Dexie("LabManagementDB");
db.version(1).stores({
    laboratories: "++id, name, location, responsibleId, capacity, status",
    macroHardwares: "++id, name, laboratoryId, userId, status",
    microHardwares: "++id, name, laboratoryId, userId, status",
    softwares: "++id, name, laboratoryId, userId, status",
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
                if (data.length === 0) {
                    const initialData = [
                        { name: "Lab 1", location: "Prédio A, Sala 101", capacity: 20, status: "ativo" },
                        { name: "Lab 2", location: "Prédio B, Sala 202", capacity: 15, status: "inativo" },
                    ];
                    await db.laboratories.bulkAdd(initialData);
                    setLaboratories(initialData);
                } else {
                    setLaboratories(data);
                }
            } catch (error) {
                console.error("Erro ao carregar laboratórios:", error);
            } finally {
                setLoading(false);
            }
        };
        loadLaboratories();
    }, []);

    const updateLaboratories = async (updatedData) => {
        await db.laboratories.clear();
        await db.laboratories.bulkAdd(updatedData);
        setLaboratories(updatedData);
    };

    return [laboratories, setLaboratories, loading, updateLaboratories];
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
                if (data.length === 0) {
                    const initialData = [
                        { name: "Servidor X", laboratoryId: 1, status: "ativo" },
                        { name: "Máquina Y", laboratoryId: 2, status: "inativo" },
                    ];
                    await db.macroHardwares.bulkAdd(initialData);
                    setMacroHardwares(initialData);
                } else {
                    setMacroHardwares(data);
                }
            } catch (error) {
                console.error("Erro ao carregar hardwares macro:", error);
            } finally {
                setLoading(false);
            }
        };
        loadMacroHardwares();
    }, []);

    const updateMacroHardwares = async (updatedData) => {
        await db.macroHardwares.clear();
        await db.macroHardwares.bulkAdd(updatedData);
        setMacroHardwares(updatedData);
    };

    return [macroHardwares, setMacroHardwares, loading, updateMacroHardwares];
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
                if (data.length === 0) {
                    const initialData = [
                        { name: "Microscópio Z", laboratoryId: 1, status: "ativo" },
                        { name: "Sensor W", laboratoryId: 2, status: "inativo" },
                    ];
                    await db.microHardwares.bulkAdd(initialData);
                    setMicroHardwares(initialData);
                } else {
                    setMicroHardwares(data);
                }
            } catch (error) {
                console.error("Erro ao carregar hardwares micro:", error);
            } finally {
                setLoading(false);
            }
        };
        loadMicroHardwares();
    }, []);

    const updateMicroHardwares = async (updatedData) => {
        await db.microHardwares.clear();
        await db.microHardwares.bulkAdd(updatedData);
        setMicroHardwares(updatedData);
    };

    return [microHardwares, setMicroHardwares, loading, updateMicroHardwares];
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
                if (data.length === 0) {
                    const initialData = [
                        { name: "Software A", laboratoryId: 1, status: "ativo" },
                        { name: "Software B", laboratoryId: 2, status: "inativo" },
                    ];
                    await db.softwares.bulkAdd(initialData);
                    setSoftwares(initialData);
                } else {
                    setSoftwares(data);
                }
            } catch (error) {
                console.error("Erro ao carregar softwares:", error);
            } finally {
                setLoading(false);
            }
        };
        loadSoftwares();
    }, []);

    const updateSoftwares = async (updatedData) => {
        await db.softwares.clear();
        await db.softwares.bulkAdd(updatedData);
        setSoftwares(updatedData);
    };

    return [softwares, setSoftwares, loading, updateSoftwares];
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
                console.log("Usuários administradores carregados:", data);
                setAdminUsers(data);
            } catch (error) {
                console.error("Erro ao carregar usuários administradores:", error);
            } finally {
                setLoading(false);
            }
        };
        loadAdminUsers();
    }, []);

    const updateAdminUsers = async (updatedData) => {
        try {
            await db.adminUsers.clear();
            await db.adminUsers.bulkAdd(updatedData);
            setAdminUsers(updatedData);
            console.log("Usuários administradores atualizados:", updatedData);
        } catch (error) {
            console.error("Erro ao atualizar usuários administradores:", error);
        }
    };

    return [adminUsers, setAdminUsers, loading, updateAdminUsers];
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
                if (data.length === 0) {
                    const initialData = [
                        { name: "Visitante 1", email: "visit1@lab.com", institution: "Uni A", visitDate: "2025-05-01", status: "ativo" },
                        { name: "Visitante 2", email: "visit2@lab.com", institution: "Uni B", visitDate: "2025-05-02", status: "inativo" },
                    ];
                    await db.visitorUsers.bulkAdd(initialData);
                    setVisitorUsers(initialData);
                } else {
                    setVisitorUsers(data);
                }
            } catch (error) {
                console.error("Erro ao carregar usuários visitantes:", error);
            } finally {
                setLoading(false);
            }
        };
        loadVisitorUsers();
    }, []);

    const updateVisitorUsers = async (updatedData) => {
        await db.visitorUsers.clear();
        await db.visitorUsers.bulkAdd(updatedData);
        setVisitorUsers(updatedData);
    };

    return [visitorUsers, setVisitorUsers, loading, updateVisitorUsers];
}