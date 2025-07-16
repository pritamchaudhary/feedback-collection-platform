"use client";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const { name, token, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  if (
    pathname === "/" ||
    pathname.startsWith("/f/") ||
    pathname === "/login" ||
    pathname === "/register"
  ) return null;

  if (!token) return null;

  const handleLogout = () => {
    logout();
    // Set a flag in localStorage to show the message on login page
    localStorage.setItem("logoutMessage", "Logged out successfully!");
    router.push("/login");
  };

  return (
    <nav className="bg-blue-700 text-white px-6 py-3 flex items-center justify-between shadow">
      <div className="flex items-center gap-6">
        <Link href="/dashboard" className="font-bold text-xl hover:text-blue-200">Feedback Platform</Link>
        <Link href="/form/new" className="hover:text-blue-200">Create Form</Link>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-semibold">{name}</span>
        <button
          onClick={handleLogout}
          className="bg-white text-blue-700 px-3 py-1 rounded hover:bg-blue-100"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}