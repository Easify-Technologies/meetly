'use client';

import { useMutation } from "@tanstack/react-query";
import { addCafes } from "@/app/services/admin/add-cafe";

export function useAddCafes() {
    return useMutation({
        mutationFn: addCafes,
    });
}