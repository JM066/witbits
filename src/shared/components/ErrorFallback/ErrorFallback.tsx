import type { FallbackProps } from "react-error-boundary";
import Button from "../Button";
import Text from "../Text";
import styles from "./ErrorFallback.module.css";

function ErrorFallback({ resetErrorBoundary }: FallbackProps) {
  return (
    <div role="alert" className={styles.error}>
      <Text size="heading" text="Failed to load cards." />
      <Text text="Something went wrong. Give it another try." variant="muted" />
      <Button onClick={resetErrorBoundary} className={styles.button}>
        Retry
      </Button>
    </div>
  );
}
export default ErrorFallback;
