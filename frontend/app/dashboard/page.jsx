"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Dashboard() {
  const { token, name, logout } = useAuth();
  const [forms, setForms] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }
    axios
      .get("http://localhost:5000/api/forms", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setForms(res.data));
  }, [token, router]);

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-2">Welcome, {name}</h2>
      <button className="mb-4 text-red-500" onClick={logout}>Logout</button>
      <div className="mb-4">
        <Link href="/form/new" className="bg-green-500 text-white px-4 py-2 rounded">Create New Form</Link>
      </div>
      <h3 className="text-xl font-semibold mb-2">Your Forms</h3>
      <ul>
        {forms.map(f => (
          <li key={f._id} className="mb-2">
            <span className="font-medium">{f.title}</span> -{" "}
            <a href={`/f/${f.publicId}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Share Link</a>{" "}
            <Link href={`/form/${f._id}/responses`} className="text-blue-500 underline ml-2">View Responses</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}