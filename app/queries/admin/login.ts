"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { adminLogin } from "@/app/services/admin/login";

export function useAdminLogin() {
  const router = useRouter();
  return useMutation({
    mutationFn: adminLogin,
    onSuccess: () => {
      router.push("/dashboard");
    },
  });
}
