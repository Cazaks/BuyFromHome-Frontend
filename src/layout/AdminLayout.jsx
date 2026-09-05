import { Outlet, Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, Package, Tags, LogOut } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";
import { useAuth } from "../context/useAuth";
import { LayoutDashboard, Package, Tags, Layers, Ruler, LogOut } from "lucide-react";

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user || user.role !== "ADMIN") {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-900 dark:text-gray-50">
        <p className="text-xl font-bold">You don't have access to this page.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-white dark:bg-black text-gray-900 dark:text-gray-50">
      <aside className="w-64 shrink-0 bg-neutral-100 dark:bg-neutral-950 border-r border-gray-200 dark:border-gray-900 flex flex-col">
        <div className="p-6 border-b border-gray-200 dark:border-gray-900">
          <h1 className="text-lg font-bold">BuyFromHome <span className="text-primary-500">Admin</span></h1>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link to="/admin" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-900 transition-colors">
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          <Link to="/admin/products" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-900 transition-colors">
            <Package size={18} /> Products
          </Link>
          <Link to="/admin/categories" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-900 transition-colors">
            <Tags size={18} /> Categories
          </Link>

          <Link to="/admin/product-options" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-900 transition-colors">
            <Layers size={18} /> Product Options
          </Link>
          <Link to="/admin/selling-measurements" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-900 transition-colors">
            <Ruler size={18} /> Measurements
          </Link>

        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-gray-900 flex items-center justify-between">
          <ThemeToggle />
          <button
            onClick={() => { logout(); navigate("/"); }}
            className="flex items-center gap-2 text-sm hover:text-red-500 transition-colors"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}