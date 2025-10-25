"use client";

import { useMutation } from "@tanstack/react-query";
import { editUserDetails } from "../services/edit-user-details";

export function useEditUserDetails(userId: string) {
  return useMutation({
    mutationFn: (data: any) => editUserDetails(data, userId),
  });
}
