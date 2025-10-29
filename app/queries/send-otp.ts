'use client';

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { sendOTP } from "../services/send-otp";

export function useSendOTP() {
    const router = useRouter();

    return useMutation({
        mutationFn: sendOTP,
        onSuccess: () => {
            router.push("/verify-otp");
        }
    });
}