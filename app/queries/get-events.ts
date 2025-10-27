'use client';

import { useQuery } from "@tanstack/react-query";
import { getEvents } from "../services/get-events";

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