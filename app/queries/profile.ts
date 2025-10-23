'use client';

import { useQuery } from "@tanstack/react-query";
import { getProfileDetails } from "../services/profile";

export function useProfileDetails(userId: string) {
    return useQuery({
        queryKey: ['profileDetails', userId],
        queryFn: () => getProfileDetails({ userId }),
        enabled: !!userId,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: false
    });
}