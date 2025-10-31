'use client';

import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../services/reset-password";
import { useRouter } from "next/navigation";

export function useResetPassword() {
    const router = useRouter();

    return useMutation({
        mutationFn: resetPassword,
        onSuccess: () => {
            setTimeout(() => {
                router.push("/login")
            }, 2000);
        }
    });
}