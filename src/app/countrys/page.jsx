"use client";
import { useState, useEffect } from "react";
import Country from "@/components/Country";

export default function CountriesPage() {
  const [countries, setCountries] = useState([]);
  const [visitedCount, setVisitedCount] = useState(0);

  // Fetch API data on page load
  useEffect(() => {
    fetch("https://openapi.programming-hero.com/api/all")
      .then((res) => res.json())
      .then((data) => setCountries(data));
  }, []);

  // Update visited count (+1 when marked visited, -1 when unvisited)
  const handleVisited = (isVisited) => {
    setVisitedCount((prev) => (isVisited ? prev + 1 : prev - 1));
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      {/* Header & Stats */}
      <div className="mb-8 flex flex-col justify-between gap-4 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100 sm:text-3xl">
            Countries Visited
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Manage and track the countries you have traveled to.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-zinc-100 px-4 py-2 text-center dark:bg-zinc-800">
            <span className="text-xs text-zinc-500 dark:text-zinc-400">Total Countries</span>
            <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{countries.length}</p>
          </div>
          <div className="rounded-xl bg-amber-500/10 px-4 py-2 text-center">
            <span className="text-xs text-amber-500">Visited Count</span>
            <p className="text-xl font-bold text-amber-500">{visitedCount}</p>
          </div>
        </div>
      </div>

      {/* Loading indicator */}
      {countries.length === 0 && (
        <p className="py-20 text-center text-zinc-500">Loading countries...</p>
      )}

      {/* Countries Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {countries.map((country) => (
          <Country
            key={country.cca3?.cca3 || country.name?.common}
            country={country}
            handleVisited={handleVisited}
          />
        ))}
      </div>
    </div>
  );
}