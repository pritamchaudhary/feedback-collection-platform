"use client";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function FormBuilder() {
  const { token } = useAuth();
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    { label: "", type: "text", options: [] },
    { label: "", type: "text", options: [] },
    { label: "", type: "text", options: [] }
  ]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  // Handle question label/type change
  const handleQuestionChange = (i, field, value) => {
    const newQuestions = [...questions];
    newQuestions[i][field] = value;
    if (field === "type" && value === "mcq") newQuestions[i].options = ["", ""];
    if (field === "type" && value === "text") newQuestions[i].options = [];
    setQuestions(newQuestions);
  };

  // Handle MCQ option change
  const handleOptionChange = (qi, oi, value) => {
    const newQuestions = [...questions];
    newQuestions[qi].options[oi] = value;
    setQuestions(newQuestions);
  };

  // Add/remove questions
  const addQuestion = () => {
    if (questions.length < 5) setQuestions([...questions, { label: "", type: "text", options: [] }]);
  };
  const removeQuestion = i => {
    if (questions.length > 3) setQuestions(questions.filter((_, idx) => idx !== i));
  };

  // Add/remove MCQ options
  const addOption = (qi) => {
    const newQuestions = [...questions];
    if (newQuestions[qi].options.length < 5) newQuestions[qi].options.push("");
    setQuestions(newQuestions);
  };
  const removeOption = (qi, oi) => {
    const newQuestions = [...questions];
    if (newQuestions[qi].options.length > 2) newQuestions[qi].options.splice(oi, 1);
    setQuestions(newQuestions);
  };

  // Form submission
  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setSuccess("");
    // Validation
    if (!title.trim()) {
      setError("Form title is required.");
      return;
    }
    for (let q of questions) {
      if (!q.label.trim()) {
        setError("All questions must have a label.");
        return;
      }
      if (q.type === "mcq") {
        if (q.options.length < 2) {
          setError("Each MCQ must have at least 2 options.");
          return;
        }
        if (q.options.some(opt => !opt.trim())) {
          setError("MCQ options cannot be empty.");
          return;
        }
      }
    }
    try {
      await axios.post(
        "http://localhost:5000/api/forms",
        { title, questions },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess("Form created successfully!");
      setTimeout(() => router.push("/dashboard"), 1200);
    } catch {
      setError("Form creation failed. Please try again.");
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white/95 shadow-2xl rounded-2xl p-8 w-full max-w-2xl flex flex-col gap-6"
      >
        <h2 className="text-3xl font-bold text-blue-700 mb-2 text-center">Create New Feedback Form</h2>
        {error && <div className="bg-red-100 text-red-700 px-4 py-2 rounded">{error}</div>}
        {success && <div className="bg-green-100 text-green-700 px-4 py-2 rounded">{success}</div>}

        {/* Form Title */}
        <div>
          <label className="block font-semibold mb-1">Form Title</label>
          <input
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter form title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {questions.map((q, i) => (
            <div key={i} className="bg-blue-50 rounded-xl p-4 shadow flex flex-col gap-2 relative">
              <div className="flex items-center gap-2">
                <span className="font-bold text-blue-700">Q{i + 1}.</span>
                <input
                  className="border p-2 rounded flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Question"
                  value={q.label}
                  onChange={e => handleQuestionChange(i, "label", e.target.value)}
                  required
                />
                <select
                  className="border p-2 rounded"
                  value={q.type}
                  onChange={e => handleQuestionChange(i, "type", e.target.value)}
                >
                  <option value="text">Text</option>
                  <option value="mcq">Multiple Choice</option>
                </select>
                {questions.length > 3 && (
                  <button
                    type="button"
                    className="ml-2 text-red-500 hover:text-red-700 font-bold"
                    onClick={() => removeQuestion(i)}
                    title="Remove question"
                  >
                    &times;
                  </button>
                )}
              </div>
              {/* MCQ Options */}
              {q.type === "mcq" && (
                <div className="pl-8 flex flex-col gap-2">
                  {q.options.map((opt, oi) => (
                    <div key={oi} className="flex items-center gap-2">
                      <input
                        className="border p-2 rounded flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder={`Option ${oi + 1}`}
                        value={opt}
                        onChange={e => handleOptionChange(i, oi, e.target.value)}
                        required
                      />
                      {q.options.length > 2 && (
                        <button
                          type="button"
                          className="text-red-400 hover:text-red-700 font-bold"
                          onClick={() => removeOption(i, oi)}
                          title="Remove option"
                        >
                          &times;
                        </button>
                      )}
                    </div>
                  ))}
                  {q.options.length < 5 && (
                    <button
                      type="button"
                      className="text-blue-600 hover:underline text-sm mt-1"
                      onClick={() => addOption(i)}
                    >
                      + Add Option
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add Question Button */}
        {questions.length < 5 && (
          <button
            type="button"
            className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold py-2 px-4 rounded transition"
            onClick={addQuestion}
          >
            + Add Question
          </button>
        )}

        {/* Submit */}
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition"
          type="submit"
        >
          Create Form
        </button>
      </form>
    </main>
  );
}