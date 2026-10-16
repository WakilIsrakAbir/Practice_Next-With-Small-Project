import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
      {/* Background decorative gradients */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[480px] w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-500/15 via-purple-500/10 to-cyan-500/15 blur-3xl" />

      <div className="mx-auto w-full max-w-4xl text-center">
        {/* Main Heading */}
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
          What would you like to calculate?
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-zinc-600 sm:text-lg dark:text-zinc-400">
          Select one of the tools below to get started.
        </p>

        {/* 2 Cards in One Row Grid (2 Columns) */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Card 1: CGPA Calculator (Indigo Theme) */}
          <Link
            href="/cgpa-calculator"
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200/80 bg-white p-8 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-500/10 dark:border-zinc-800 dark:bg-zinc-900/70 dark:hover:border-indigo-500/80"
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-indigo-500/10 blur-2xl transition-all duration-500 group-hover:bg-indigo-500/20" />

            <div>
              {/* Image Icon */}
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 p-2.5 ring-1 ring-indigo-500/20 transition-transform duration-300 group-hover:scale-110 dark:bg-indigo-950/60 dark:ring-indigo-500/30">
                <img
                  src="/icons/cgpa.svg"
                  alt="CGPA Calculator"
                  className="h-full w-full object-contain"
                />
              </div>

              <h2 className="mt-6 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                CGPA Calculator
              </h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Calculate semester GPA and overall cumulative GPA based on course credit hours and grade points.
              </p>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                <span className="rounded-md bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                  Credit Weighted
                </span>
                <span className="rounded-md bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                  Semester & Cumulative
                </span>
              </div>
            </div>

            {/* Action link */}
            <div className="mt-8 flex items-center font-semibold text-indigo-600 transition-colors group-hover:text-indigo-700 dark:text-indigo-400 dark:group-hover:text-indigo-300">
              <span>Open CGPA Calculator &rarr;</span>
            </div>
          </Link>

          {/* Card 2: Normal Calculator (Cyan Theme) */}
          <Link
            href="/calculator"
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200/80 bg-white p-8 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-500/10 dark:border-zinc-800 dark:bg-zinc-900/70 dark:hover:border-cyan-500/80"
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-500/10 blur-2xl transition-all duration-500 group-hover:bg-cyan-500/20" />

            <div>
              {/* Image Icon */}
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-50 p-2.5 ring-1 ring-cyan-500/20 transition-transform duration-300 group-hover:scale-110 dark:bg-cyan-950/60 dark:ring-cyan-500/30">
                <img
                  src="/icons/calculator.svg"
                  alt="Normal Calculator"
                  className="h-full w-full object-contain"
                />
              </div>

              <h2 className="mt-6 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                Normal Calculator
              </h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Perform everyday mathematical operations like addition, subtraction, multiplication, division, and percentages.
              </p>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                <span className="rounded-md bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                  Standard Math
                </span>
                <span className="rounded-md bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                  Quick Keypad
                </span>
              </div>
            </div>

            {/* Action link */}
            <div className="mt-8 flex items-center font-semibold text-cyan-600 transition-colors group-hover:text-cyan-700 dark:text-cyan-400 dark:group-hover:text-cyan-300">
              <span>Open Normal Calculator &rarr;</span>
            </div>
          </Link>

          {/* Card 3: Character Counter (Emerald / Typography Theme - Unique from Normal Calculator) */}
          <Link
            href="/charecter-calculator"
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200/80 bg-white p-8 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400 hover:shadow-xl hover:shadow-emerald-500/10 dark:border-zinc-800 dark:bg-zinc-900/70 dark:hover:border-emerald-500/80"
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-500/10 blur-2xl transition-all duration-500 group-hover:bg-emerald-500/20" />

            <div>
              {/* Distinct Typography / Character Image Icon */}
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 p-2.5 ring-1 ring-emerald-500/20 transition-transform duration-300 group-hover:scale-110 dark:bg-emerald-950/60 dark:ring-emerald-500/30">
                <img
                  src="/icons/character.svg"
                  alt="Character Counter"
                  className="h-full w-full object-contain"
                />
              </div>

              <h2 className="mt-6 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                Character Counter
              </h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Count words, characters, and remaining text limits in real time with instant clipboard tools.
              </p>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                <span className="rounded-md bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                  Text Analysis
                </span>
                <span className="rounded-md bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                  Word & Char Limit
                </span>
              </div>
            </div>

            {/* Action link */}
            <div className="mt-8 flex items-center font-semibold text-emerald-600 transition-colors group-hover:text-emerald-700 dark:text-emerald-400 dark:group-hover:text-emerald-300">
              <span>Open Character Counter &rarr;</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
