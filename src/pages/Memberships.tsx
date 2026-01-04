import { membershipPlans } from "../data/membershipPlans";

export default function Memberships() {
  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-2">
        Savannah Fitness Exchange – Membership Plans
      </h1>

      <p className="text-sm text-gray-600 mb-6">
        Available membership options and durations.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {membershipPlans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white rounded-lg shadow p-5 hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-slate-900">
              {plan.name}
            </h2>

            <p className="text-gray-500 mt-2 text-sm">
              Duration
            </p>

            <p className="mt-1 inline-block px-3 py-1 rounded bg-orange-100 text-orange-700 text-sm font-medium">
              {plan.durationMonths} months
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
