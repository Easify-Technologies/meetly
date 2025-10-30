'use client';

import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/app/services/admin/fetch-users";

export function useFetchAllUsers() {
    return useQuery({
        queryKey: ['all-users'],
        queryFn: () => fetchUsers(),
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: false,
        staleTime: 5000
    });
}