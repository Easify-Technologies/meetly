'use client';

import { useMutation } from "@tanstack/react-query";
import { addEvents } from "@/app/services/admin/add-events";

export function useAddEvents() {
    return useMutation({
        mutationFn: addEvents,
    });
}