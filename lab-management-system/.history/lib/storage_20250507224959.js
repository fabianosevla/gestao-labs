import { useState, useEffect } from "react";

// Hook para gerenciar laboratórios
export function useLaboratories() {
    const [laboratories, setLaboratories] = useState(laboratoriesData);
    const [loading, setLoading] = useState(false);

    const refreshLaboratories = async () => {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 500));
        setLaboratories([...laboratoriesData]);
        setLoading(false);
    };

    useEffect(() => {
        refreshLaboratories();
    }, []);

    return [laboratories, setLaboratories, loading, refreshLaboratories];
}

// Funções para manipular laboratórios
export async function addLaboratory(laboratory) {
    const newId = laboratoriesData.length > 0 ? Math.max(...laboratoriesData.map(l => l.id)) + 1 : 1;
    const newLaboratory = { ...laboratory, id: newId };
    laboratoriesData.push(newLaboratory);
}

export async function updateLaboratory(id, updatedLaboratory) {
    const index = laboratoriesData.findIndex(l => l.id === id);
    if (index !== -1) {
        laboratoriesData[index] = { ...laboratoriesData[index], ...updatedLaboratory, id };
    }
}

export async function deleteLaboratory(id) {
    laboratoriesData = laboratoriesData.filter(l => l.id !== id);
}

// Hook para gerenciar usuários admin
export function useAdminUsers() {
    const [adminUsers, setAdminUsers] = useState(adminUsersData);
    const [loading, setLoading] = useState(false);

    const refreshAdminUsers = async () => {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 500));
        setAdminUsers([...adminUsersData]);
        setLoading(false);
    };

    useEffect(() => {
        refreshAdminUsers();
    }, []);

    return [adminUsers, setAdminUsers, loading, refreshAdminUsers];
}

// Função para adicionar usuários admin
export async function addAdminUser(user) {
    const newId = adminUsersData.length > 0 ? Math.max(...adminUsersData.map(u => u.id)) + 1 : 1;
    const newUser = { ...user, id: newId };
    adminUsersData.push(newUser);
}

// Função para atualizar usuários admin
export async function updateAdminUser(id, updatedUser) {
    const index = adminUsersData.findIndex(u => u.id === id);
    if (index !== -1) {
        adminUsersData[index] = { ...adminUsersData[index], ...updatedUser, id };
    }
}

// Função para excluir usuários admin
export async function deleteAdminUser(id) {
    adminUsersData = adminUsersData.filter(u => u.id !== id);
    laboratoriesData = laboratoriesData.map(lab =>
        lab.userId === id ? { ...lab, userId: null } : lab
    );
    macroHardwaresData = macroHardwaresData.map(hw =>
        hw.userId === `admin-${id}` ? { ...hw, userId: null } : hw
    );
    microHardwaresData = microHardwaresData.map(hw =>
        hw.userId === id ? { ...hw, userId: null } : hw
    );
    softwaresData = softwaresData.map(sw =>
        sw.userId === id ? { ...sw, userId: null } : sw
    );
}

// Hook para gerenciar usuários visitantes
export function useVisitorUsers() {
    const [visitorUsers, setVisitorUsers] = useState(visitorUsersData);
    const [loading, setLoading] = useState(false);

    const refreshVisitorUsers = async () => {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 500));
        setVisitorUsers([...visitorUsersData]);
        setLoading(false);
    };

    useEffect(() => {
        refreshVisitorUsers();
    }, []);

    return [visitorUsers, setVisitorUsers, loading, refreshVisitorUsers];
}

// Função para adicionar usuários visitantes
export async function addVisitorUser(user) {
    const newId = visitorUsersData.length > 0 ? Math.max(...visitorUsersData.map(u => u.id)) + 1 : 1;
    const newUser = { ...user, id: newId };
    visitorUsersData.push(newUser);
}

// Função para atualizar usuários visitantes
export async function updateVisitorUser(id, updatedUser) {
    const index = visitorUsersData.findIndex(u => u.id === id);
    if (index !== -1) {
        visitorUsersData[index] = { ...visitorUsersData[index], ...updatedUser, id };
    }
}

