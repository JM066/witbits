export async function getImages(
  { signal }: { signal?: AbortSignal },
  limit?: number,
): Promise<Image[]> {
  const url = limit ? `/images?limit=${limit}` : "/images";

  const res = await fetch(url, {
    // Merge TanStack's cancellation signal with a hard timeout ceiling
    signal: signal
      ? AbortSignal.any([signal, AbortSignal.timeout(8000)])
      : AbortSignal.timeout(8000),
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch images: ${res.status}`);
  }

  return res.json();
}
