import React, { useState } from "react";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import HeadingText from "../../../components/ui/HeadingText";
import TextField from "../../../components/ui/TextField";
import FieldLabel from "../../../components/ui/FieldLabel";
import PrimaryButton from "../../../components/ui/PrimaryButton";
import SecondaryButton from "../../../components/ui/SecondaryButton";
import Subtext from "../../../components/ui/Subtext";
import { useNavigate } from "react-router-dom";

/**
 * SignUpForm
 * "Create your account" — pure form content, rendered inside the
 * route AuthLayout's <Outlet />.
 */
export default function SignUpForm({ onSubmit, onSignInInstead }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit?.({ email, password });
  }

  return (
    <>
      <HeadingText>
        Create your <span className="text-orange-600">account</span>
      </HeadingText>
      <Subtext>Start your Moroccan journey today — it&apos;s free</Subtext>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <FieldLabel>Email</FieldLabel>
          <TextField
            type="email"
            placeholder="Mona@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <FieldLabel>Password</FieldLabel>
          <div className="relative">
            <TextField
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pr-10"
              required
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <PrimaryButton type="submit" className="mt-2">
          Create Free Account
          <ArrowRight size={16} />
        </PrimaryButton>
      </form>

      <p className="text-center text-sm text-neutral-400 mt-5 mb-3">
        Already have an account?
      </p>

      <SecondaryButton type="button" onClick={() => navigate("/auth/login")}>
        Sign In Instead
      </SecondaryButton>
    </>
  );
}
