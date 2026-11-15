import { memo } from "react";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";
import Card from "@/shared/components/Card";
import styles from "./LoadingCards.module.css";

interface Props {
  count: number;
}

function LoadingCards({ count }: Props) {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <Card key={`loading-card-${index}`}>
          <Skeleton
            variant="rectangular"
            className={styles.image}
            aria-hidden="true"
          />
          <CardContent className={styles.content} aria-hidden="true">
            <Skeleton variant="text" />
            <Skeleton variant="text" className={styles.lineShort} />
          </CardContent>
        </Card>
      ))}
    </>
  );
}

export default memo(LoadingCards);
