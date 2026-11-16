import { useCards } from "@/hooks/api/useCards";
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
import Text from "@/shared/components/Text";
import styles from "./App.module.css";

// How many placeholder cards show while the cards load.
const LOADING_CARD_COUNT = 10;

const CardCatalog = () => {
  const { data: cards = [], isLoading } = useCards();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedCard = useMemo(
    () => cards.find((card) => card.id === selectedId),
    [cards, selectedId],
  );

  const closeDialog = useCallback(() => setSelectedId(null), []);

  const cardItems = useMemo(
    () =>
      cards.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          onSelect={setSelectedId}
          selectLabel={card.title}
        >
          <Image src={card.url} alt={card.alt_description ?? "Event card"} />
          <Content
            title={card.title}
            description={card.description ?? ""}
            categories={card.categories}
            likes={card.likes}
          />
        </Card>
      )),
    [cards],
  );

  return (
    <>
      <section className={styles.hero}>
        <Text
          as="h1"
          size="display"
          className={styles.headline}
          text="Cards for every occasion."
          highlight="Even the awkward ones."
        />
        <Text
          variant="secondary"
          size="lead"
          className={styles.lead}
          text="Birthdays, holidays, and everything in between. Pick a card, make someone smile."
        />
      </section>
      {isLoading && (
        <p role="status" className="visually-hidden">
          Loading cards…
        </p>
      )}
      {!isLoading && cards.length === 0 && (
        <Text
          text="No cards yet. Check back soon!"
          align="center"
          variant="muted"
          className={styles.empty}
        />
      )}
      <CardList>
        {isLoading && <LoadingCards count={LOADING_CARD_COUNT} />}
        {cardItems}
      </CardList>
      {selectedCard && (
        <Dialog onClose={closeDialog} title={selectedCard.title}>
          <Image
            fit="contain"
            src={selectedCard.url}
            alt={selectedCard.alt_description ?? "Event card"}
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
      <CardCatalog />
    </ErrorBoundary>
  );
};

export default App;
