import { useQuery } from "@tanstack/react-query";
import { getCards } from "@api/cards";

export function useCards() {
  return useQuery({
    queryKey: ["cards"],
    queryFn: ({ signal }) => getCards({ signal }),
    // Throw to the error boundary only when there's nothing to show; a failed
    // background refetch keeps the cards that are already on screen.
    throwOnError: (_error, query) => query.state.data === undefined,
  });
}
