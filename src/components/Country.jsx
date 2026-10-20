"use client";
import React, { useState } from "react";

export default function Country({ country, handleVisited }) {
  const [visited, setVisited] = useState(false);
  const { name, flags, capital, population, region } = country;

  const handleClick = () => {
    if (!visited) {
      setVisited(true);
      handleVisited(); // Increase count by addition
    }
  };

  return (
    <div
      className={`flex flex-col justify-between rounded-2xl border p-4 transition-all duration-200 ${
        visited
          ? "border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/10"
          : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
      }`}
    >
      <div>
        {/* Country Flag */}
        <img
          src={flags?.flags?.png}
          alt={name?.common}
          className="h-40 w-full rounded-xl object-cover"
        />

        {/* Country Details */}
        <div className="mt-4 space-y-1.5">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            {name?.common}
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            <strong>Capital:</strong> {capital?.capital?.[0] || "N/A"}
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            <strong>Region:</strong> {region?.region || "N/A"}
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            <strong>Population:</strong> {population?.population?.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Visited Button */}
      <button
        onClick={handleClick}
        className={`mt-5 w-full rounded-xl py-2.5 text-sm font-semibold transition active:scale-95 ${
          visited
            ? "bg-amber-500 text-black hover:bg-amber-400"
            : "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
        }`}
      >
        {visited ? "Visited ✓" : "Mark as Visited"}
      </button>
    </div>
  );
}
