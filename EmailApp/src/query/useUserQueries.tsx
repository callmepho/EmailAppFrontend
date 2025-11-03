import {
  deleteUser,
  fetchCurrentUser,
  loginUser,
  registerUser,
} from "@/services/userQueries";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useLoginUser = () => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginUser(email, password),
  });
};
export const useRegisterUser = () => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      registerUser(email, password),
  });
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: () => fetchCurrentUser,
  });
};

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: ({ id }: { id: number }) => deleteUser(id),
  });
};
