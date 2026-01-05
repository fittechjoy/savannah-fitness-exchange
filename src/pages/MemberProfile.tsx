import { useParams } from "react-router-dom";
import { useMembers } from "../context/MembersContext";
import { membershipPlans } from "../data/membershipPlans";
import { QRCodeSVG } from "qrcode.react";


export default function MemberProfile() {
  const { id } = useParams<{ id: string }>();
  const { members, payments, renewMembership } = useMembers();

  const member = members.find((m) => m.id === id);

  if (!member) {
    return (
      <p className="p-4 text-red-600">
        Member not found
      </p>
    );
  }

  const planName =
    membershipPlans.find((p) => p.id === member.planId)?.name ||
    "Unknown";

  const memberPayments = payments.filter(
    (p) => p.memberId === member.id
  );

  const statusBadge =
    member.status === "inactive"
      ? "bg-red-100 text-red-700"
      : member.daysLeft !== undefined && member.daysLeft <= 3
      ? "bg-orange-100 text-orange-700"
      : member.daysLeft !== undefined && member.daysLeft <= 7
      ? "bg-yellow-100 text-yellow-700"
      : "bg-green-100 text-green-700";

  // 🔑 QR should point to a real check-in URL
  const checkInUrl = `${window.location.origin}/checkin/${member.id}`;

  return (
    <div className="p-4 md:p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        {member.name}
      </h1>

      {/* Member Info */}
      <div className="bg-white rounded-lg shadow p-6 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-500">
            Status
          </span>
          <span
            className={`px-2 py-1 rounded text-sm ${statusBadge}`}
          >
            {member.status === "inactive"
              ? "Expired"
              : member.daysLeft !== undefined &&
                member.daysLeft <= 7
              ? `Expires in ${member.daysLeft} days`
              : "Active"}
          </span>
        </div>

        <p>
          <strong>Phone:</strong> {member.phone}
        </p>

        <p>
          <strong>Plan:</strong> {planName}
        </p>

        <p>
          <strong>Join Date:</strong> {member.joinDate}
        </p>

        <p>
          <strong>Expiry Date:</strong> {member.expiryDate}
        </p>

        <button
          onClick={() =>
            renewMembership(member.id, member.planId, 3000)
          }
          className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 min-h-[44px]"
        >
          Renew Membership
        </button>
      </div>

      {/* QR CHECK-IN */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-semibold mb-2">
          Member Check-In QR Code
        </h3>

        <div className="flex justify-center my-4">
          <QRCodeSVG
            value={checkInUrl}
            size={160}
            bgColor="#ffffff"
            fgColor="#000000"
              />

        </div>

        <p className="text-sm text-gray-500 text-center">
          Scan this code at the entrance to check in.
        </p>
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <h2 className="text-xl font-semibold p-4 border-b">
          Payment History
        </h2>

        {memberPayments.length === 0 ? (
          <p className="p-4 text-gray-500">
            No payments recorded yet
          </p>
        ) : (
          <table className="min-w-[500px] w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Date</th>
                <th className="p-3">Plan</th>
                <th className="p-3">Amount (KES)</th>
              </tr>
            </thead>
            <tbody>
              {memberPayments.map((payment) => (
                <tr
                  key={payment.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-3">
                    {payment.date}
                  </td>
                  <td className="p-3">
                    {planName}
                  </td>
                  <td className="p-3 font-medium text-green-600">
                    KES {payment.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
