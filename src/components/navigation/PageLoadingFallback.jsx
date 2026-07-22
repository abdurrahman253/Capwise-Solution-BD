export default function PageLoadingFallback() {
  return (
    <div className="capwise-loading-screen" role="status" aria-live="polite">
      <div className="capwise-loading-screen__content">
        <div className="capwise-loading-screen__mark" aria-hidden="true">
          <span />
        </div>
        <p>Preparing Capwise</p>
      </div>
    </div>
  );
}
