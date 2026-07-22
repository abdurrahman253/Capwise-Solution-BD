export default function PageLoadingFallback() {
  return (
    <div className="capwise-loading-screen" role="status" aria-live="polite">
      <div className="capwise-route-loader__content">
        <div className="capwise-route-loader__mark" aria-hidden="true">
          <span />
          <span />
        </div>
        <p>Preparing the next view</p>
        <div className="capwise-route-loader__track" aria-hidden="true">
          <span />
        </div>
      </div>
    </div>
  );
}
