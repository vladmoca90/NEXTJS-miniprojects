export interface Status {
  id: number;
  name: string;
  description: string;
  status: "active" | "inactive" | "pending";
}