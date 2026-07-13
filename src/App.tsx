import { useImages } from "@/hooks/api/useImages";
import Image from "@/shared/components/Image";
import Content from "@/components/views/Content";
import Card from "@/components/views/Card";
import CardList from "@/components/views/CardList";
import Text from "@/shared/components/Text";
import LoadingCards from "@/components/views/LoadingCards";
import { useCallback, useMemo, useState } from "react";
import Dialog from "@/shared/components/Dialog";
import { ErrorBoundary } from "react-error-boundary";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import ErrorFallback from "@/shared/components/ErrorFallback";

const IMAGE_LIMIT = 10;

// The images query throws during Gallery's render (throwOnError), so the
// boundary has to sit above the component that calls useImages.
const Gallery = () => {
  const { data: images, isLoading } = useImages();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  // Deliberate linear lookup: one scan per render over a small list beats
  // maintaining an {[id]: image} map. Revisit only if by-id reads multiply.
  const selectedImage = images?.find((image) => image.id === selectedId);

  const closeDialog = useCallback(() => setSelectedId(null), []);

  const cards = useMemo(
    () =>
      images?.map((image) => (
        <Card
          key={image.id}
          id={image.id}
          onSelect={setSelectedId}
          selectLabel={image.description ?? "Untitled"}
        >
          <Image src={image.url} alt={image.alt_description ?? "Car photo"} />
          <Content
            description={image.description ?? ""}
            name={image.user.name ?? ""}
            location={image.user.location ?? ""}
          />
        </Card>
      )),
    [images],
  );

  return (
    <>
      {isLoading && (
        <p role="status" className="visually-hidden">
          Loading images…
        </p>
      )}
      {!isLoading && images?.length === 0 && (
        <Text text="No images found." align="center" variant="muted" />
      )}
      <CardList>
        {isLoading && <LoadingCards count={IMAGE_LIMIT} />}
        {cards}
      </CardList>
      {/* Rendered conditionally by the parent: mounting opens it, unmounting closes it. */}
      {selectedImage && (
        <Dialog
          onClose={closeDialog}
          title={selectedImage.description ?? "Photo"}
        >
          <Image
            src={selectedImage.url}
            alt={selectedImage.alt_description ?? "Car photo"}
          />
        </Dialog>
      )}
    </>
  );
};

const App = () => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
      <Gallery />
    </ErrorBoundary>
  );
};

export default App;
