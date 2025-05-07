"use client";

import { useState, useEffect } from "react";
import Dexie from "dexie";

// Inicializar o banco de dados Dexie
const db = new Dexie("LabManagementDB");

// Definir o esquema do banco de dados
db.version(1).stores({
    microHardwares: "++id, name, type, manufacturer, serialNumber, acquisitionDate, status",
    macroHardwares: "++id, name, type, manufacturer, serialNumber, acquisitionDate, status",
    softwares: "++id, name, version, manufacturer, license, acquisitionDate, status",
    adminUsers: "++id, name, email, password, registerDate, status",
    visitorUsers: "++id, name, email, institution, visitDate, status",
    laboratories: "++id, name, location, responsible, status",
});

// Hook para MicroHardwares
export const useMicroHardwares = () => {
    const [microHardwares, setMicroHardwares] = useState([]);

    useEffect(() => {
        // Carregar dados do IndexedDB ao montar o componente
        db.microHardwares.toArray().then((data) => {
            setMicroHardwares(data);
        });
    }, []);

    const updateMicroHardwares = async (newData) => {
        // Atualizar o estado local
        setMicroHardwares(newData);
        // Limpar a tabela e inserir os novos dados
        await db.microHardwares.clear();
        await db.microHardwares.bulkPut(newData);
    };

    return [microHardwares, updateMicroHardwares];
};

// Hook para MacroHardwares
export const useMacroHardwares = () => {
    const [macroHardwares, setMacroHardwares] = useState([]);

    useEffect(() => {
        db.macroHardwares.toArray().then((data) => {
            setMacroHardwares(data);
        });
    }, []);

    const updateMacroHardwares = async (newData) => {
        setMacroHardwares(newData);
        await db.macroHardwares.clear();
        await db.macroHardwares.bulkPut(newData);
    };

    return [macroHardwares, updateMacroHardwares];
};

// Hook para Softwares
export const useSoftwares = () => {
    const [softwares, setSoftwares] = useState([]);

    useEffect(() => {
        db.softwares.toArray().then((data) => {
            setSoftwares(data);
        });
    }, []);

    const updateSoftwares = async (newData) => {
        setSoftwares(newData);
        await db.softwares.clear();
        await db.softwares.bulkPut(newData);
    };

    return [softwares, updateSoftwares];
};

// Hook para AdminUsers
export const useAdminUsers = () => {
    const [adminUsers, setAdminUsers] = useState([]);

    useEffect(() => {
        db.adminUsers.toArray().then((data) => {
            setAdminUsers(data);
        });
    }, []);

    const updateAdminUsers = async (newData) => {
        setAdminUsers(newData);
        await db.adminUsers.clear();
        await db.adminUsers.bulkPut(newData);
    };

    return [adminUsers, updateAdminUsers];
};

// Hook para VisitorUsers
export const useVisitorUsers = () => {
    const [visitorUsers, setVisitorUsers] = useState([]);

    useEffect(() => {
        db.visitorUsers.toArray().then((data) => {
            setVisitorUsers(data);
        });
    }, []);

    const updateVisitorUsers = async (newData) => {
        setVisitorUsers(newData);
        await db.visitorUsers.clear();
        await db.visitorUsers.bulkPut(newData);
    };

    return [visitorUsers, updateVisitorUsers];
};

// Hook para Laboratories
export const useLaboratories = () => {
    const [laboratories, setLaboratories] = useState([]);

    useEffect(() => {
        db.laboratories.toArray().then((data) => {
            setLaboratories(data);
        });
    }, []);

    const updateLaboratories = async (newData) => {
        setLaboratories(newData);
        await db.laboratories.clear();
        await db.laboratories.bulkPut(newData);
    };

    return [laboratories, updateLaboratories];
};