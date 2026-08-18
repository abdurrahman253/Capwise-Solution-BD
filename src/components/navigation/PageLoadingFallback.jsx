import Image from "next/image";

export default function PageLoadingFallback() {
  return (
    <div className="capwise-route-loader" role="status" aria-live="polite">
      <div className="capwise-route-loader__backdrop" aria-hidden="true" />
      <div className="capwise-route-loader__card">
        <div className="capwise-route-loader__mark" aria-hidden="true">
          <Image src="/brand/capwise-icon.png" alt="" width={26} height={26} priority />
          <span className="capwise-route-loader__spinner" />
        </div>
        <div className="capwise-route-loader__copy">
          <p className="capwise-route-loader__brand">CAPWISE</p>
          <p className="capwise-route-loader__message">Preparing your page…</p>
        </div>
        <div className="capwise-route-loader__track">
          <span />
        </div>
      </div>
    </div>
  );
}
