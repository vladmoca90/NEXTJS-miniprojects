import type { User } from "../../../../data/User";
import styles from "../../styles/dashboard.module.css";

export default function UserCard({ user }: { user: User }) {
  return (
    <article className={styles.userCard}>
      <div className={styles.cardTop}>
        <span className={`${styles.avatar} ${styles.cardAvatar} ${styles[`avatar_${user.color}`]}`}>
          {user.initials}
        </span>
        <span className={`${styles.status} ${styles[`status${user.status}`]}`}>
          <i />
          {user.status}
        </span>
      </div>
      <h2>{user.name}</h2>
      <p>{user.role}</p>
      <span className={styles.teamBadge}>{user.department}</span>
      <a href={`mailto:${user.email}`}>{user.email}</a>
    </article>
  );
}
