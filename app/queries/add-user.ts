'use client';

import { useMutation } from "@tanstack/react-query";
import { addUser } from "../services/add-user";
import { useRouter } from "next/navigation";

export function useAddUser() {
    const router = useRouter();
    return useMutation({
        mutationFn: addUser,
        onSuccess: () => {
            router.push("/bookings");
        }
    });
}