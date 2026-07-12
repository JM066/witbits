import { useQuery } from "@tanstack/react-query";
import { getImages } from "@api/images";

const DEFAULT_INITIAL_LIMIT = 10;

export function useImages({
  initialLimit = DEFAULT_INITIAL_LIMIT,
}: { initialLimit?: number } = {}) {
  // Use parallel queries for concurrent fetching.
  const full = useQuery({
    queryKey: ["images"],
    queryFn: ({ signal }) => getImages({ signal }),
    // A failed background refresh shouldn't crash a page that's already showing the initial batch.
    throwOnError: false,
  });

  const initial = useQuery({
    queryKey: ["images", { limit: initialLimit }],
    queryFn: ({ signal }) => getImages({ signal }, initialLimit),
    // Only throw an error if the full set hasn't already come in.
    throwOnError: () => full.data === undefined,
  });

  const data = full.data ?? initial.data;

  return {
    data,
    isLoading: initial.isLoading && full.isLoading,
    isError: data === undefined && (initial.isError || full.isError),
  };
}
