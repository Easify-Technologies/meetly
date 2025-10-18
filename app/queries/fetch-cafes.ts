'use client';

import { useQuery } from "@tanstack/react-query";
import { fetchCafes } from "../services/fetch-cafes";

export function useFetchCafes(locationId: string) {
    return useQuery({
        queryKey: ['fetch-cafes', locationId],
        queryFn: () => fetchCafes(locationId),
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: false,
    });
}