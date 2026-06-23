import type { User } from "../../../../data/dashboard/User";
import styles from "../../styles/dashboard.module.css";

export default function UserRow({ user }: { user: User }) {
  return (
    <tr>
      <td>
        <div className={styles.person}>
          <span className={`${styles.avatar} ${styles[`avatar_${user.color}`]}`}>
            {user.initials}
          </span>
          <div>
            <strong>{user.name}</strong>
            <span>{user.email}</span>
          </div>
        </div>
      </td>
      <td>{user.role}</td>
      <td>
        <span className={styles.teamBadge}>{user.department}</span>
      </td>
      <td>
        <span className={`${styles.status} ${styles[`status${user.status}`]}`}>
          <i />
          {user.status}
        </span>
      </td>
      <td>
        <button className={styles.moreButton} aria-label={`More actions for ${user.name}`}>
          •••
        </button>
      </td>
    </tr>
  );
}
