import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import Dashboard from "../pages/Dashboard";
import Members from "../pages/Members";
import AddMember from "../pages/AddMember";
import Memberships from "../pages/Memberships";
import Payments from "../pages/Payments";
import MemberProfile from "../pages/MemberProfile";
import { useAuth } from "../context/AuthContext";

export default function AppRoutes() {
  const { role } = useAuth(); // ✅ hook INSIDE component

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/members" element={<Members />} />
        <Route path="/add-member" element={<AddMember />} />
        <Route path="/memberships" element={<Memberships />} />
        <Route path="/members/:id" element={<MemberProfile />} />

        {/* 🔐 Admin-only route */}
        <Route
          path="/payments"
          element={
            role === "admin" ? <Payments /> : <Navigate to="/" />
          }
        />
      </Route>
    </Routes>
  );
}
