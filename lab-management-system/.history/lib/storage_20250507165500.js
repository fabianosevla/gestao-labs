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

// Funções utilitárias para manipulação de adminUsers
export const addAdminUser = async (userData) => {
    try {
        const id = await db.adminUsers.add(userData);
        console.log("Usuário administrador adicionado com ID:", id);
        return id;
    } catch (error) {
        console.error("Erro ao adicionar usuário administrador:", error);
        throw error;
    }
};

export const updateAdminUser = async (id, userData) => {
    try {
        const result = await db.adminUsers.update(id, userData);
        console.log("Usuário administrador atualizado:", result);
        return result;
    } catch (error) {
        console.error("Erro ao atualizar usuário administrador:", error);
        throw error;
    }
};

export const deleteAdminUser = async (id) => {
    try {
        const result = await db.adminUsers.delete(id);
        console.log("Usuário administrador deletado com ID:", id);
        return result;
    } catch (error) {
        console.error("Erro ao deletar usuário administrador:", error);
        throw error;
    }
};

// Funções utilitárias para manipulação de visitorUsers
export const addVisitorUser = async (userData) => {
    try {
        const id = await db.visitorUsers.add(userData);
        console.log("Usuário visitante adicionado com ID:", id);
        return id;
    } catch (error) {
        console.error("Erro ao adicionar usuário visitante:", error);
        throw error;
    }
};

export const updateVisitorUser = async (id, userData) => {
    try {
        const result = await db.visitorUsers.update(id, userData);
        console.log("Usuário visitante atualizado:", result);
        return result;
    } catch (error) {
        console.error("Erro ao atualizar usuário visitante:", error);
        throw error;
    }
};

export const deleteVisitorUser = async (id) => {
    try {
        const result = await db.visitorUsers.delete(id);
        console.log("Usuário visitante deletado com ID:", id);
        return result;
    } catch (error) {
        console.error("Erro ao deletar usuário visitante:", error);
        throw error;
    }
};

// Funções utilitárias para manipulação de laboratories
export const addLaboratory = async (labData) => {
    try {
        const id = await db.laboratories.add(labData);
        console.log("Laboratório adicionado com ID:", id);
        return id;
    } catch (error) {
        console.error("Erro ao adicionar laboratório:", error);
        throw error;
    }
};

export const updateLaboratory = async (id, labData) => {
    try {
        const result = await db.laboratories.update(id, labData);
        console.log("Laboratório atualizado com ID:", id);
        return result;
    } catch (error) {
        console.error("Erro ao atualizar laboratório:", error);
        throw error;
    }
};

export const deleteLaboratory = async (id) => {
    try {
        const result = await db.laboratories.delete(id);
        console.log("Laboratório deletado com ID:", id);
        return result;
    } catch (error) {
        console.error("Erro ao deletar laboratório:", error);
        throw error;
    }
};

// Funções utilitárias para manipulação de macroHardwares
export const addMacroHardware = async (hardwareData) => {
    try {
        const id = await db.macroHardwares.add(hardwareData);
        console.log("Macro hardware adicionado com ID:", id);
        return id;
    } catch (error) {
        console.error("Erro ao adicionar macro hardware:", error);
        throw error;
    }
};

export const updateMacroHardware = async (id, hardwareData) => {
    try {
        const result = await db.macroHardwares.update(id, hardwareData);
        console.log("Macro hardware atualizado:", result);
        return result;
    } catch (error) {
        console.error("Erro ao atualizar macro hardware:", error);
        throw error;
    }
};

export const deleteMacroHardware = async (id) => {
    try {
        const result = await db.macroHardwares.delete(id);
        console.log("Macro hardware deletado com ID:", id);
        return result;
    } catch (error) {
        console.error("Erro ao deletar macro hardware:", error);
        throw error;
    }
};

// Funções utilitárias para manipulação de microHardwares
export const addMicroHardware = async (hardwareData) => {
    try {
        const id = await db.microHardwares.add(hardwareData);
        console.log("Micro hardware adicionado com ID:", id);
        return id;
    } catch (error) {
        console.error("Erro ao adicionar micro hardware:", error);
        throw error;
    }
};

export const updateMicroHardware = async (id, hardwareData) => {
    try {
        const result = await db.microHardwares.update(id, hardwareData);
        console.log("Micro hardware atualizado:", result);
        return result;
    } catch (error) {
        console.error("Erro ao atualizar micro hardware:", error);
        throw error;
    }
};

export const deleteMicroHardware = async (id) => {
    try {
        const result = await db.microHardwares.delete(id);
        console.log("Micro hardware deletado com ID:", id);
        return result;
    } catch (error) {
        console.error("Erro ao deletar micro hardware:", error);
        throw error;
    }
};

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

    const refreshLaboratories = async () => {
        const data = await db.laboratories.toArray();
        setLaboratories(data);
    };

    return [laboratories, setLaboratories, loading, refreshLaboratories];
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

    const refreshAdminUsers = async () => {
        const data = await db.adminUsers.toArray();
        setAdminUsers(data);
    };

    return [adminUsers, setAdminUsers, loading, refreshAdminUsers];
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

    const refreshVisitorUsers = async () => {
        const data = await db.visitorUsers.toArray();
        setVisitorUsers(data);
    };

    return [visitorUsers, setVisitorUsers, loading, refreshVisitorUsers];
}

// Hook para Macro Hardwares
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
                console.error("Erro ao carregar macro hardwares:", error);
            } finally {
                setLoading(false);
            }
        };
        loadMacroHardwares();
    }, []);

    const refreshMacroHardwares = async () => {
        const data = await db.macroHardwares.toArray();
        setMacroHardwares(data);
    };

    return [macroHardwares, setMacroHardwares, loading, refreshMacroHardwares];
}

// Hook para Micro Hardwares
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
                console.error("Erro ao carregar micro hardwares:", error);
            } finally {
                setLoading(false);
            }
        };
        loadMicroHardwares();
    }, []);

    const refreshMicroHardwares = async () => {
        const data = await db.microHardwares.toArray();
        setMicroHardwares(data);
    };

    return [microHardwares, setMicroHardwares, loading, refreshMicroHardwares];
}

// Hook para Softwares
export const useSoftwares = () => {
    const [softwares, setSoftwares] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSoftwares = async () => {
            const sws = await db.softwares.toArray();
            setSoftwares(sws);
            setLoading(false);
        };
        fetchSoftwares();
    }, []);

    return [softwares, setSoftwares, loading, async () => {
        const sws = await db.softwares.toArray();
        setSoftwares(sws);
    }];
};

export const addSoftware = async (software) => {
    await db.softwares.add(software);
};

export const updateSoftware = async (id, software) => {
    await db.softwares.update(id, software);
};

export const deleteSoftware = async (id) => {
    await db.softwares.delete(id);
};