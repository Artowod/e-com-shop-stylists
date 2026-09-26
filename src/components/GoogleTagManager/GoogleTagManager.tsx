import styles from "./GoogleTagManager.module.scss";

export function GoogleTagManagerFallback({ containerId }: { containerId: string }) {
  return (
    <noscript>
      <iframe
        className={styles.fallbackFrame}
        src={`https://www.googletagmanager.com/ns.html?id=${encodeURIComponent(containerId)}`}
        height="0"
        width="0"
        title="Google Tag Manager"
      />
    </noscript>
  );
}
