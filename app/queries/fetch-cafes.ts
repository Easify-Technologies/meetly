'use client';

import { useQuery } from "@tanstack/react-query";
import { fetchCafes } from "../services/fetch-cafes";
import { allCafes } from "../services/fetch-cafes";

export function useFetchCafes(locationId: string) {
    return useQuery({
        queryKey: ['fetch-cafes', locationId],
        queryFn: () => fetchCafes(locationId),
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: false,
    });
}

export function useFetchAllCafes() {
    return useQuery({
        queryKey: ['all-locations'],
        queryFn: () => allCafes(),
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: false,
        staleTime: 5000
    });
}