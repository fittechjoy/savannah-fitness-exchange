import { useMembers } from "../context/MembersContext";
import { membershipPlans } from "../data/membershipPlans";
import { Link } from "react-router-dom";
import { useState } from "react";
import { exportToCSV } from "../utils/exportCsv";



export default function Members() {
  const { members, renewMembership } = useMembers();
  const [filter, setFilter] = useState<
  "all" | "active" | "expired" | "expiring"
>("all");


  const getPlanName = (planId: string) =>
    membershipPlans.find((p) => p.id === planId)?.name || "Unknown";
  const filteredMembers = members.filter((member) => {
  if (filter === "active") return member.status === "active";
  if (filter === "expired") return member.status === "inactive";
  if (filter === "expiring")
    return member.daysLeft !== undefined && member.daysLeft <= 7;
  return true;
});

<div className="flex items-center gap-3 mb-4">
  {/* Filter buttons */}
  <button
    onClick={() => setFilter("all")}
    className={`px-4 py-2 rounded ${
      filter === "all" ? "bg-slate-900 text-white" : "bg-gray-200"
    }`}
  >
    All
  </button>

  <button
    onClick={() => setFilter("active")}
    className={`px-4 py-2 rounded ${
      filter === "active" ? "bg-slate-900 text-white" : "bg-gray-200"
    }`}
  >
    Active
  </button>

  <button
    onClick={() => setFilter("expiring")}
    className={`px-4 py-2 rounded ${
      filter === "expiring" ? "bg-slate-900 text-white" : "bg-gray-200"
    }`}
  >
    Expiring Soon
  </button>

  <button
    onClick={() => setFilter("expired")}
    className={`px-4 py-2 rounded ${
      filter === "expired" ? "bg-slate-900 text-white" : "bg-gray-200"
    }`}
  >
    Expired
  </button>

  {/* Export button pushed to the right */}
  <button
    onClick={() =>
      exportToCSV(
        `members-${filter}.csv`,
        filteredMembers.map((member) => ({
          Name: member.name,
          Phone: member.phone,
          Plan: getPlanName(member.planId),
          Status:
            member.status === "inactive"
              ? "Expired"
              : member.daysLeft !== undefined && member.daysLeft <= 7
              ? `Expires in ${member.daysLeft} days`
              : "Active",
          "Expiry Date": member.expiryDate,
          "Days Left": member.daysLeft ?? "",
        }))
      )
    }
    className="ml-auto px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
  >
    Export CSV
  </button>
</div>





  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Members</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Plan</th>
              <th className="p-3">Status</th>
              <th className="p-3">Expiry</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredMembers.map((member) => {

              const statusClasses =
                member.status === "inactive"
                  ? "bg-red-100 text-red-700"
                  : member.daysLeft !== undefined && member.daysLeft <= 3
                  ? "bg-orange-100 text-orange-700"
                  : member.daysLeft !== undefined && member.daysLeft <= 7
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700";

              const statusLabel =
                member.status === "inactive"
                  ? "Expired"
                  : member.daysLeft !== undefined && member.daysLeft <= 3
                  ? `Expiring in ${member.daysLeft} days`
                  : member.daysLeft !== undefined && member.daysLeft <= 7
                  ? `Expires in ${member.daysLeft} days`
                  : "Active";

              return (
                <tr key={member.id} className="border-t">
                  {/* Name */}
                  <td className="p-3">
                    <Link
                      to={`/members/${member.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {member.name}
                    </Link>
                  </td>

                  {/* Phone */}
                  <td className="p-3">{member.phone}</td>

                  {/* Plan */}
                  <td className="p-3">
                    {getPlanName(member.planId)}
                  </td>
                  

                  {/* Status */}
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-sm ${statusClasses}`}
                    >
                      {statusLabel}
                    </span>
                  </td>

                  {/* Expiry */}
                  <td className="p-3">{member.expiryDate}</td>

                  {/* Action */}
                  <td className="p-3">
                    <button
                      onClick={() =>
                        renewMembership(member.id, member.planId, 3000)
                      }
                      className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Renew
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
