export interface Member {
  id: string;
  name: string;
  phone: string;
  plan: string;
  status: "active" | "inactive";
  joinDate: string;
}
