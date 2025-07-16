"use client";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../../context/AuthContext";
import { useParams } from "next/navigation";

export default function FormResponses() {
  const { token } = useAuth();
  const params = useParams();
  const id = params.id;
  const [responses, setResponses] = useState([]);
  const [summary, setSummary] = useState({});
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    axios.get(`http://localhost:5000/api/forms/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setForm(res.data));
    axios.get(`http://localhost:5000/api/responses/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setResponses(res.data));
    axios.get(`http://localhost:5000/api/responses/${id}/summary`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setSummary(res.data))
      .finally(() => setLoading(false));
  }, [id, token]);

  const exportCSV = () => {
    window.open(`http://localhost:5000/api/responses/${id}/export?token=${token}`, "_blank");
  };

  if (loading || !form) return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="text-xl text-blue-700 font-bold">Loading...</div>
    </div>
  );

  return (
    <main className="flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 py-10">
      <div className="bg-white/95 shadow-2xl rounded-2xl p-8 w-full max-w-3xl flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-blue-700 mb-2">Responses for: {form.title}</h2>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded shadow w-fit mb-4"
          onClick={exportCSV}
        >
          Export as CSV
        </button>
        <h3 className="text-xl font-semibold mb-2 text-purple-700">Summary</h3>
        <pre className="bg-gray-100 p-2 mb-4 rounded text-sm overflow-x-auto">{JSON.stringify(summary, null, 2)}</pre>
        <h3 className="text-xl font-semibold mb-2 text-purple-700">All Responses</h3>
        {responses.length === 0 ? (
          <div className="text-gray-500 text-center py-8">No responses yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border p-2">Submitted At</th>
                  {form.questions.map(q => (
                    <th className="border p-2" key={q._id}>{q.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {responses.map(r => (
                  <tr key={r._id} className="even:bg-blue-50">
                    <td className="border p-2">{new Date(r.submittedAt).toLocaleString()}</td>
                    {r.answers.map(a => (
                      <td className="border p-2" key={a.questionId}>{a.answer}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}