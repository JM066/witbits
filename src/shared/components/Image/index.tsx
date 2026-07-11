import { memo } from "react";
import classNames from "classnames";
import styles from "./Image.module.css";

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}
function Image({ src, alt, className }: ImageProps) {
  return (
    <div className={classNames(styles.image, className)}>
      <picture>
        <source type="image/webp" srcSet={`${src}.webp`} />
        <img src={`${src}.jpg`} alt={alt} loading="lazy" decoding="async" />
      </picture>
    </div>
  );
}

export default memo(Image);
