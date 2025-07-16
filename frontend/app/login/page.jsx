"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const router = useRouter();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const logoutMsg = localStorage.getItem("logoutMessage");
    if (logoutMsg) {
      setSuccess(logoutMsg);
      localStorage.removeItem("logoutMessage");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      login(res.data.token, res.data.name);
      setSuccess("Logged in successfully!");
      setTimeout(() => router.push("/dashboard"), 1200); // Redirect after showing message
    } catch (err) {
      setError("Username or password is incorrect.");
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <form onSubmit={handleSubmit} className="bg-white/90 shadow-xl rounded-2xl p-8 w-full max-w-md flex flex-col gap-4">
        <h2 className="text-3xl font-bold text-blue-700 mb-2">Admin Login</h2>
        {success && <div className="bg-green-100 text-green-700 px-4 py-2 rounded">{success}</div>}
        {error && <div className="bg-red-100 text-red-700 px-4 py-2 rounded">{error}</div>}
        <input
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded" type="submit">Login</button>
        <p className="text-sm text-gray-600 mt-2">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">Register</Link>
        </p>
      </form>
    </main>
  );
}