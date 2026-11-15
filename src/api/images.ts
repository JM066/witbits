import { supabase } from "@/lib/supabase";

const CARD_COLUMNS =
  "id, title, created_at, updated_at, description, alt_description, categories, likes, url";

export async function getImages(
  { signal }: { signal?: AbortSignal },
  limit?: number,
): Promise<Image[]> {
  let query = supabase
    .from("cards")
    .select(CARD_COLUMNS)
    .order("sort_order", { ascending: true })
    // Merge TanStack's cancellation signal with a hard timeout ceiling
    .abortSignal(
      signal
        ? AbortSignal.any([signal, AbortSignal.timeout(8000)])
        : AbortSignal.timeout(8000),
    );

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Failed to fetch images: ${error.message}`);
  }

  return data;
}
