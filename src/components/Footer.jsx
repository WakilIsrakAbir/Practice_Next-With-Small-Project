import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-950">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
          <span>&copy; {new Date().getFullYear()} Practice Next. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <Link
            href="/cgpa-calculator"
            className="text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            CGPA Calculator
          </Link>
          <Link
            href="/calculator"
            className="text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            Normal Calculator
          </Link>
        </div>
      </div>
    </footer>
  );
}
