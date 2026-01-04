import { useState } from "react";
import type { Member } from "../types/member";
import { useMembers } from "../context/MembersContext";
import { membershipPlans } from "../data/membershipPlans";

export default function AddMember() {
  const { addMember } = useMembers();

  const [formData, setFormData] = useState<
    Omit<Member, "id" | "expiryDate">
  >({
    name: "",
    phone: "",
    planId: "",
    status: "active",
    joinDate: "",
  });

  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.planId) {
      setError("Please fill in all required fields.");
      return;
    }

    addMember(formData);
    setError("");
    alert("Member added successfully");

    setFormData({
      name: "",
      phone: "",
      planId: "",
      status: "active",
      joinDate: "",
    });
  };

  return (
    <div className="p-4 md:p-6 flex justify-center">
      <div className="w-full max-w-xl bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-2">
          Savannah Fitness Exchange – Add Member
        </h1>

        <p className="text-sm text-gray-600 mb-6">
          Register a new gym member and assign a membership plan.
        </p>

        {error && (
          <p className="mb-4 text-red-600 bg-red-50 p-3 rounded text-sm">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Full Name
            </label>
            <input
              name="name"
              placeholder="e.g. John Doe"
              className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Phone Number
            </label>
            <input
              name="phone"
              placeholder="e.g. 07XXXXXXXX"
              className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          {/* Plan */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Membership Plan
            </label>
            <select
              name="planId"
              className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={formData.planId}
              onChange={handleChange}
            >
              <option value="">Select Plan</option>
              {membershipPlans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Status
            </label>
            <select
              name="status"
              className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Join Date */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Join Date
            </label>
            <input
              type="date"
              name="joinDate"
              className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={formData.joinDate}
              onChange={handleChange}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded hover:bg-orange-600 transition font-medium min-h-[44px]"
          >
            Add Member
          </button>
        </form>
      </div>
    </div>
  );
}
