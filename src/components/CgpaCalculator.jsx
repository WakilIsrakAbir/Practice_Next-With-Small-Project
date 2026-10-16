"use client";
import React, { useState, useMemo } from "react";

// Standard University 4.0 Grading Scale
const GRADE_OPTIONS = [
  { label: "A+ (4.00)", point: 4.0, letter: "A+" },
  { label: "A  (3.75)", point: 3.75, letter: "A" },
  { label: "A- (3.50)", point: 3.5, letter: "A-" },
  { label: "B+ (3.25)", point: 3.25, letter: "B+" },
  { label: "B  (3.00)", point: 3.0, letter: "B" },
  { label: "B- (2.75)", point: 2.75, letter: "B-" },
  { label: "C+ (2.50)", point: 2.5, letter: "C+" },
  { label: "C  (2.25)", point: 2.25, letter: "C" },
  { label: "D  (2.00)", point: 2.0, letter: "D" },
  { label: "F  (0.00)", point: 0.0, letter: "F" },
];

const INITIAL_COURSES = [
  { id: "c-1", name: "Data Structures & Algorithms", credits: "3.0", gradePoint: 4.0 },
  { id: "c-2", name: "Linear Algebra & Calculus", credits: "3.0", gradePoint: 3.75 },
  { id: "c-3", name: "Computer Networks", credits: "3.0", gradePoint: 3.5 },
  { id: "c-4", name: "Software Engineering Lab", credits: "1.5", gradePoint: 4.0 },
];

