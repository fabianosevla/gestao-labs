"use client";

import { useState, useEffect } from "react";

// Micro Hardwares
export function useMicroHardwares() {
    const [microHardwares, setMicroHardwares] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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

export async function addMicroHardware(data, refreshMicroHardwares) {
    try {
        const response = await fetch("/api/microHardwares", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error("Erro ao adicionar micro hardware");
        const newHardware = await response.json();
        if (newHardware && refreshMicroHardwares) {
            await refreshMicroHardwares();
        }
        return newHardware;
    } catch (error) {
        console.error("Erro ao adicionar microHardware:", error);
        return null;
    }
}

export async function updateMicroHardware(id, data, refreshMicroHardwares) {
    try {
        const response = await fetch(`/api/microHardwares/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error("Erro ao atualizar micro hardware");
        const updatedHardware = await response.json();
        if (updatedHardware && refreshMicroHardwares) {
            await refreshMicroHardwares();
        }
        return updatedHardware;
    } catch (error) {
        console.error("Erro ao atualizar microHardware:", error);
        return null;
    }
}

export async function deleteMicroHardware(id, refreshMicroHardwares) {
    try {
        const response = await fetch(`/api/microHardwares/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) throw new Error("Erro ao deletar micro hardware");
        const success = response.ok;
        if (success && refreshMicroHardwares) {
            await refreshMicroHardwares();
        }
        return success;
    } catch (error) {
        console.error("Erro ao deletar microHardware:", error);
        return false;
    }
}

// Macro Hardwares
export function useMacroHardwares() {
    const [macroHardwares, setMacroHardwares] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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

export async function addMacroHardware(data, refreshMacroHardwares) {
    try {
        const response = await fetch("/api/macroHardwares", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error("Erro ao adicionar macro hardware");
        const newHardware = await response.json();
        if (newHardware && refreshMacroHardwares) {
            await refreshMacroHardwares();
        }
        return newHardware;
    } catch (error) {
        console.error("Erro ao adicionar macroHardware:", error);
        return null;
    }
}

export async function updateMacroHardware(id, data, refreshMacroHardwares) {
    try {
        const response = await fetch(`/api/macroHardwares/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error("Erro ao atualizar macro hardware");
        const updatedHardware = await response.json();
        if (updatedHardware && refreshMacroHardwares) {
            await refreshMacroHardwares();
        }
        return updatedHardware;
    } catch (error) {
        console.error("Erro ao atualizar macroHardware:", error);
        return null;
    }
}

export async function deleteMacroHardware(id, refreshMacroHardwares) {
    try {
        const response = await fetch(`/api/macroHardwares/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) throw new Error("Erro ao deletar macro hardware");
        const success = response.ok;
        if (success && refreshMacroHardwares) {
            await refreshMacroHardwares();
        }
        return success;
    } catch (error) {
        console.error("Erro ao deletar macroHardware:", error);
        return false;
    }
}

// Softwares
export function useSoftwares() {
    const [softwares, setSoftwares] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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

export async function addSoftware(data, refreshSoftwares) {
    try {
        const response = await fetch("/api/softwares", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error("Erro ao adicionar software");
        const newSoftware = await response.json();
        if (newSoftware && refreshSoftwares) {
            await refreshSoftwares();
        }
        return newSoftware;
    } catch (error) {
        console.error("Erro ao adicionar software:", error);
        return null;
    }
}

export async function updateSoftware(id, data, refreshSoftwares) {
    try {
        const response = await fetch(`/api/softwares/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error("Erro ao atualizar software");
        const updatedSoftware = await response.json();
        if (updatedSoftware && refreshSoftwares) {
            await refreshSoftwares();
        }
        return updatedSoftware;
    } catch (error) {
        console.error("Erro ao atualizar software:", error);
        return null;
    }
}

export async function deleteSoftware(id, refreshSoftwares) {
    try {
        const response = await fetch(`/api/softwares/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) throw new Error("Erro ao deletar software");
        const success = response.ok;
        if (success && refreshSoftwares) {
            await refreshSoftwares();
        }
        return success;
    } catch (error) {
        console.error("Erro ao deletar software:", error);
        return false;
    }
}

// Laboratories
export function useLaboratories() {
    const [laboratories, setLaboratories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/laboratories");
                const data = await response.json();
                setLaboratories(data || []);
            } catch (error) {
                console.error("Erro ao carregar laboratórios:", error);
                setLaboratories([]);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const refreshLaboratories = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/laboratories");
            const data = await response.json();
            setLaboratories(data || []);
        } catch (error) {
            console.error("Erro ao atualizar laboratórios:", error);
            setLaboratories([]);
        } finally {
            setLoading(false);
        }
    };

    return [laboratories, setLaboratories, loading, refreshLaboratories];
}

export async function addLaboratory(data, refreshLaboratories) {
    try {
        const response = await fetch("/api/laboratories", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error("Erro ao adicionar laboratório");
        const newLab = await response.json();
        if (newLab && refreshLaboratories) {
            await refreshLaboratories();
        }
        return newLab;
    } catch (error) {
        console.error("Erro ao adicionar laboratório:", error);
        return null;
    }
}

export async function updateLaboratory(id, data, refreshLaboratories) {
    try {
        const response = await fetch(`/api/laboratories/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error("Erro ao atualizar laboratório");
        const updatedLab = await response.json();
        if (updatedLab && refreshLaboratories) {
            await refreshLaboratories();
        }
        return updatedLab;
    } catch (error) {
        console.error("Erro ao atualizar laboratório:", error);
        return null;
    }
}

export async function deleteLaboratory(id, refreshLaboratories) {
    try {
        const response = await fetch(`/api/laboratories/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) throw new Error("Erro ao deletar laboratório");
        const success = response.ok;
        if (success && refreshLaboratories) {
            await refreshLaboratories();
        }
        return success;
    } catch (error) {
        console.error("Erro ao deletar laboratório:", error);
        return false;
    }
}

// Admin Users
export function useAdminUsers() {
    const [adminUsers, setAdminUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/adminUsers");
                const data = await response.json();
                setAdminUsers(data || []);
            } catch (error) {
                console.error("Erro ao carregar admin users:", error);
                setAdminUsers([]);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const refreshAdminUsers = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/adminUsers");
            const data = await response.json();
            setAdminUsers(data || []);
        } catch (error) {
            console.error("Erro ao atualizar admin users:", error);
            setAdminUsers([]);
        } finally {
            setLoading(false);
        }
    };

    return [adminUsers, setAdminUsers, loading, refreshAdminUsers];
}

export async function addAdminUser(data, refreshAdminUsers) {
    try {
        const response = await fetch("/api/adminUsers", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error("Erro ao adicionar admin user");
        const newUser = await response.json();
        if (newUser && refreshAdminUsers) {
            await refreshAdminUsers();
        }
        return newUser;
    } catch (error) {
        console.error("Erro ao adicionar admin user:", error);
        return null;
    }
}

export async function updateAdminUser(id, data, refreshAdminUsers) {
    try {
        const response = await fetch(`/api/adminUsers/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error("Erro ao atualizar admin user");
        const updatedUser = await response.json();
        if (updatedUser && refreshAdminUsers) {
            await refreshAdminUsers();
        }
        return updatedUser;
    } catch (error) {
        console.error("Erro ao atualizar admin user:", error);
        return null;
    }
}

export async function deleteAdminUser(id, refreshAdminUsers) {
    try {
        const response = await fetch(`/api/adminUsers/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) throw new Error("Erro ao deletar admin user");
        const success = response.ok;
        if (success && refreshAdminUsers) {
            await refreshAdminUsers();
        }
        return success;
    } catch (error) {
        console.error("Erro ao deletar admin user:", error);
        return false;
    }
}

// Visitor Users
export function useVisitorUsers() {
    const [visitorUsers, setVisitorUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/visitorUsers");
                const data = await response.json();
                setVisitorUsers(data || []);
            } catch (error) {
                console.error("Erro ao carregar visitor users:", error);
                setVisitorUsers([]);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const refreshVisitorUsers = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/visitorUsers");
            const data = await response.json();
            setVisitorUsers(data || []);
        } catch (error) {
            console.error("Erro ao atualizar visitor users:", error);
            setVisitorUsers([]);
        } finally {
            setLoading(false);
        }
    };

    return [visitorUsers, setVisitorUsers, loading, refreshVisitorUsers];
}

export async function addVisitorUser(data, refreshVisitorUsers) {
    try {
        const response = await fetch("/api/visitorUsers", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error("Erro ao adicionar visitor user");
        const newUser = await response.json();
        if (newUser && refreshVisitorUsers) {
            await refreshVisitorUsers();
        }
        return newUser;
    } catch (error) {
        console.error("Erro ao adicionar visitor user:", error);
        return null;
    }
}

export async function updateVisitorUser(id, data, refreshVisitorUsers) {
    try {
        const response = await fetch(`/api/visitorUsers/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error("Erro ao atualizar visitor user");
        const updatedUser = await response.json();
        if (updatedUser && refreshVisitorUsers) {
            await refreshVisitorUsers();
        }
        return updatedUser;
    } catch (error) {
        console.error("Erro ao atualizar visitor user:", error);
        return null;
    }
}

export async function deleteVisitorUser(id, refreshVisitorUsers) {
    try {
        const response = await fetch(`/api/visitorUsers/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) throw new Error("Erro ao deletar visitor user");
        const success = response.ok;
        if (success && refreshVisitorUsers) {
            await refreshVisitorUsers();
        }
        return success;
    } catch (error) {
        console.error("Erro ao deletar visitor user:", error);
        return false;
    }
}