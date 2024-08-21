import { registerUserService } from "@/services/authService";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const registerUserMutation = () => {
  const mutation = useMutation({
    mutationKey: ["register"],
    mutationFn: registerUserService,
    onSuccess: () => {
      toast.success("User registered successfully");
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  return mutation;
};
