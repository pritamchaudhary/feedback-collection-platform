"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", { email, password, name });
      router.push("/login");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <form onSubmit={handleSubmit} className="bg-white/90 shadow-xl rounded-2xl p-8 w-full max-w-md flex flex-col gap-4">
        <h2 className="text-3xl font-bold text-blue-700 mb-2">Register</h2>
        <input
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
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
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded" type="submit">Register</button>
        <p className="text-sm text-gray-600 mt-2">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">Login here</Link>
        </p>
      </form>
    </main>
  );
}