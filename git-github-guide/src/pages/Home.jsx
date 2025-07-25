import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="p-6 min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4 text-green-400">📘 Git Guide</h1>
      <p className="mb-6 text-gray-300">Everything you need to know about Git.</p>

      <div className="flex flex-col gap-3 w-fit">
        <Link
          to="/ssh"
          className="bg-green-600 px-5 py-2 rounded-lg text-white hover:bg-green-700 transition w-fit"
        >
          Setup SSH Keys 🔑
        </Link>

        <Link
          to="/gitguide"
          className="bg-blue-600 px-5 py-2 rounded-lg text-white hover:bg-blue-700 transition w-fit"
        >
          Learn Git Commands & Concepts 📖
        </Link>
      </div>
    </div>
  );
}

export default Home;