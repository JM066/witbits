import type { FallbackProps } from "react-error-boundary";
import Button from "../Button";
import Text from "../Text";

function ErrorFallback({ resetErrorBoundary }: FallbackProps) {
  return (
    <div role="alert">
      <div className="error-fallback">
        <Text text="Failed to load images." />
        <Button onClick={resetErrorBoundary}>Retry</Button>
      </div>
    </div>
  );
}
export default ErrorFallback;
