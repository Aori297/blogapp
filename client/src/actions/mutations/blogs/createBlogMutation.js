import { useMutation } from "@tanstack/react-query";

const createBlogMutation = useMutation({
  mutationKey: ["createBlog"],
  mutationFn: createBlogService,
  onSuccess: () => {
    toast.success("Blog created successfully");
  },
  onError: (error) => {
    toast.error(error);
  },
});