export default function CgpaCalculator() {
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [includePrevious, setIncludePrevious] = useState(false);
  const [prevCgpa, setPrevCgpa] = useState("");
  const [prevCredits, setPrevCredits] = useState("");

  // Add course row
  const addCourse = () => {
    const nextId = "c-" + Date.now();
    setCourses((prev) => [
      ...prev,
      {
        id: nextId,
        name: `Course ${prev.length + 1}`,
        credits: "3.0",
        gradePoint: 4.0,
      },
    ]);
  };

  // Remove course row
  const removeCourse = (id) => {
    if (courses.length <= 1) return;
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  // Update course field
  const updateCourse = (id, field, value) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  // Reset to default
  const handleReset = () => {
    setCourses(INITIAL_COURSES);
    setIncludePrevious(false);
    setPrevCgpa("");
    setPrevCredits("");
  };

  // Calculations
  const stats = useMemo(() => {
    let semesterCredits = 0;
    let semesterPoints = 0;

    courses.forEach((c) => {
      const cr = parseFloat(c.credits) || 0;
      const gp = parseFloat(c.gradePoint) || 0;
      if (cr > 0) {
        semesterCredits += cr;
        semesterPoints += cr * gp;
      }
    });

    const semesterGpa = semesterCredits > 0 ? semesterPoints / semesterCredits : 0;

    const pCgpa = parseFloat(prevCgpa) || 0;
    const pCredits = parseFloat(prevCredits) || 0;

    let totalCredits = semesterCredits;
    let totalPoints = semesterPoints;

    if (includePrevious && pCredits > 0) {
      totalCredits += pCredits;
      totalPoints += pCgpa * pCredits;
    }

    const cumulativeCgpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
    const currentScore = includePrevious && pCredits > 0 ? cumulativeCgpa : semesterGpa;

    // Academic Standing evaluation
    let standing = "Needs Improvement";
    let badgeColor = "bg-rose-500/10 text-rose-500 border-rose-500/20";
    let dotColor = "bg-rose-500";

    if (currentScore >= 3.75) {
      standing = "Distinction / First Class";
      badgeColor = "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      dotColor = "bg-emerald-400";
    } else if (currentScore >= 3.25) {
      standing = "Very Good Standing";
      badgeColor = "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
      dotColor = "bg-cyan-400";
    } else if (currentScore >= 2.75) {
      standing = "Satisfactory Standing";
      badgeColor = "bg-blue-500/10 text-blue-400 border-blue-500/20";
      dotColor = "bg-blue-400";
    } else if (currentScore >= 2.0) {
      standing = "Pass / Average";
      badgeColor = "bg-amber-500/10 text-amber-400 border-amber-500/20";
      dotColor = "bg-amber-400";
    }

    return {
      semesterCredits,
      semesterPoints,
      semesterGpa,
      cumulativeCgpa,
      totalCredits,
      standing,
      badgeColor,
      dotColor,
    };
  }, [courses, includePrevious, prevCgpa, prevCredits]);

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      {/* Hero Overview Card */}
      <div className="relative overflow-hidden rounded-3xl border border-zinc-200/80 bg-zinc-900 p-6 text-zinc-100 shadow-xl dark:border-zinc-800 sm:p-8">
        {/* Subtle decorative background glow */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-cyan-500/15 blur-3xl" />

        <div className="relative z-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          {/* Main Score Display */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                {includePrevious ? "Overall Cumulative CGPA" : "Semester GPA"}
              </span>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${stats.badgeColor}`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${stats.dotColor} animate-pulse`} />
                {stats.standing}
              </span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-6xl font-black tracking-tight text-white sm:text-7xl">
                {(includePrevious ? stats.cumulativeCgpa : stats.semesterGpa).toFixed(2)}
              </span>
              <span className="text-sm font-medium text-zinc-400">/ 4.00 Scale</span>
            </div>

            {includePrevious && (
              <p className="text-xs text-zinc-400">
                Current Semester GPA:{" "}
                <span className="font-semibold text-zinc-200">{stats.semesterGpa.toFixed(2)}</span>
              </p>
            )}
          </div>

          {/* Quick Metrics & Actions */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center lg:flex-col lg:items-end">
            <div className="grid grid-cols-2 gap-3 sm:flex">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 px-4 py-3 text-center sm:min-w-[120px]">
                <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-400">
                  Total Credits
                </span>
                <div className="mt-1 text-2xl font-bold text-white">
                  {stats.totalCredits}
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 px-4 py-3 text-center sm:min-w-[120px]">
                <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-400">
                  Quality Points
                </span>
                <div className="mt-1 text-2xl font-bold text-cyan-400">
                  {stats.semesterPoints.toFixed(1)}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                className="rounded-xl border border-zinc-700/80 px-4 py-2 text-xs font-semibold text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
              >
                Reset
              </button>
              <button
                onClick={addCourse}
                className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-600/30 transition hover:bg-indigo-500"
              >
                + Add Course
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Container */}
      <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
        {/* Section Header with Prior CGPA Toggle */}
        <div className="mb-6 flex flex-col justify-between gap-4 border-b border-zinc-100 pb-5 dark:border-zinc-800 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Course Details
            </h2>
            <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
              Enter your course titles, credit hours, and expected grades.
            </p>
          </div>

          <button
            onClick={() => setIncludePrevious(!includePrevious)}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition ${
              includePrevious
                ? "border border-indigo-500/40 bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-300"
                : "border border-zinc-200 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                includePrevious ? "bg-indigo-500" : "bg-zinc-400"
              }`}
            />
            {includePrevious ? "Including Prior CGPA" : "+ Add Prior CGPA / Credits"}
          </button>
        </div>

        {/* Prior CGPA Input Box (Visible only when toggled) */}
        {includePrevious && (
          <div className="mb-6 rounded-2xl border border-indigo-200/60 bg-indigo-50/60 p-4 dark:border-indigo-900/40 dark:bg-indigo-950/30">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
                Prior Academic Record
              </span>
              <button
                onClick={() => setIncludePrevious(false)}
                className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              >
                ✕ Close
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                  Prior Cumulative CGPA
                </label>
                <input
                  type="number"
                  min="0"
                  max="4"
                  step="0.01"
                  placeholder="e.g. 3.65"
                  value={prevCgpa}
                  onChange={(e) => setPrevCgpa(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-sm text-zinc-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                  Prior Completed Credits
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  placeholder="e.g. 45"
                  value={prevCredits}
                  onChange={(e) => setPrevCredits(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-sm text-zinc-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
                />
              </div>
            </div>
          </div>
        )}

        {/* Table Column Headers (Desktop) */}
        <div className="hidden grid-cols-12 gap-3 px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 sm:grid">
          <div className="col-span-1 text-center">#</div>
          <div className="col-span-5">Course Title</div>
          <div className="col-span-2">Credits</div>
          <div className="col-span-3">Grade (Point)</div>
          <div className="col-span-1 text-center">Remove</div>
        </div>

        {/* Courses Rows */}
        <div className="space-y-2.5">
          {courses.map((course, index) => {
            const cr = parseFloat(course.credits) || 0;
            const gp = parseFloat(course.gradePoint) || 0;
            const pointsEarned = (cr * gp).toFixed(2);

            return (
              <div
                key={course.id}
                className="group flex flex-col gap-3 rounded-2xl border border-zinc-100 bg-zinc-50/70 p-3.5 transition hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-zinc-950/40 dark:hover:border-zinc-700 sm:grid sm:grid-cols-12 sm:items-center sm:gap-3"
              >
                {/* Index badge */}
                <div className="flex items-center justify-between sm:col-span-1 sm:justify-center">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-zinc-200/80 text-xs font-bold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                    {index + 1}
                  </span>
                  {/* Mobile delete button */}
                  <button
                    onClick={() => removeCourse(course.id)}
                    disabled={courses.length <= 1}
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-rose-50 hover:text-rose-500 disabled:opacity-30 sm:hidden dark:hover:bg-rose-950/40"
                  >
                    ✕
                  </button>
                </div>

                {/* Course Name */}
                <div className="sm:col-span-5">
                  <input
                    type="text"
                    placeholder="e.g. CSE 110"
                    value={course.name}
                    onChange={(e) => updateCourse(course.id, "name", e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-sm text-zinc-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
                  />
                </div>

                {/* Credits */}
                <div className="sm:col-span-2">
                  <div className="flex items-center sm:block">
                    <span className="w-16 text-xs text-zinc-400 sm:hidden">Credits:</span>
                    <input
                      type="number"
                      min="0"
                      step="0.5"
                      placeholder="3.0"
                      value={course.credits}
                      onChange={(e) => updateCourse(course.id, "credits", e.target.value)}
                      className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-sm text-zinc-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
                    />
                  </div>
                </div>

                {/* Grade Select */}
                <div className="sm:col-span-3">
                  <div className="flex items-center sm:block">
                    <span className="w-16 text-xs text-zinc-400 sm:hidden">Grade:</span>
                    <select
                      value={course.gradePoint}
                      onChange={(e) =>
                        updateCourse(course.id, "gradePoint", parseFloat(e.target.value))
                      }
                      className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-sm font-medium text-zinc-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
                    >
                      {GRADE_OPTIONS.map((g) => (
                        <option key={g.label} value={g.point}>
                          {g.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Delete button (Desktop) */}
                <div className="hidden text-center sm:col-span-1 sm:block">
                  <button
                    onClick={() => removeCourse(course.id)}
                    disabled={courses.length <= 1}
                    title="Remove Course"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-rose-50 hover:text-rose-500 disabled:cursor-not-allowed disabled:opacity-20 dark:hover:bg-rose-950/40"
                  >
                    ✕
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add Course dashed action */}
        <div className="mt-5">
          <button
            onClick={addCourse}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-zinc-200 py-3.5 text-sm font-semibold text-zinc-600 transition hover:border-indigo-400 hover:bg-indigo-50/30 hover:text-indigo-600 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-indigo-500 dark:hover:bg-indigo-950/20 dark:hover:text-indigo-400"
          >
            + Add Another Course
          </button>
        </div>
      </div>
    </div>
  );
}