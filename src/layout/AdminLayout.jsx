import { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, Package, Tags, Layers, Ruler, ShoppingBag, LogOut, Menu, X } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";
import { useAuth } from "../context/useAuth";

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user || user.role !== "ADMIN") {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-900 dark:text-gray-50">
        <p className="text-xl font-bold">You don't have access to this page.</p>
      </div>
    );
  }

  const navLinks = (
    <>
      <Link to="/admin" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-900 transition-colors">
        <LayoutDashboard size={18} /> Dashboard
      </Link>
      <Link to="/admin/products" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-900 transition-colors">
        <Package size={18} /> Products
      </Link>
      <Link to="/admin/categories" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-900 transition-colors">
        <Tags size={18} /> Categories
      </Link>
      <Link to="/admin/product-options" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-900 transition-colors">
        <Layers size={18} /> Product Options
      </Link>
      <Link to="/admin/selling-measurements" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-900 transition-colors">
        <Ruler size={18} /> Measurements
      </Link>
      <Link to="/admin/orders" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-900 transition-colors">
        <ShoppingBag size={18} /> Orders
      </Link>
    </>
  );

  return (
    <div className="min-h-screen flex bg-white dark:bg-black text-gray-900 dark:text-gray-50">
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 bg-neutral-100 dark:bg-neutral-950 border-b border-gray-200 dark:border-gray-900">
        <h1 className="text-lg font-bold">BuyFromHome <span className="text-primary-500">Admin</span></h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="cursor-pointer">
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar — off-canvas on mobile, static on desktop */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 shrink-0 bg-neutral-100 dark:bg-neutral-950 border-r border-gray-200 dark:border-gray-900 flex flex-col z-50 transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-900 hidden md:block">
          <h1 className="text-lg font-bold">BuyFromHome <span className="text-primary-500">Admin</span></h1>
        </div>
        <nav className="flex-1 p-4 space-y-1 mt-16 md:mt-0">{navLinks}</nav>
        <div className="p-4 border-t border-gray-200 dark:border-gray-900 flex items-center justify-between">
          <ThemeToggle />
          <button
            onClick={() => { logout(); navigate("/"); }}
            className="flex items-center gap-2 text-sm hover:text-red-500 transition-colors cursor-pointer"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Backdrop when mobile sidebar is open */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="flex-1 p-4 md:p-8 pt-20 md:pt-8 w-full">
        <Outlet />
      </main>
    </div>
  );
}