import Link from "next/link";
import Calculator from "@/components/Calculator";

export const metadata = {
  title: "Normal Calculator - Practice Next",
  description: "Perform standard calculations with ease.",
};

export default function CalculatorPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-10 sm:px-6 lg:px-8">
      {/* Breadcrumb Navigation */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
        <Link href="/" className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100">
          Home
        </Link>
        <span>/</span>
        <span className="font-medium text-zinc-900 dark:text-zinc-100">Normal Calculator</span>
      </nav>

      {/* Calculator Container */}
      <div className="mt-2 flex flex-1 items-center justify-center py-4">
        <Calculator />
      </div>
    </div>
  );
}
