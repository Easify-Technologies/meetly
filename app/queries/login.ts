'use client';

import { useMutation } from "@tanstack/react-query";
import { userLogin } from "../services/login";
import { useRouter } from "next/navigation";

export function useLoginDetails() {
    const router = useRouter();
    return useMutation({
        mutationFn: userLogin,
        onSuccess: () => {
            router.push("/bookings");
        }
    });
}