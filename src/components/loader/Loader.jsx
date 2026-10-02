export default function Loader({
  label = "Chargement en cours",
  variant = "page",
}) {
  const loaderClassName =
    variant === "inline" ? "loader loader-inline" : "loader loader-page";

  return (
    <div
      className={loaderClassName}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="loader-card">
        <div className="loader-spinner" aria-hidden="true" />
        <p className="loader-text">{label}</p>
      </div>
    </div>
  );
}
