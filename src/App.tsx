import { useImages } from "@/hooks/api/useImages";
import Image from "@/shared/components/Image";
import Content from "@/components/views/Content";
import Card from "@/components/views/Card";
import CardList from "@/components/views/CardList";
import Text from "@/shared/components/Text";
import LoadingCards from "@/components/views/LoadingCards";
import { useState } from "react";
import Dialog from "@/shared/components/Dialog";

const IMAGE_LIMIT = 10;

const App = () => {
  const { data: images, isLoading } = useImages();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  // Deliberate linear lookup: one scan per render over a small list beats
  // maintaining an {[id]: image} map. Revisit only if by-id reads multiply.
  const selectedImage = images?.find((image) => image.id === selectedId);

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
        {images?.map((image) => (
          <Card
            key={image.id}
            id={image.id}
            onSelect={setSelectedId}
            selectLabel={image.description ?? "Untitled"}
          >
            <Image src={image.url} alt={image.alt_description ?? "Car photo"} />
            <Content
              description={image.description ?? "Untitled"}
              name={`${image.user.name} · ${image.user.location}`}
            />
          </Card>
        ))}
      </CardList>
      {/* Rendered conditionally by the parent: mounting opens it, unmounting closes it. */}
      {selectedImage && (
        <Dialog
          onClose={() => setSelectedId(null)}
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

export default App;
