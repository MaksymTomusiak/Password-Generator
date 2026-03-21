"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

const LETTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:'\",.<>/?`~";

type GeneratePasswordOptions = {
  includeLetters: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  length: number;
};

function generatePassword({
  includeLetters,
  includeNumbers,
  includeSymbols,
  length,
}: GeneratePasswordOptions): string {
  let charset = "";
  if (includeLetters) charset += LETTERS;
  if (includeNumbers) charset += NUMBERS;
  if (includeSymbols) charset += SYMBOLS;

  if (!charset) return "";

  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset[Math.floor(Math.random() * charset.length)];
  }

  return password;
}

export default function Home() {
  const [includeLetters, setIncludeLetters] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [length, setLength] = useState(18);
  const [password, setPassword] = useState("");
  const [clipboardMessage, setClipboardMessage] = useState(
    "Click password to copy",
  );

  const regenerate = () => {
    const pwd = generatePassword({
      includeLetters,
      includeNumbers,
      includeSymbols,
      length,
    });
    setPassword(pwd);
    setClipboardMessage("Click password to copy");
  };

  useEffect(() => {
    regenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const copyToClipboard = async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setClipboardMessage("Password copied to clipboard!");
    } catch {
      setClipboardMessage("Clipboard copy failed, please copy manually.");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 p-6 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <main className="mx-auto max-w-xl space-y-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="text-center text-3xl font-bold">Password Generator</h1>

        <div className="space-y-4">
          <div
            className="cursor-pointer rounded-lg border border-zinc-300 bg-zinc-100 px-4 py-3 text-lg font-semibold text-zinc-800 hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
            onClick={copyToClipboard}
            title="Click to copy to clipboard"
          >
            {password || "No password yet"}
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {clipboardMessage}
          </p>
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <Checkbox
              checked={includeLetters}
              onChange={(e) => setIncludeLetters(e.target.checked)}
            />
            Include letters
          </label>

          <label className="flex items-center gap-2">
            <Checkbox
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
            />
            Include numbers
          </label>

          <label className="flex items-center gap-2">
            <Checkbox
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
            />
            Include special symbols
          </label>

          <div className="flex items-center gap-3">
            <span className="font-medium">Length</span>
            <Input
              type="number"
              min={4}
              max={64}
              value={length}
              onChange={(e) =>
                setLength(
                  Math.max(4, Math.min(64, Number(e.target.value) || 18)),
                )
              }
              className="w-20"
            />
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              (default 18)
            </span>
          </div>

          <Button
            onClick={regenerate}
            className="w-full bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            Generate Password
          </Button>
        </div>

        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Click the generated password to copy it to clipboard.
        </p>
      </main>
    </div>
  );
}
