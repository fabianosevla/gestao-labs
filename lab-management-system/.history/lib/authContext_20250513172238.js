"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const storedAuth = localStorage.getItem("isAuthenticated");
        const storedRole = localStorage.getItem("userRole");
        if (storedAuth === "true" && storedRole) {
            setIsAuthenticated(true);
            setUserRole(storedRole);
        }
    }, []);

    const login = (username, password, adminUsers) => {
        if (!adminUsers) return;
        const user = adminUsers.find(
            (u) => u.username === username && u.password === password && u.status === "ativo"
        );
        if (user) {
            setIsAuthenticated(true);
            setUserRole(user.role || "user"); // Assume "user" como padrão se role não estiver definida
            localStorage.setItem("isAuthenticated", "true");
            localStorage.setItem("userRole", user.role || "user");
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserRole(null);
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("userRole");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}