import styles from "../../styles/dashboard.module.css";

export default function LoadingState() {
  return (
    <div className={styles.loadingState} aria-live="polite" aria-label="Loading team members">
      {[1, 2, 3, 4, 5].map((item) => (
        <div className={styles.skeletonRow} key={item}>
          <span />
          <div>
            <i />
            <i />
          </div>
          <i />
          <i />
          <i />
        </div>
      ))}
    </div>
  );
}
