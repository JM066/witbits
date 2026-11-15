import { memo, useState } from "react";
import classNames from "classnames";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import styles from "./Image.module.css";

interface Props {
  src: string;
  alt: string;
  className?: string;
}

function Image({ src, alt, className }: Props) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    "loading",
  );

  return (
    <div className={classNames(styles.image, className)}>
      {status === "loading" && (
        <Skeleton
          variant="rectangular"
          className={styles.placeholder}
          aria-hidden="true"
        />
      )}
      {status === "error" ? (
        <Typography
          variant="body2"
          color="text.secondary"
          className={styles.fallback}
        >
          Image unavailable
        </Typography>
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
