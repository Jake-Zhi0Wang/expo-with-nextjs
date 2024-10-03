import { useMutation } from "@tanstack/react-query";

type Args = {
  onSuccess: () => void;
  onError: (error: unknown) => void;
  method: "POST";
};

export const useUserMutation = ({ onSuccess, onError, method }: Args) =>
  useMutation({
    mutationFn: async ({ userId }: { userId: number }) => {
      const response = await fetch(`/api/user`, {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
        method,
      });
      console.log(userId);
      if (!response.ok) {
        throw new Error("Unable to set goals");
      }
    },
    onSuccess,
    onError,
  });
