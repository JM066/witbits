import { memo, useState } from "react";
import classNames from "classnames";
import styles from "./Image.module.css";
import Skeleton from "@/shared/components/Skeleton";
import Text from "@/shared/components/Text";

interface Props {
  src: string;
  alt: string;
  // cover fills the frame (cropping edges); contain shows the whole image.
  fit?: "cover" | "contain";
  className?: string;
}

function Image({ src, alt, fit = "cover", className }: Props) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    "loading",
  );

  return (
    <div className={classNames(styles.image, styles[fit], className)}>
      {status === "loading" && <Skeleton className={styles.placeholder} />}
      {status === "error" ? (
        <Text
          text="Image unavailable"
          variant="muted"
          className={styles.fallback}
        />
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
        />
      )}
    </div>
  );
}

export default memo(Image);
