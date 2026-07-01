import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import HeadingText from "../../../components/ui/HeadingText";
import TextField from "../../../components/ui/TextField";
import FieldLabel from "../../../components/ui/FieldLabel";
import PrimaryButton from "../../../components/ui/PrimaryButton";
import Divider from "../../../components/ui/Divider";
import SecondaryButton from "../../../components/ui/SecondaryButton";
import Subtext from "../../../components/ui/Subtext";

export default function CreatePassword({ onSubmit, onGoToSignIn }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    setError("");
    onSubmit?.({ password });
  }

  return (
    <>
      <HeadingText>
        Create <span className="text-orange-600">new password</span>
      </HeadingText>
      <Subtext>Choose a strong password to secure your account.</Subtext>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <FieldLabel>New Password</FieldLabel>
          <TextField
            type="password"
            placeholder="••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <FieldLabel>Confirm Password</FieldLabel>
          <div className="relative">
            <TextField
              type={showConfirm ? "text" : "password"}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="pr-10"
              required
            />
            <button
              type="button"
              aria-label={showConfirm ? "Hide password" : "Show password"}
              onClick={() => setShowConfirm((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {error && <p className="text-xs text-red-600 mt-1.5">{error}</p>}
        </div>

        <PrimaryButton type="submit" className="mt-2">
          Update Password
        </PrimaryButton>
      </form>

      <div className="mt-3">
        <SecondaryButton type="button" onClick={onGoToSignIn}>
          Go to Sign In
        </SecondaryButton>
      </div>
    </>
  );
}
