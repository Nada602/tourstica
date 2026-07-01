import React, { useRef, useState } from "react";
import HeadingText from "../../../components/ui/HeadingText";
import TextField from "../../../components/ui/TextField";
import FieldLabel from "../../../components/ui/FieldLabel";
import PrimaryButton from "../../../components/ui/PrimaryButton";
import Divider from "../../../components/ui/Divider";
import SecondaryButton from "../../../components/ui/SecondaryButton";
import Subtext from "../../../components/ui/Subtext";
const CODE_LENGTH = 6;

/**
 * VerifyEmailForm
 * "Verify your email" — pure form content, rendered inside the route
 * AuthLayout's <Outlet />.
 */
export default function VerifyEmailForm({ onSubmit, onResend }) {
  const [digits, setDigits] = useState(Array(CODE_LENGTH).fill(""));
  const inputRefs = useRef([]);

  function handleChange(index, value) {
    const char = value.replace(/[^0-9]/g, "").slice(-1);
    const next = [...digits];
    next[index] = char;
    setDigits(next);

    if (char && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index, e) {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e) {
    const pasted = e.clipboardData.getData("text").replace(/[^0-9]/g, "");
    if (!pasted) return;
    e.preventDefault();
    const next = pasted.slice(0, CODE_LENGTH).split("");
    setDigits((prev) =>
      next.concat(prev.slice(next.length)).slice(0, CODE_LENGTH),
    );
    inputRefs.current[Math.min(next.length, CODE_LENGTH - 1)]?.focus();
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit?.(digits.join(""));
  }

  return (
    <>
      <HeadingText>
        <span className="text-orange-600">Verify</span> your email
      </HeadingText>
      <Subtext>
        We&apos;ve sent a 6-digit verification code to your email address.
      </Subtext>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-6"
      >
        <div className="w-full">
          <p className="text-center text-sm font-medium text-neutral-900 mb-2">
            Verify Code
          </p>
          <div className="flex justify-center gap-2">
            {digits.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (inputRefs.current[i] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                onPaste={handlePaste}
                className="w-11 h-12 rounded-lg border border-neutral-200 text-center text-lg font-semibold text-neutral-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition"
              />
            ))}
          </div>
        </div>

        <PrimaryButton type="submit" className="w-full">
          Verify Email
        </PrimaryButton>
      </form>

      <button
        type="button"
        onClick={onResend}
        className="block mx-auto mt-4 text-sm text-orange-600 font-medium hover:underline"
      >
        Resend Code
      </button>
    </>
  );
}
