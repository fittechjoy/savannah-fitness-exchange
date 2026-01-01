import { useState } from "react";
import type { Member } from "../types/member";
import { useMembers } from "../context/MembersContext";


export default function AddMember() {
  const [formData, setFormData] = useState<Omit<Member, "id">>({
    name: "",
    phone: "",
    plan: "",
    status: "active",
    joinDate: "",
  });

  const { addMember } = useMembers();


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

  if (!formData.name || !formData.phone || !formData.plan) {
    setError("Please fill in all required fields.");
    return;
  }

  addMember(formData);
  setError("");
  alert("Member added successfully");

  setFormData({
    name: "",
    phone: "",
    plan: "",
    status: "active",
    joinDate: "",
  });
};


  return (
    <div className="max-w-xl bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Add Member</h1>

      {error && (
        <p className="mb-4 text-red-600 bg-red-50 p-2 rounded">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Full Name"
          className="w-full border p-2 rounded"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone Number"
          className="w-full border p-2 rounded"
          value={formData.phone}
          onChange={handleChange}
        />

        <select
          name="plan"
          className="w-full border p-2 rounded"
          value={formData.plan}
          onChange={handleChange}
        >
          <option value="">Select Plan</option>
          <option value="Monthly">Monthly</option>
          <option value="Quarterly">Quarterly</option>
          <option value="SemiAnnual">SemiAnnual</option>
          <option value="Annual">Annual</option>
        </select>

        <select
          name="status"
          className="w-full border p-2 rounded"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <input
          type="date"
          name="joinDate"
          className="w-full border p-2 rounded"
          value={formData.joinDate}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full bg-slate-900 text-white py-2 rounded hover:bg-slate-800"
        >
          Add Member
        </button>
      </form>
    </div>
  );
}
