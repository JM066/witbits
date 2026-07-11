import "./App.css";
import { useImages } from "./hooks/api/useImages";
import Image from "./shared/components/Image";
import Content from "@/components/views/Content";
import Card from "@/components/views/Card";
import CardList from "@/components/views/CardList";
import Header from "@/components/views/Header";
import Text from "@/shared/components/Text";
import Skeleton from "@/shared/components/Skeleton";

const IMAGE_LIMIT = 10;

const LOADING_CARDS = Array.from({ length: IMAGE_LIMIT }, (_, index) => (
  <Card key={`loading-card-${index + 1}`}>
    <Skeleton className="skeleton-image" />
    <div className="skeleton-content">
      <Skeleton className="skeleton-line" />
      <Skeleton className="skeleton-line skeleton-line--short" />
    </div>
  </Card>
));

const App = () => {
  const { data: images, isLoading } = useImages();
  console.log("images", images?.length);
  return (
    <div className="app">
      <Header>
        <Text as="h1" text="Image Gallery" />
      </Header>
      <main>
        {isLoading && (
          <p role="status" className="visually-hidden">
            Loading images…
          </p>
        )}
        {!isLoading && images?.length === 0 && (
          <Text text="No images found." muted />
        )}
        <CardList>
          {isLoading && LOADING_CARDS}
          {images?.map((image) => (
            <Card key={image.id}>
              <Image
                src={image.url}
                alt={image.alt_description ?? "Car photo"}
              />
              <Content
                description={image.description ?? "Untitled"}
                author={`${image.user.name} · ${image.user.location}`}
              />
            </Card>
          ))}
        </CardList>
      </main>
    </div>
  );
};

export default App;
