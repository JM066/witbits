import type { FallbackProps } from "react-error-boundary";

function ErrorFallback({ resetErrorBoundary }: FallbackProps) {
  return (
    <div role="alert">
      <div className="app">
        <p>Failed to load images.</p>
        <button onClick={resetErrorBoundary}>Retry</button>
      </div>
    </div>
  );
}
export default ErrorFallback;
