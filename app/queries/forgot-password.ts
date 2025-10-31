'use client';

import { useMutation } from "@tanstack/react-query";
import { sendForgotPasswordLink } from "../services/forgot-password";

export function useForgotPasswordLink() {
    return useMutation({
        mutationFn: sendForgotPasswordLink
    });
}