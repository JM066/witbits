import { memo } from "react";
import classNames from "classnames";
import Card from "@/shared/components/Card";
import Skeleton from "@/shared/components/Skeleton";
import styles from "./LoadingCards.module.css";

interface Props {
  count: number;
}

function LoadingCards({ count }: Props) {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <Card key={`loading-card-${index}`}>
          <Skeleton className={styles.image} />
          <div className={styles.content}>
            <Skeleton className={classNames(styles.line, styles.title)} />
            <Skeleton className={styles.line} />
            <Skeleton className={classNames(styles.line, styles.lineShort)} />
            <div className={styles.tags}>
              <Skeleton className={classNames(styles.line, styles.tag)} />
              <Skeleton className={classNames(styles.line, styles.tag)} />
            </div>
          </div>
        </Card>
      ))}
    </>
  );
}

export default memo(LoadingCards);
