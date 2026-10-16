"use client";
import React, { useState, useEffect, useCallback } from "react";

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [prevValue, setPrevValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);
  const [history, setHistory] = useState("");
  const [copied, setCopied] = useState(false);

  // Clean arithmetic helper to prevent JS floating-point issues (0.1 + 0.2 = 0.30000000000000004)
  const formatResult = (num) => {
    if (isNaN(num) || !isFinite(num)) return "Error";
    // Round to 10 decimal places to eliminate floating precision bugs, then parse back to number
    const rounded = Math.round(num * 1e10) / 1e10;
    return String(rounded);
  };

  // Input numbers (0-9)
  const inputDigit = useCallback((digit) => {
    setDisplay((current) => {
      if (waitingForNewValue || current === "0" || current === "Error") {
        setWaitingForNewValue(false);
        return String(digit);
      }
      // Maximum 14 digits to keep display readable
      if (current.replace("-", "").replace(".", "").length >= 14) {
        return current;
      }
      return current + digit;
    });
  }, [waitingForNewValue]);

  // Input decimal point
  const inputDecimal = useCallback(() => {
    if (waitingForNewValue || display === "Error") {
      setDisplay("0.");
      setWaitingForNewValue(false);
      return;
    }
    if (!display.includes(".")) {
      setDisplay((current) => current + ".");
    }
  }, [waitingForNewValue, display]);

  // All Clear (AC)
  const clearAll = useCallback(() => {
    setDisplay("0");
    setPrevValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
    setHistory("");
  }, []);

  // Backspace (⌫)
  const handleBackspace = useCallback(() => {
    if (waitingForNewValue || display === "Error") {
      setDisplay("0");
      setWaitingForNewValue(false);
      return;
    }
    setDisplay((current) => {
      if (current.length === 1 || (current.length === 2 && current.startsWith("-"))) {
        return "0";
      }
      return current.slice(0, -1);
    });
  }, [waitingForNewValue, display]);

  // Toggle positive / negative (+/-)
  const toggleSign = useCallback(() => {
    if (display === "0" || display === "Error") return;
    setDisplay((current) =>
      current.startsWith("-") ? current.slice(1) : "-" + current
    );
  }, [display]);

  // Percentage (%)
  const inputPercent = useCallback(() => {
    if (display === "Error") return;
    const currentNum = parseFloat(display);
    if (isNaN(currentNum)) return;

    if (prevValue !== null && operation) {
      // Percentage of the previous value (e.g. 200 + 10% = 20)
      const percentVal = (prevValue * currentNum) / 100;
      setDisplay(formatResult(percentVal));
    } else {
      // Direct division by 100
      setDisplay(formatResult(currentNum / 100));
    }
  }, [display, prevValue, operation]);

  // Calculate binary operation
  const executeCalculation = (firstVal, secondVal, op) => {
    switch (op) {
      case "+":
        return firstVal + secondVal;
      case "-":
        return firstVal - secondVal;
      case "×":
        return firstVal * secondVal;
      case "÷":
        if (secondVal === 0) return "Error";
        return firstVal / secondVal;
      default:
        return secondVal;
    }
  };

  // Perform Operation (+, -, ×, ÷)
  const performOperation = useCallback((nextOperation) => {
    const inputValue = parseFloat(display);

    if (display === "Error") {
      clearAll();
      return;
    }

    if (prevValue === null) {
      setPrevValue(inputValue);
      setHistory(`${inputValue} ${nextOperation}`);
    } else if (operation) {
      if (waitingForNewValue) {
        // User changed operator without typing a new number
        setOperation(nextOperation);
        setHistory(`${prevValue} ${nextOperation}`);
        return;
      }

      const calculated = executeCalculation(prevValue, inputValue, operation);
      if (calculated === "Error") {
        setDisplay("Error");
        setPrevValue(null);
        setOperation(null);
        setWaitingForNewValue(true);
        setHistory("Division by zero");
        return;
      }

      const formatted = formatResult(calculated);
      setDisplay(formatted);
      setPrevValue(calculated);
      setHistory(`${formatted} ${nextOperation}`);
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  }, [display, prevValue, operation, waitingForNewValue, clearAll]);

  // Evaluate (=)
  const handleEquals = useCallback(() => {
    if (operation === null || prevValue === null) return;
    if (display === "Error") return;

    const inputValue = parseFloat(display);
    const calculated = executeCalculation(prevValue, inputValue, operation);

    if (calculated === "Error") {
      setDisplay("Error");
      setHistory(`${prevValue} ${operation} 0 = Error`);
    } else {
      const formatted = formatResult(calculated);
      setHistory(`${prevValue} ${operation} ${inputValue} =`);
      setDisplay(formatted);
      setPrevValue(null);
    }

    setOperation(null);
    setWaitingForNewValue(true);
  }, [display, prevValue, operation]);

  // Copy result to clipboard
  const handleCopy = () => {
    if (display === "Error") return;
    navigator.clipboard.writeText(display);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;

      if (/^[0-9]$/.test(key)) {
        event.preventDefault();
        inputDigit(Number(key));
      } else if (key === ".") {
        event.preventDefault();
        inputDecimal();
      } else if (key === "+" || key === "-") {
        event.preventDefault();
        performOperation(key);
      } else if (key === "*") {
        event.preventDefault();
        performOperation("×");
      } else if (key === "/") {
        event.preventDefault();
        performOperation("÷");
      } else if (key === "Enter" || key === "=") {
        event.preventDefault();
        handleEquals();
      } else if (key === "Backspace") {
        event.preventDefault();
        handleBackspace();
      } else if (key === "Escape") {
        event.preventDefault();
        clearAll();
      } else if (key === "%") {
        event.preventDefault();
        inputPercent();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    inputDigit,
    inputDecimal,
    performOperation,
    handleEquals,
    handleBackspace,
    clearAll,
    inputPercent,
  ]);

  return (
    <div className="mx-auto w-full max-w-sm rounded-3xl border border-zinc-200 bg-white p-6 shadow-xl transition-all dark:border-zinc-800 dark:bg-zinc-900">
      {/* Display Screen */}
      <div className="relative mb-6 overflow-hidden rounded-2xl border border-zinc-100 bg-zinc-50 p-4 text-right dark:border-zinc-800 dark:bg-zinc-950">
        {/* Copy badge */}
        <button
          onClick={handleCopy}
          title="Copy current value"
          className="absolute left-3 top-3 text-[11px] font-medium text-zinc-400 transition hover:text-cyan-600 dark:hover:text-cyan-400"
        >
          {copied ? "✓ Copied" : "Copy"}
        </button>

        {/* Previous expression / History */}
        <div className="h-6 overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium text-zinc-400 dark:text-zinc-500">
          {history || (prevValue !== null && operation ? `${prevValue} ${operation}` : "")}
        </div>

        {/* Current Active Number */}
        <div
          className={`overflow-x-auto whitespace-nowrap font-bold tracking-tight text-zinc-900 transition-all dark:text-zinc-100 ${
            display.length > 10 ? "text-2xl" : display.length > 7 ? "text-3xl" : "text-4xl"
          }`}
        >
          {display}
        </div>
      </div>

      {/* Button Grid Container */}
      <div className="grid grid-cols-4 gap-3">
        {/* Row 1 */}
        <button
          onClick={clearAll}
          className="rounded-xl bg-zinc-100 py-3.5 text-base font-semibold text-rose-600 transition active:scale-95 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-rose-400 dark:hover:bg-zinc-700"
        >
          AC
        </button>
        <button
          onClick={toggleSign}
          className="rounded-xl bg-zinc-100 py-3.5 text-base font-semibold text-zinc-700 transition active:scale-95 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
        >
          +/-
        </button>
        <button
          onClick={inputPercent}
          className="rounded-xl bg-zinc-100 py-3.5 text-base font-semibold text-zinc-700 transition active:scale-95 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
        >
          %
        </button>
        <button
          onClick={() => performOperation("÷")}
          className={`rounded-xl py-3.5 text-xl font-bold transition active:scale-95 ${
            operation === "÷"
              ? "bg-cyan-500 text-white shadow-md shadow-cyan-500/30"
              : "bg-cyan-50 text-cyan-600 hover:bg-cyan-100 dark:bg-cyan-950/60 dark:text-cyan-300 dark:hover:bg-cyan-900/60"
          }`}
        >
          ÷
        </button>

        {/* Row 2 */}
        <button
          onClick={() => inputDigit(7)}
          className="rounded-xl bg-zinc-100 py-3.5 text-lg font-semibold text-zinc-800 transition active:scale-95 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
        >
          7
        </button>
        <button
          onClick={() => inputDigit(8)}
          className="rounded-xl bg-zinc-100 py-3.5 text-lg font-semibold text-zinc-800 transition active:scale-95 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
        >
          8
        </button>
        <button
          onClick={() => inputDigit(9)}
          className="rounded-xl bg-zinc-100 py-3.5 text-lg font-semibold text-zinc-800 transition active:scale-95 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
        >
          9
        </button>
        <button
          onClick={() => performOperation("×")}
          className={`rounded-xl py-3.5 text-xl font-bold transition active:scale-95 ${
            operation === "×"
              ? "bg-cyan-500 text-white shadow-md shadow-cyan-500/30"
              : "bg-cyan-50 text-cyan-600 hover:bg-cyan-100 dark:bg-cyan-950/60 dark:text-cyan-300 dark:hover:bg-cyan-900/60"
          }`}
        >
          ×
        </button>

        {/* Row 3 */}
        <button
          onClick={() => inputDigit(4)}
          className="rounded-xl bg-zinc-100 py-3.5 text-lg font-semibold text-zinc-800 transition active:scale-95 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
        >
          4
        </button>
        <button
          onClick={() => inputDigit(5)}
          className="rounded-xl bg-zinc-100 py-3.5 text-lg font-semibold text-zinc-800 transition active:scale-95 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
        >
          5
        </button>
        <button
          onClick={() => inputDigit(6)}
          className="rounded-xl bg-zinc-100 py-3.5 text-lg font-semibold text-zinc-800 transition active:scale-95 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
        >
          6
        </button>
        <button
          onClick={() => performOperation("-")}
          className={`rounded-xl py-3.5 text-xl font-bold transition active:scale-95 ${
            operation === "-"
              ? "bg-cyan-500 text-white shadow-md shadow-cyan-500/30"
              : "bg-cyan-50 text-cyan-600 hover:bg-cyan-100 dark:bg-cyan-950/60 dark:text-cyan-300 dark:hover:bg-cyan-900/60"
          }`}
        >
          -
        </button>

        {/* Row 4 */}
        <button
          onClick={() => inputDigit(1)}
          className="rounded-xl bg-zinc-100 py-3.5 text-lg font-semibold text-zinc-800 transition active:scale-95 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
        >
          1
        </button>
        <button
          onClick={() => inputDigit(2)}
          className="rounded-xl bg-zinc-100 py-3.5 text-lg font-semibold text-zinc-800 transition active:scale-95 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
        >
          2
        </button>
        <button
          onClick={() => inputDigit(3)}
          className="rounded-xl bg-zinc-100 py-3.5 text-lg font-semibold text-zinc-800 transition active:scale-95 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
        >
          3
        </button>
        <button
          onClick={() => performOperation("+")}
          className={`rounded-xl py-3.5 text-xl font-bold transition active:scale-95 ${
            operation === "+"
              ? "bg-cyan-500 text-white shadow-md shadow-cyan-500/30"
              : "bg-cyan-50 text-cyan-600 hover:bg-cyan-100 dark:bg-cyan-950/60 dark:text-cyan-300 dark:hover:bg-cyan-900/60"
          }`}
        >
          +
        </button>

        {/* Row 5 */}
        <button
          onClick={() => inputDigit(0)}
          className="rounded-xl bg-zinc-100 py-3.5 text-lg font-semibold text-zinc-800 transition active:scale-95 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
        >
          0
        </button>
        <button
          onClick={inputDecimal}
          className="rounded-xl bg-zinc-100 py-3.5 text-lg font-semibold text-zinc-800 transition active:scale-95 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
        >
          .
        </button>
        <button
          onClick={handleBackspace}
          title="Backspace"
          className="rounded-xl bg-zinc-100 py-3.5 text-base font-semibold text-zinc-700 transition active:scale-95 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
        >
          ⌫
        </button>
        <button
          onClick={handleEquals}
          className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3.5 text-xl font-bold text-white shadow-md shadow-cyan-500/25 transition active:scale-95 hover:opacity-95"
        >
          =
        </button>
      </div>

      {/* Keyboard Hint */}
      <div className="mt-4 text-center text-xs text-zinc-400 dark:text-zinc-500">
        Keyboard supported (0-9, + - * / Enter Esc Backspace)
      </div>
    </div>
  );
}
