import { memo, useState } from "react";
import classNames from "classnames";
import styles from "./Image.module.css";
import Skeleton from "@/shared/components/Skeleton";
import Text from "@/shared/components/Text";

interface Props {
  src: string;
  alt: string;
  className?: string;
}
function Image({ src, alt, className }: Props) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    "loading",
  );

  const onLoad = () => {
    setStatus("loaded");
  };

  const onError = () => {
    setStatus("error");
  };

  return (
    <div className={classNames(styles.image, className)}>
      {status === "loading" && <Skeleton className={styles.placeholder} />}
      {status === "error" ? (
        <Text
          text="Image unavailable"
          variant="muted"
          className={styles.fallback}
        />
      ) : (
        <picture>
          <source type="image/webp" srcSet={`${src}.webp`} />
          <img
            src={`${src}.jpg`}
            alt={alt}
            loading="lazy"
            decoding="async"
            className={classNames(status === "loaded" && styles.loaded)}
            onLoad={onLoad}
            onError={onError}
          />
        </picture>
      )}
    </div>
  );
}

export default memo(Image);
