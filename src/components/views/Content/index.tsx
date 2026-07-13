import { memo } from "react";
import classNames from "classnames";
import styles from "./Content.module.css";
import Text from "@/shared/components/Text";

interface Props {
  description: string;
  name: string;
  location: string;
  className?: string;
}

function Content({ description, name, className, location }: Props) {
  return (
    <div className={classNames(styles.content, className)}>
      <Text className={styles.description} text={description} />
      <Text text={name} />
      <Text variant="secondary" text={location} />
    </div>
  );
}

export default memo(Content);
