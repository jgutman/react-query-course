import { useQuery } from "@tanstack/react-query";

export function useUserData(userId) {
    if (!userId) {
        throw new Error("useUserData must be called with a userId");
    }

    const queryKey = ["users", userId];
    const queryFn = () => fetch(`/api/users/${userId}`).then((res) => res.json());

    return useQuery(queryKey, queryFn);
}