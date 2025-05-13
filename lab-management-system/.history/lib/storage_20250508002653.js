import { useState, useEffect } from "react";

// Função para abrir e/ou criar o banco de dados IndexedDB
const openDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("UserAppDB", 1);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            // Criar object stores se não existirem
            if (!db.objectStoreNames.contains("laboratories")) {
                db.createObjectStore("laboratories", { keyPath: "id", autoIncrement: true });
            }
            if (!db.objectStoreNames.contains("adminUsers")) {
                db.createObjectStore("adminUsers", { keyPath: "id", autoIncrement: true });
            }
            if (!db.objectStoreNames.contains("visitorUsers")) {
                db.createObjectStore("visitorUsers", { keyPath: "id", autoIncrement: true });
            }
            if (!db.objectStoreNames.contains("macroHardwares")) {
                db.createObjectStore("macroHardwares", { keyPath: "id", autoIncrement: true });
            }
            if (!db.objectStoreNames.contains("microHardwares")) {
                db.createObjectStore("microHardwares", { keyPath: "id", autoIncrement: true });
            }
            if (!db.objectStoreNames.contains("softwares")) {
                db.createObjectStore("softwares", { keyPath: "id", autoIncrement: true });
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};

// Função para obter todos os registros de um object store
const getAllFromDB = (db, storeName) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([storeName], "readonly");
        const objectStore = transaction.objectStore(storeName);
        const request = objectStore.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};

// Função para adicionar ou atualizar um registro
const putInDB = (db, storeName, data) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([storeName], "readwrite");
        const objectStore = transaction.objectStore(storeName);
        const request = objectStore.put(data);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
};

// Função para deletar um registro
const deleteFromDB = (db, storeName, key) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([storeName], "readwrite");
        const objectStore = transaction.objectStore(storeName);
        const request = objectStore.delete(key);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
};

