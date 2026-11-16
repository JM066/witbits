import { memo } from "react";
import classNames from "classnames";
import styles from "./Content.module.css";
import Text from "@/shared/components/Text";

const compactNumber = new Intl.NumberFormat("en", { notation: "compact" });

interface Props {
  title: string;
  description: string;
  categories: string[];
  likes: number;
  className?: string;
}

function Content({ title, description, categories, likes, className }: Props) {
  return (
    <div className={classNames(styles.content, className)}>
      <Text as="h2" size="heading" text={title} />
      <Text
        variant="secondary"
        className={styles.description}
        text={description}
      />
      <div className={styles.footer}>
        <ul className={styles.tags} aria-label="Categories">
          {categories.map((category) => (
            <li key={category} className={styles.tag}>
              {category.replace(/-/g, " ")}
            </li>
          ))}
        </ul>
        <p className={styles.likes}>
          {/* Compact count for sighted users, exact count for screen readers. */}
          <span aria-hidden="true">
            <span className={styles.heart}>♥</span>{" "}
            {compactNumber.format(likes)}
          </span>
          <span className="visually-hidden">
            {likes.toLocaleString("en")} likes
          </span>
        </p>
      </div>
    </div>
  );
}

export default memo(Content);
