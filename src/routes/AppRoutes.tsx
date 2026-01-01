import { Routes, Route } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import Dashboard from "../pages/Dashboard";
import Members from "../pages/Members";
import AddMember from "../pages/AddMember";
import Memberships from "../pages/Memberships";
import Payments from "../pages/Payments";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/members" element={<Members />} />
        <Route path="/add-member" element={<AddMember />} />
        <Route path="/memberships" element={<Memberships />} />
        <Route path="/payments" element={<Payments />} />
      </Route>
    </Routes>
  );
}
