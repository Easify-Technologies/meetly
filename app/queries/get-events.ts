'use client';

import { useQuery } from "@tanstack/react-query";
import { getEvents } from "../services/get-events";
import { fetchEvents } from "../services/get-events";

type Event = {
    id: string;
    date: string;
    city: string;
    country: string;
    cafeId?: string | null;
    createdAt: string;
    isClosed: boolean;
    createdBy: string;
    bookingOpen?: string | null;
    bookingClose?: string | null;
    status?: string | null;
};

export function useGetAllEvents() {
    return useQuery<{ events: Event[] }>({
        queryKey: ["time_based_events"],
        queryFn: () => getEvents(),
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: false,
        staleTime: 10000,
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