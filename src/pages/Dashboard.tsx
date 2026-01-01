import StatCard from "../components/ui/StatCard";
import { useMembers } from "../context/MembersContext";

export default function Dashboard() {
  const { members } = useMembers();

  const totalMembers = members.length;
  const activeMembers = members.filter(
    (member) => member.status === "active"
  ).length;
  const inactiveMembers = members.filter(
    (member) => member.status === "inactive"
  ).length;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard label="Total Members" value={totalMembers} />
        <StatCard label="Active Members" value={activeMembers} />
        <StatCard label="Inactive Members" value={inactiveMembers} />
      </div>
    </div>
  );
}
