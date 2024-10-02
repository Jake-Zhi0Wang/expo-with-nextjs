import { useQuery } from "@tanstack/react-query";

const EXPO_PUBLIC_API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

if (!EXPO_PUBLIC_API_BASE_URL)
  throw new Error("Missing EXPO_PUBLIC_API_BASE_URL");

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (response.ok) {
    return response.json();
  } else {
    throw new Error(response.statusText);
  }
};

export const useUser = () => {
  const { isLoading, data, isError } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetcher(`${EXPO_PUBLIC_API_BASE_URL}/api/user`),
  });

  return {
    user: data,
    isLoading,
    isError,
  };
};
