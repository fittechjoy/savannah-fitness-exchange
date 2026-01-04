import { useMembers } from "../context/MembersContext";
import { membershipPlans } from "../data/membershipPlans";

export default function Payments() {
  const { payments } = useMembers();

  const getPlanName = (planId: string) =>
    membershipPlans.find((p) => p.id === planId)?.name || "Unknown";

  const totalRevenue = payments.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6">
        Savannah Fitness Exchange – Payments
      </h1>

      {/* Revenue Summary */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <p className="text-gray-500 text-sm">
          Total Revenue
        </p>
        <p className="text-3xl font-bold text-slate-900">
          KES {totalRevenue.toLocaleString()}
        </p>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-[600px] w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Date</th>
              <th className="p-3">Member ID</th>
              <th className="p-3">Plan</th>
              <th className="p-3">Amount (KES)</th>
            </tr>
          </thead>

          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="p-6 text-center text-gray-500"
                >
                  No payments recorded yet
                </td>
              </tr>
            ) : (
              payments.map((payment) => (
                <tr
                  key={payment.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-3">{payment.date}</td>

                  <td className="p-3 text-sm text-gray-600">
                    {payment.memberId}
                  </td>

                  <td className="p-3">
                    {getPlanName(payment.planId)}
                  </td>

                  <td className="p-3 font-medium text-green-600">
                    KES {payment.amount.toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
