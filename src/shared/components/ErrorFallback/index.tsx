import type { FallbackProps } from "react-error-boundary";
import Text from "../Text";

function ErrorFallback({ resetErrorBoundary }: FallbackProps) {
  return (
    <div role="alert">
      <div className="error-fallback">
        <Text text="Failed to load images." />
        <button onClick={resetErrorBoundary}>Retry</button>
      </div>
    </div>
  );
}
export default ErrorFallback;
