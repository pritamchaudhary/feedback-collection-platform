"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

export default function PublicForm() {
  const params = useParams();
  const publicId = params.publicId;
  const [form, setForm] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/forms/public/${publicId}`)
      .then(res => {
        setForm(res.data);
        setAnswers(res.data.questions.map(() => ""));
      });
  }, [publicId]);

  const handleChange = (i, value) => {
    const newAnswers = [...answers];
    newAnswers[i] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post(`http://localhost:5000/api/responses/${publicId}`, {
      answers: form.questions.map((q, i) => ({
        questionId: q._id,
        answer: answers[i]
      }))
    });
    setSubmitted(true);
  };

  if (!form) return <div>Loading...</div>;
  if (submitted) return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="bg-white/90 shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-4">Thank you for your feedback!</h2>
      </div>
    </div>
  );

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <form onSubmit={handleSubmit} className="bg-white/90 shadow-xl rounded-2xl p-8 max-w-md w-full flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">{form.title}</h2>
        {form.questions.map((q, i) => (
          <div key={q._id} className="mb-2">
            <label className="block mb-1 font-semibold">{q.label}</label>
            {q.type === "text" ? (
              <input
                className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={answers[i]}
                onChange={e => handleChange(i, e.target.value)}
                required
              />
            ) : (
              <div className="flex flex-col gap-1">
                {q.options.map(opt => (
                  <label key={opt} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`q${i}`}
                      value={opt}
                      checked={answers[i] === opt}
                      onChange={e => handleChange(i, opt)}
                      required
                    />
                    {opt}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded" type="submit">Submit</button>
      </form>
    </main>
  );
}