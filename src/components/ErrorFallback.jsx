export default function ErrorFallback({ title, message, onRetry }) {
  return (
    <div className="error-fallback">
      <div className="error-fallback-card">
        <h2>{title}</h2>
        <p>{message}</p>
        {onRetry && (
          <button
            type="button"
            className="error-fallback-button"
            onClick={onRetry}
          >
            Réessayer
          </button>
        )}
      </div>
    </div>
  );
}
