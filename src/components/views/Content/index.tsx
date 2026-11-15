import { memo } from "react";
import classNames from "classnames";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import styles from "./Content.module.css";

interface Props {
  title: string;
  description: string;
  categories: string;
  likes: number;
  className?: string;
}

function Content({ title, description, categories, likes, className }: Props) {
  return (
    <CardContent className={classNames(styles.content, className)}>
      <Typography variant="h6" component="h2" className={styles.title}>
        {title}
      </Typography>
      <Typography variant="body2" className={styles.description}>
        {description}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {categories}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {likes} likes
      </Typography>
    </CardContent>
  );
}

export default memo(Content);
