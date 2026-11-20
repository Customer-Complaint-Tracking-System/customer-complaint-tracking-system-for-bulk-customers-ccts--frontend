import axiosHandler from "@/lib/axios";
import { ProfileResponse } from "./profile.type";

export const getProfile = async (): Promise<ProfileResponse> => {
  const response = await axiosHandler.get<ProfileResponse>("/auth/me");
  return response.data;
};