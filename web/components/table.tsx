"use client";

import { timeAgo } from "@/lib/utils";
import Image from "next/image";
import RefreshButton from "./refresh-button";
import { useUser } from "@/hooks/useUser";
import { useUserMutation } from "@/hooks/useUserMutation";

export default function Table() {
  const startTime = Date.now();
  const { users, isLoading, refetch } = useUser();
  const duration = Date.now() - startTime;
  const postUserMutation = useUserMutation({
    method: "POST",
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const incrementCounter = async (userId: number) => {
    postUserMutation.mutate({ userId });
  };

  if (isLoading) {
    return null;
  }

  console.log(users);

  return (
    <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Recent Users</h2>
          <p className="text-sm text-gray-500">
            Fetched {users.length} users in {duration}ms
          </p>
        </div>
        <RefreshButton />
      </div>
      <div className="divide-y divide-gray-900/5">
        {users.map((user: any) => (
          <div
            key={user.name}
            className="flex items-center justify-between py-3"
          >
            <div className="flex items-center space-x-4">
              <Image
                src={user.image}
                alt={user.name}
                width={48}
                height={48}
                className="rounded-full ring-1 ring-gray-900/5"
              />
              <div className="space-y-1">
                <p className="font-medium leading-none">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
                <p className="text-sm text-gray-500">{user.counter}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => incrementCounter(user.id)}
                className="text-sm text-blue-500"
              >
                Increment
              </button>
              <p className="text-sm text-gray-500">{timeAgo(user.createdAt)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
