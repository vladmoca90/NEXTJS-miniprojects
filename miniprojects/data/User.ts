export type UserStatus = "Active" | "Away" | "Offline";

export type User = {
  id: number;
  name: string;
  email: string;
  department: string;
  role: string;
  status: UserStatus;
  initials: string;
  color: string;
};

export type UsersResponse = { users: User[] };
