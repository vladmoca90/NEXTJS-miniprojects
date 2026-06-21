import { MagnifyingGlassIcon, XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import styles from "../../styles/dashboard.module.css";

type Props = {
  query: string;
  onQueryChange: (q: string) => void;
  department: string;
  onDepartmentChange: (d: string) => void;
  departments: string[];
};

export default function Toolbar({ query, onQueryChange, department, onDepartmentChange, departments }: Props) {
  return (
    <div className={styles.toolbar}>
      <label className={styles.searchBox}>
        <MagnifyingGlassIcon />
        <input
          value={query}
          onChange={(e) => onQueryChange((e.target as HTMLInputElement).value)}
          placeholder="Search people, roles or teams..."
          aria-label="Search team members"
        />
        {query && (
          <button type="button" onClick={() => onQueryChange("")} aria-label="Clear search">
            <XMarkIcon />
          </button>
        )}
      </label>
      <label className={styles.selectBox}>
        <span className={styles.srOnly}>Filter by team</span>
        <select value={department} onChange={(e) => onDepartmentChange((e.target as HTMLSelectElement).value)}>
          {departments.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <ChevronDownIcon />
      </label>
    </div>
  );
}
