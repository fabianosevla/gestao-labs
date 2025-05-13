"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute({ children }) {
    const { user } = useAuth();
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        if (!user) {
            router.push("/login");
        }
    }, [user, router]);

    if (!isMounted) {
        return null;
    }

    if (!user) {
        return <div>Redirecionando para o login...</div>;
    }

    return children;
}