// Função para excluir usuários visitantes
export async function deleteVisitorUser(id) {
    visitorUsersData = visitorUsersData.filter(u => u.id !== id);
    laboratoriesData = laboratoriesData.map(lab =>
        lab.userId === id ? { ...lab, userId: null } : lab
    );
    macroHardwaresData = macroHardwaresData.map(hw =>
        hw.userId === `visitor-${id}` ? { ...hw, userId: null } : hw
    );
    microHardwaresData = microHardwaresData.map(hw =>
        hw.userId === id ? { ...hw, userId: null } : hw
    );
    softwaresData = softwaresData.map(sw =>
        sw.userId === id ? { ...sw, userId: null } : sw
    );
}

// Hook para gerenciar hardwares macro
export function useMacroHardwares() {
    const [macroHardwares, setMacroHardwares] = useState(macroHardwaresData);
    const [loading, setLoading] = useState(false);

    const refreshMacroHardwares = async () => {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 500));
        setMacroHardwares([...macroHardwaresData]);
        setLoading(false);
    };

    useEffect(() => {
        refreshMacroHardwares();
    }, []);

    return [macroHardwares, setMacroHardwares, loading, refreshMacroHardwares];
}

export async function addMacroHardware(hardware) {
    const newId = macroHardwaresData.length > 0 ? Math.max(...macroHardwaresData.map(h => h.id)) + 1 : 1;
    const newHardware = { ...hardware, id: newId };
    macroHardwaresData.push(newHardware);
}

export async function updateMacroHardware(id, updatedHardware) {
    const index = macroHardwaresData.findIndex(h => h.id === id);
    if (index !== -1) {
        macroHardwaresData[index] = { ...macroHardwaresData[index], ...updatedHardware, id };
    }
}

export async function deleteMacroHardware(id) {
    macroHardwaresData = macroHardwaresData.filter(h => h.id !== id);
}

// Hook para gerenciar hardwares micro
export function useMicroHardwares() {
    const [microHardwares, setMicroHardwares] = useState(microHardwaresData);
    const [loading, setLoading] = useState(false);

    const refreshMicroHardwares = async () => {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 500));
        setMicroHardwares([...microHardwaresData]);
        setLoading(false);
    };

    useEffect(() => {
        refreshMicroHardwares();
    }, []);

    return [microHardwares, setMicroHardwares, loading, refreshMicroHardwares];
}

export async function addMicroHardware(hardware) {
    const newId = microHardwaresData.length > 0 ? Math.max(...microHardwaresData.map(h => h.id)) + 1 : 1;
    const newHardware = { ...hardware, id: newId };
    microHardwaresData.push(newHardware);
}

export async function updateMicroHardware(id, updatedHardware) {
    const index = microHardwaresData.findIndex(h => h.id === id);
    if (index !== -1) {
        microHardwaresData[index] = { ...microHardwaresData[index], ...updatedHardware, id };
    }
}

export async function deleteMicroHardware(id) {
    microHardwaresData = microHardwaresData.filter(h => h.id !== id);
}

// Hook para gerenciar softwares
export function useSoftwares() {
    const [softwares, setSoftwares] = useState(softwaresData);
    const [loading, setLoading] = useState(false);

    const refreshSoftwares = async () => {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 500));
        setSoftwares([...softwaresData]);
        setLoading(false);
    };

    useEffect(() => {
        refreshSoftwares();
    }, []);

    return [softwares, setSoftwares, loading, refreshSoftwares];
}

export async function addSoftware(software) {
    const newId = softwaresData.length > 0 ? Math.max(...softwaresData.map(s => s.id)) + 1 : 1;
    const newSoftware = { ...software, id: newId };
    softwaresData.push(newSoftware);
}

export async function updateSoftware(id, updatedSoftware) {
    const index = softwaresData.findIndex(s => s.id === id);
    if (index !== -1) {
        softwaresData[index] = { ...softwaresData[index], ...updatedSoftware, id };
    }
}

export async function deleteSoftware(id) {
    softwaresData = softwaresData.filter(s => s.id !== id);
}