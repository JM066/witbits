import type { FallbackProps } from "react-error-boundary";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styles from "./ErrorFallback.module.css";

function ErrorFallback({ resetErrorBoundary }: FallbackProps) {
  return (
    <div role="alert" className={styles.error}>
      <Typography variant="h6" component="p">
        Failed to load images.
      </Typography>
      <Typography color="text.secondary">
        Something went wrong. Give it another try.
      </Typography>
      <Button
        variant="contained"
        onClick={resetErrorBoundary}
        className={styles.button}
      >
        Retry
      </Button>
    </div>
  );
}
export default ErrorFallback;