// Hook para gerenciar laboratórios
export function useLaboratories() {
    const [laboratories, setLaboratories] = useState([]);
    const [loading, setLoading] = useState(false);

    const refreshLaboratories = async () => {
        setLoading(true);
        try {
            const db = await openDB();
            const data = await getAllFromDB(db, "laboratories");
            setLaboratories(data);
        } catch (error) {
            console.error("Erro ao carregar laboratórios:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshLaboratories();
    }, []);

    return [laboratories, setLaboratories, loading, refreshLaboratories];
}

// Funções para manipular laboratórios
export async function addLaboratory(laboratory) {
    const db = await openDB();
    await putInDB(db, "laboratories", laboratory);
}

export async function updateLaboratory(id, updatedLaboratory) {
    const db = await openDB();
    await putInDB(db, "laboratories", { ...updatedLaboratory, id });
}

export async function deleteLaboratory(id) {
    const db = await openDB();
    await deleteFromDB(db, "laboratories", id);
}

// Hook para gerenciar usuários admin
export function useAdminUsers() {
    const [adminUsers, setAdminUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const refreshAdminUsers = async () => {
        setLoading(true);
        try {
            const db = await openDB();
            const data = await getAllFromDB(db, "adminUsers");
            setAdminUsers(data);
        } catch (error) {
            console.error("Erro ao carregar usuários admin:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshAdminUsers();
    }, []);

    return [adminUsers, setAdminUsers, loading, refreshAdminUsers];
}

// Funções para manipular usuários admin
export async function addAdminUser(user) {
    const db = await openDB();
    await putInDB(db, "adminUsers", user);
}

export async function updateAdminUser(id, updatedUser) {
    const db = await openDB();
    await putInDB(db, "adminUsers", { ...updatedUser, id });
}

export async function deleteAdminUser(id) {
    const db = await openDB();

    // Deletar o usuário
    await deleteFromDB(db, "adminUsers", id);

    // Atualizar referências em outros object stores
    const laboratories = await getAllFromDB(db, "laboratories");
    const updatedLaboratories = laboratories.map(lab =>
        lab.userId === id ? { ...lab, userId: null } : lab
    );
    updatedLaboratories.forEach(lab => putInDB(db, "laboratories", lab));

    const macroHardwares = await getAllFromDB(db, "macroHardwares");
    const updatedMacroHardwares = macroHardwares.map(hw =>
        hw.userId === `admin-${id}` ? { ...hw, userId: null } : hw
    );
    updatedMacroHardwares.forEach(hw => putInDB(db, "macroHardwares", hw));

    const microHardwares = await getAllFromDB(db, "microHardwares");
    const updatedMicroHardwares = microHardwares.map(hw =>
        hw.userId === id ? { ...hw, userId: null } : hw
    );
    updatedMicroHardwares.forEach(hw => putInDB(db, "microHardwares", hw));

    const softwares = await getAllFromDB(db, "softwares");
    const updatedSoftwares = softwares.map(sw =>
        sw.userId === id ? { ...sw, userId: null } : sw
    );
    updatedSoftwares.forEach(sw => putInDB(db, "softwares", sw));
}

// Hook para gerenciar usuários visitantes
export function useVisitorUsers() {
    const [visitorUsers, setVisitorUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const refreshVisitorUsers = async () => {
        setLoading(true);
        try {
            const db = await openDB();
            const data = await getAllFromDB(db, "visitorUsers");
            setVisitorUsers(data);
        } catch (error) {
            console.error("Erro ao carregar usuários visitantes:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshVisitorUsers();
    }, []);

    return [visitorUsers, setVisitorUsers, loading, refreshVisitorUsers];
}

// Funções para manipular usuários visitantes
export async function addVisitorUser(user) {
    const db = await openDB();
    await putInDB(db, "visitorUsers", user);
}

export async function updateVisitorUser(id, updatedUser) {
    const db = await openDB();
    await putInDB(db, "visitorUsers", { ...updatedUser, id });
}

export async function deleteVisitorUser(id) {
    const db = await openDB();

    // Deletar o usuário
    await deleteFromDB(db, "visitorUsers", id);

    // Atualizar referências em outros object stores
    const laboratories = await getAllFromDB(db, "laboratories");
    const updatedLaboratories = laboratories.map(lab =>
        lab.userId === id ? { ...lab, userId: null } : lab
    );
    updatedLaboratories.forEach(lab => putInDB(db, "laboratories", lab));

    const macroHardwares = await getAllFromDB(db, "macroHardwares");
    const updatedMacroHardwares = macroHardwares.map(hw =>
        hw.userId === `visitor-${id}` ? { ...hw, userId: null } : hw
    );
    updatedMacroHardwares.forEach(hw => putInDB(db, "macroHardwares", hw));

    const microHardwares = await getAllFromDB(db, "microHardwares");
    const updatedMicroHardwares = microHardwares.map(hw =>
        hw.userId === id ? { ...hw, userId: null } : hw
    );
    updatedMicroHardwares.forEach(hw => putInDB(db, "microHardwares", hw));

    const softwares = await getAllFromDB(db, "softwares");
    const updatedSoftwares = softwares.map(sw =>
        sw.userId === id ? { ...sw, userId: null } : sw
    );
    updatedSoftwares.forEach(sw => putInDB(db, "softwares", sw));
}

// Hook para gerenciar hardwares macro
export function useMacroHardwares() {
    const [macroHardwares, setMacroHardwares] = useState([]);
    const [loading, setLoading] = useState(false);

    const refreshMacroHardwares = async () => {
        setLoading(true);
        try {
            const db = await openDB();
            const data = await getAllFromDB(db, "macroHardwares");
            setMacroHardwares(data);
        } catch (error) {
            console.error("Erro ao carregar hardwares macro:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshMacroHardwares();
    }, []);

    return [macroHardwares, setMacroHardwares, loading, refreshMacroHardwares];
}

// Funções para manipular hardwares macro
export async function addMacroHardware(hardware) {
    const db = await openDB();
    await putInDB(db, "macroHardwares", hardware);
}

export async function updateMacroHardware(id, updatedHardware) {
    const db = await openDB();
    await putInDB(db, "macroHardwares", { ...updatedHardware, id });
}

export async function deleteMacroHardware(id) {
    const db = await openDB();
    await deleteFromDB(db, "macroHardwares", id);
}

// Hook para gerenciar hardwares micro
export function useMicroHardwares() {
    const [microHardwares, setMicroHardwares] = useState([]);
    const [loading, setLoading] = useState(false);

    const refreshMicroHardwares = async () => {
        setLoading(true);
        try {
            const db = await openDB();
            const data = await getAllFromDB(db, "microHardwares");
            setMicroHardwares(data);
        } catch (error) {
            console.error("Erro ao carregar hardwares micro:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshMicroHardwares();
    }, []);

    return [microHardwares, setMicroHardwares, loading, refreshMicroHardwares];
}

// Funções para manipular hardwares micro
export async function addMicroHardware(hardware) {
    const db = await openDB();
    await putInDB(db, "microHardwares", hardware);
}

export async function updateMicroHardware(id, updatedHardware) {
    const db = await openDB();
    await putInDB(db, "microHardwares", { ...updatedHardware, id });
}

export async function deleteMicroHardware(id) {
    const db = await openDB();
    await deleteFromDB(db, "microHardwares", id);
}

// Hook para gerenciar softwares
export function useSoftwares() {
    const [softwares, setSoftwares] = useState([]);
    const [loading, setLoading] = useState(false);

    const refreshSoftwares = async () => {
        setLoading(true);
        try {
            const db = await openDB();
            const data = await getAllFromDB(db, "softwares");
            setSoftwares(data);
        } catch (error) {
            console.error("Erro ao carregar softwares:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshSoftwares();
    }, []);

    return [softwares, setSoftwares, loading, refreshSoftwares];
}

// Funções para manipular softwares
export async function addSoftware(software) {
    const db = await openDB();
    await putInDB(db, "softwares", software);
}

export async function updateSoftware(id, updatedSoftware) {
    const db = await openDB();
    await putInDB(db, "softwares", { ...updatedSoftware, id });
}

export async function deleteSoftware(id) {
    const db = await openDB();
    await deleteFromDB(db, "softwares", id);
}