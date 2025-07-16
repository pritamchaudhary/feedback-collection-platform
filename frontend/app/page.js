import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col">
      {/* Header */}
      <header className="w-full py-8 bg-white/80 shadow-md">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between px-6">
          <div>
            <h1 className="text-4xl font-extrabold text-blue-700 mb-2">Feedback Collection Platform</h1>
            <p className="text-lg text-gray-700">
              Collect, analyze, and act on customer feedback with ease.
            </p>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow transition">
              Login
            </Link>
            <Link href="/register" className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-2 px-6 rounded-lg shadow transition">
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="bg-white/90 shadow-2xl rounded-2xl p-10 max-w-2xl w-full text-center mt-10">
          <h2 className="text-3xl font-bold text-purple-700 mb-4">Why Use Our Platform?</h2>
          <p className="text-gray-700 mb-8">
            Empower your business with actionable insights. Create custom feedback forms, share them with your customers, and view responses in a beautiful dashboard.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-xl p-6 shadow flex flex-col items-center">
              <span className="text-3xl mb-2">📝</span>
              <h3 className="font-bold text-blue-700 mb-1">Easy Form Creation</h3>
              <p className="text-gray-600 text-sm">Admins can create feedback forms with text and multiple-choice questions.</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 shadow flex flex-col items-center">
              <span className="text-3xl mb-2">🔗</span>
              <h3 className="font-bold text-blue-700 mb-1">Shareable Links</h3>
              <p className="text-gray-600 text-sm">Generate public URLs for your forms and collect feedback from anyone.</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 shadow flex flex-col items-center">
              <span className="text-3xl mb-2">📊</span>
              <h3 className="font-bold text-blue-700 mb-1">Insightful Dashboard</h3>
              <p className="text-gray-600 text-sm">View all responses in a tabular and summary view. Export as CSV with one click.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 text-center text-gray-500 text-sm mt-10">
        &copy; {new Date().getFullYear()} Feedback Collection Platform. All rights reserved.
      </footer>
    </main>
  );
}