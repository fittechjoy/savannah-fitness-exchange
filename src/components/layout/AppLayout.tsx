import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState } from "react";

export default function AppLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar (desktop) */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile sidebar */}
      {open && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="w-64">
            <Sidebar />
          </div>
          <div
            className="flex-1 bg-black/50"
            onClick={() => setOpen(false)}
          />
        </div>
      )}

      {/* Main content */}
      <div className="flex-1">
        {/* Mobile header */}
        <header className="md:hidden flex items-center justify-between bg-white px-4 py-3 shadow">
          <button
            onClick={() => setOpen(true)}
            className="text-slate-900 font-bold"
          >
            ☰
          </button>
          <span className="font-semibold">
            Savannah Fitness Exchange
          </span>
        </header>

        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
