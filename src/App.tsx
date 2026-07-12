import { useImages } from "@/hooks/api/useImages";
import Image from "@/shared/components/Image";
import Content from "@/components/views/Content";
import Card from "@/components/views/Card";
import CardList from "@/components/views/CardList";
import Text from "@/shared/components/Text";
import LoadingCards from "@/components/views/LoadingCards";

const IMAGE_LIMIT = 10;

const App = () => {
  const { data: images, isLoading } = useImages();
  console.log("images", images?.length);
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
          <Card key={image.id}>
            <Image src={image.url} alt={image.alt_description ?? "Car photo"} />
            <Content
              description={image.description ?? "Untitled"}
              name={`${image.user.name} · ${image.user.location}`}
            />
          </Card>
        ))}
      </CardList>
    </>
  );
};

export default App;
