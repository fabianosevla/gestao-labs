"use client";

import { useState, useEffect } from "react";
import { AuthProvider } from "./auth/AuthContext";
import Navbar from "../components/Navbar";
import { useMacroHardwares, useMicroHardwares, useSoftwares } from "./lib/storage";

export default function ClientWrapper({ children }) {
    const [isMounted, setIsMounted] = useState(false);
    const [, , macroLoading, refreshMacroHardwares] = useMacroHardwares();
    const [, , microLoading, refreshMicroHardwares] = useMicroHardwares();
    const [, , softwareLoading, refreshSoftwares] = useSoftwares();

    useEffect(() => {
        setIsMounted(true);
        refreshMacroHardwares();
        refreshMicroHardwares();
        refreshSoftwares();
    }, [refreshMacroHardwares, refreshMicroHardwares, refreshSoftwares]);

    if (!isMounted || macroLoading || microLoading || softwareLoading) {
        return <div className="p-6 pt-28">Carregando...</div>; // Fallback no cliente
    }

    return (
        <AuthProvider>
            <Navbar />
            <main className="pt-16">{children}</main>
        </AuthProvider>
    );
}