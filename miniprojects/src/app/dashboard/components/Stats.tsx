import { UsersIcon } from "@heroicons/react/24/outline";
import type { User } from "../../../../data/User";
import styles from "../../styles/dashboard.module.css";

export default function Stats({ users }: { users: User[] }) {
  return (
    <section className={styles.stats} aria-label="Team overview">
      <article>
        <span className={styles.statIcon}>
          <UsersIcon />
        </span>
        <div>
          <strong>{users.length || "—"}</strong>
          <span>Total members</span>
        </div>
      </article>
      <article>
        <span className={`${styles.statDot} ${styles.activeDot}`} />
        <div>
          <strong>{users.filter((user) => user.status === "Active").length || "—"}</strong>
          <span>Active now</span>
        </div>
      </article>
      <article>
        <span className={`${styles.statDot} ${styles.teamDot}`} />
        <div>
          <strong>{users.length ? new Set(users.map((user) => user.department)).size : "—"}</strong>
          <span>Teams</span>
        </div>
      </article>
    </section>
  );
}
