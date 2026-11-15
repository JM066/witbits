import { useImages } from "@/hooks/api/useImages";
import Image from "@/shared/components/Image";
import Content from "@/components/views/Content";
import Card from "@/shared/components/Card";
import CardList from "@/shared/components/CardList";
import LoadingCards from "@/components/views/LoadingCards";
import { useCallback, useMemo, useState } from "react";
import Dialog from "@/shared/components/Dialog";
import { ErrorBoundary } from "react-error-boundary";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import ErrorFallback from "@/shared/components/ErrorFallback";
import ToggleButton from "@mui/material/ToggleButton";
import Typography from "@mui/material/Typography";
import styles from "./App.module.css";

const IMAGE_LIMIT = 10;

const Gallery = () => {
  const { data: images = [], isLoading } = useImages();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [sortByLikes, setSortByLikes] = useState<boolean>(false);

  // Deliberate linear lookup: one scan per render over a small list beats
  // maintaining an {[id]: image} map. Revisit only if by-id reads multiply.
  const selectedImage = useMemo(
    () => images?.find((image) => image.id === selectedId),
    [images, selectedId],
  );
  const sortedImages = useMemo(
    () => [...images].sort((a, b) => b.likes - a.likes),
    [images],
  );

  const displayedImages = sortByLikes ? sortedImages : images;

  const toggleSort = () => {
    setSortByLikes((prev) => !prev);
  };

  const closeDialog = useCallback(() => setSelectedId(null), []);

  const cards = useMemo(
    () =>
      displayedImages.map((image) => (
        <Card
          key={image.id}
          id={image.id}
          onSelect={setSelectedId}
          selectLabel={image.title}
        >
          <Image src={image.url} alt={image.alt_description ?? "Event card"} />
          <Content
            title={image.title}
            description={image.description ?? ""}
            categories={image.categories.join(", ")}
            likes={image.likes}
          />
        </Card>
      )),
    [displayedImages],
  );

  return (
    <>
      <div className={styles.toolbar}>
        {/* ToggleButton sets aria-pressed from `selected` */}
        <ToggleButton
          value="likes"
          selected={sortByLikes}
          onChange={toggleSort}
          color="primary"
          size="small"
        >
          Sort by most liked
        </ToggleButton>
      </div>
      {isLoading && (
        <p role="status" className="visually-hidden">
          Loading images…
        </p>
      )}
      {!isLoading && images?.length === 0 && (
        <Typography align="center" color="text.secondary">
          No images found.
        </Typography>
      )}
      <CardList>
        {isLoading && <LoadingCards count={IMAGE_LIMIT} />}
        {cards}
      </CardList>
      {/* Rendered conditionally by the parent: mounting opens it, unmounting closes it. */}
      {selectedImage && (
        <Dialog onClose={closeDialog} title={selectedImage.title}>
          <Image
            src={selectedImage.url}
            alt={selectedImage.alt_description ?? "Event card"}
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
