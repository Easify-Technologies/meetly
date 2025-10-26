'use client';

import { useMutation } from "@tanstack/react-query";
import { addLocation } from "@/app/services/admin/add-location";

export function useAddLocation() {
    return useMutation({
        mutationFn: addLocation,
    });
}