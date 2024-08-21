import { loginUserService } from "@/services/authService";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const loginUserMutation = () => {
  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: loginUserService,
    onSuccess: () => {
      toast.success("User logged in successfully");
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  return mutation;
};
