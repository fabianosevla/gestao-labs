"use client";

import { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null); // null = não logado
    const router = useRouter();

    const login = (email, password) => {
        // Simulação de login (substitua por chamada real à API)
        if (email === "admin@unifei.edu.br" && password === "unifei123") {
            setUser({ email });
            router.push("/");
        } else {
            alert("Credenciais inválidas!");
        }
    };

    const logout = () => {
        setUser(null);
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}