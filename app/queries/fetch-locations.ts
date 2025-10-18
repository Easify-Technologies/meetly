'use client';

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchAllLocations } from "../services/fetch-locations";

export function useFetchAllLocations() {
    return useQuery({
        queryKey: ['all-locations'],
        queryFn: () => fetchAllLocations(),
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: false,
        placeholderData: keepPreviousData,
        staleTime: 5000
    });
}