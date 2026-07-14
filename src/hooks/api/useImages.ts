import { useQuery } from "@tanstack/react-query";
import { getImages } from "@api/images";

const DEFAULT_INITIAL_LIMIT = 10;

export function useImages({
  initialLimit = DEFAULT_INITIAL_LIMIT,
}: { initialLimit?: number } = {}) {
  const full = useQuery({
    queryKey: ["images"],
    queryFn: ({ signal }) => getImages({ signal }),
    // A failed background refresh shouldn't crash a page that's already showing the initial batch.
    throwOnError: false,
  });

  const initial = useQuery({
    queryKey: ["images", { limit: initialLimit }],
    queryFn: ({ signal }) => getImages({ signal }, initialLimit),
    // Unlike `full` above, this one can throw but only if the full set
    // hasn't already arrived to cover for it.
    throwOnError: () => full.data === undefined,
  });

  // Response times are random, so the full set can actually arrive before
  // the small batch, even though it's bigger. Preferring `full` here works either way:
  const data = full.data ?? initial.data;

  return {
    data,
    isLoading: initial.isLoading && full.isLoading,
    isError: data === undefined && (initial.isError || full.isError),
  };
}
