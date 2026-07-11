import { memo } from "react";
import classNames from "classnames";
import styles from "./Content.module.css";
import Text from "@/shared/components/Text";

interface Props {
  description: string;
  author: string;
  className?: string;
}

function Content({ description, author, className }: Props) {
  return (
    <div className={classNames(styles.content, className)}>
      <Text className={styles.description} text={description} />
      <Text className={styles.author} text={author} />
    </div>
  );
}

export default memo(Content);
