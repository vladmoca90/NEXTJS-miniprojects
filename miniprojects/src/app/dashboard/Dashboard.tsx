"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowPathIcon,
  BellIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  Squares2X2Icon,
  UserPlusIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import styles from "../styles/dashboard.module.css";
import type { User, UserStatus, UsersResponse } from "../../../data/User";
import UserRow from "./components/UserRow";
import UserCard from "./components/UserCard";
import LoadingState from "./components/LoadingState";
import Toolbar from "./components/Toolbar";
import Stats from "./components/Stats";

const departments = [
  "All teams",
  "Design",
  "Engineering",
  "Finance",
  "Marketing",
  "People",
  "Sales",
];

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("All teams");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/dashboard-users");
      if (!response.ok)
        throw new Error("The team directory could not be loaded.");
      const data: UsersResponse = await response.json();
      setUsers(data.users);
    } catch (fetchError) {
      setError(
        fetchError instanceof Error
          ? fetchError.message
          : "Something went wrong.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = useMemo(() => {
    const search = query.trim().toLowerCase();
    return users.filter((user) => {
      const matchesSearch =
        !search ||
        [user.name, user.email, user.role, user.department].some((value) =>
          value.toLowerCase().includes(search),
        );
      const matchesDepartment =
        department === "All teams" || user.department === department;
      return matchesSearch && matchesDepartment;
    });
  }, [department, query, users]);

  return (
    <main className={styles.shell}>
      <header className={styles.topbar}>
        <a
          className={styles.brand}
          href="/dashboard"
          aria-label="Northstar dashboard"
        >
          <span className={styles.logoMark}>
            <Squares2X2Icon />
          </span>
          <span>northstar</span>
        </a>
        <div className={styles.headerActions}>
          <button className={styles.iconButton} aria-label="Notifications">
            <BellIcon />
          </button>
          <span className={styles.headerDivider} />
          <button
            className={styles.profileButton}
            aria-label="Open profile menu"
          >
            <span className={`${styles.avatar} ${styles.avatarGreen}`}>AV</span>
            <span className={styles.profileCopy}>
              <strong>Alex Vale</strong>
              <small>Admin</small>
            </span>
            <ChevronDownIcon />
          </button>
        </div>
      </header>

      <section className={styles.content}>
        <div className={styles.titleRow}>
          <div>
            <p className={styles.eyebrow}>Workspace</p>
            <h1>Team directory</h1>
            <p className={styles.subtitle}>
              Meet the people building Northstar.
            </p>
          </div>
          <button className={styles.inviteButton}>
            <UserPlusIcon /> Invite member
          </button>
        </div>

        <Stats users={users} />

        <section className={styles.directory}>
          <Toolbar
            query={query}
            onQueryChange={(q) => setQuery(q)}
            department={department}
            onDepartmentChange={(d) => setDepartment(d)}
            departments={departments}
          />

          {isLoading ? (
            <LoadingState />
          ) : error ? (
            <div className={styles.messageState} role="alert">
              <span className={styles.errorIcon}>!</span>
              <h2>We hit a small snag</h2>
              <p>{error}</p>
              <button onClick={() => void fetchUsers()}>
                <ArrowPathIcon /> Try again
              </button>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className={styles.messageState}>
              <MagnifyingGlassIcon className={styles.emptyIcon} />
              <h2>No matches found</h2>
              <p>Try a different name, role or team.</p>
              <button
                onClick={() => {
                  setQuery("");
                  setDepartment("All teams");
                }}
              >
                Clear filters
              </button>
            </div>
          ) : (
            <>
              <div className={styles.resultMeta}>
                <span>
                  {filteredUsers.length}{" "}
                  {filteredUsers.length === 1 ? "member" : "members"}
                </span>
                <span>Updated just now</span>
              </div>
              <div className={styles.tableWrap}>
                <table>
                  <thead>
                    <tr>
                      <th>Member</th>
                      <th>Role</th>
                      <th>Team</th>
                      <th>Status</th>
                      <th>
                        <span className={styles.srOnly}>Actions</span>
                      </th>
                    </tr>
                  </thead>
                        <tbody>
                          {filteredUsers.map((user) => (
                            <UserRow key={user.id} user={user} />
                          ))}
                        </tbody>
                </table>
              </div>
              <div className={styles.cardGrid}>
                {filteredUsers.map((user) => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>
            </>
          )}
        </section>
      </section>
    </main>
  );
}

