import type { UserSigninResponse } from "@/types/auth";

export type User = UserSigninResponse["user_info"] & {
  created_at?: string;
};
