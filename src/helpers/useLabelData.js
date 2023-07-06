import { useQuery } from "@tanstack/react-query";

export function useLabelsData() {
    const queryKey = ["labels"];
    const queryFn = () => fetch("/api/labels").then((res) => res.json());

    return useQuery(queryKey, queryFn);
}