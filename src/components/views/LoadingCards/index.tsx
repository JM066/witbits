import { memo } from "react";
import Card from "@/components/views/Card";
import Skeleton from "@/shared/components/Skeleton";
import styles from "./LoadingCards.module.css";

interface Props {
  count: number;
}

function LoadingCards({ count }: Props) {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <Card key={`loading-card-${index}`} className={styles.loadingCard}>
          <Skeleton className={styles.image} />
          <div className={styles.content}>
            <Skeleton className={styles.line} />
            <Skeleton className={`${styles.line} ${styles.lineShort}`} />
          </div>
        </Card>
      ))}
    </>
  );
}

export default memo(LoadingCards);
