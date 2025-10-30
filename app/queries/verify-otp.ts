'use client';

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { verifyOTP } from "../services/verify-otp";

export function useVerifyOTP() {
    const router = useRouter();

    return useMutation({
        mutationFn: verifyOTP,
        onSuccess: () => {
            router.push("/bookings");
        }
    });
}