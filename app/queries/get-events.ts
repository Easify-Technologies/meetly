'use client';

import { useQuery } from "@tanstack/react-query";
import { getEvents } from "../services/get-events";
import { fetchEvents } from "../services/get-events";

export function useGetAllEvents() {
    return useQuery({
        queryKey: ['time_based_events'],
        queryFn: () => getEvents(),
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: false,
        staleTime: 10000
    });
}

export function useFetchEvents() {
    return useQuery({
        queryKey: ['all-events'],
        queryFn: () => fetchEvents(),
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: false,
        staleTime: 10000
    });
}