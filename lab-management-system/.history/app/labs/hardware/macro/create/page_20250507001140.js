"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMacroHardwares, useLaboratories, useAdminUsers, useVisitorUsers } from "../../../../../lib/storage";

export default function CreateMacroHardware() {
    const router = useRouter();
    const [macroHardwares, setMacroHardwares] = useMacroHardwares();
    const [laboratories] = useLaboratories();
    const [adminUsers] = useAdminUsers();
    const [visitorUsers] = useVisitorUsers();
    const [formData, setFormData] = useState({
        name: "",
        laboratoryId: "",
        userId: "",
        status: "ativo",
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newHardware = {
            id: macroHardwares.length + 1,
            name: formData.name,
            laboratoryId: parseInt(formData.laboratoryId),
            userId: parseInt(formData.userId),
            status: formData.status,
        };
        await setMacroHardwares([...macroHardwares, newHardware]);
        router.push("/labs/hardware/macro");
    };

    // Combinar usuários administradores e visitantes
    const allUsers = [
        ...adminUsers.map((u) => ({ id: u.id, name: u.name })),
        ...visitorUsers.map((u) => ({ id: u.id, name: u.name })),