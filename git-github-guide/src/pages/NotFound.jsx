import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="p-6 text-center">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <Link to="/" className="text-blue-400 underline mt-4 block">Go Home</Link>
    </div>
  );
}