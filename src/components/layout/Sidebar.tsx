import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
  const { role } = useAuth(); // ✅ hook INSIDE component

  const links = [
    { name: "Dashboard", path: "/" },
    { name: "Members", path: "/members" },
    { name: "Add Member", path: "/add-member" },
    { name: "Memberships", path: "/memberships" },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-6">
      <h1 className="text-xl font-bold mb-8">Gym System</h1>

      <nav className="flex flex-col gap-4">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `rounded px-3 py-2 transition ${
                isActive
                  ? "bg-slate-700"
                  : "hover:bg-slate-800"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}

        {/* ✅ Admin-only link */}
        {role === "admin" && (
          <NavLink
            to="/payments"
            className={({ isActive }) =>
              `rounded px-3 py-2 transition ${
                isActive
                  ? "bg-slate-700"
                  : "hover:bg-slate-800"
              }`
            }
          >
            Payments
          </NavLink>
        )}
      </nav>
    </aside>
  );
}
