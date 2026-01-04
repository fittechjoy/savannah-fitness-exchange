import StatCard from "../components/ui/StatCard";
import { useMembers } from "../context/MembersContext";

export default function Dashboard() {
  const { members } = useMembers();

  const totalMembers = members.length;

  const activeMembers = members.filter(
    (member) => member.status === "active"
  ).length;

  const expiredMembers = members.filter(
    (member) => member.status === "inactive"
  ).length;

  const expiringSoon = members.filter(
    (m) => m.daysLeft !== undefined && m.daysLeft <= 7 && m.daysLeft > 0
  ).length;

  const expiringUrgent = members.filter(
    (m) => m.daysLeft !== undefined && m.daysLeft <= 3 && m.daysLeft > 0
  ).length;

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-2">
        Savannah Fitness Exchange Dashboard
      </h1>

      <p className="text-sm text-gray-600 mb-6">
        Quick overview of membership status and renewals.
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard label="Total Members" value={totalMembers} />
        <StatCard label="Active Members" value={activeMembers} />
        <StatCard label="Expired Members" value={expiredMembers} />
        <StatCard label="Expiring Soon (7 days)" value={expiringSoon} />
        <StatCard label="Urgent (3 days)" value={expiringUrgent} />
      </div>
    </div>
  );
}
