import { useQuery } from "@tanstack/react-query";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (response.ok) {
    return response.json();
  } else {
    throw new Error(response.statusText);
  }
};

export const useUser = () => {
  const { isLoading, data, isError, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetcher(`/api/user`),
  });

  return {
    users: data,
    isLoading,
    isError,
    refetch,
  };
};
