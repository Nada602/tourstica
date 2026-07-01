import React, { useState } from "react";
import { ArrowRight, Eye, EyeOff, User } from "lucide-react";
import HeadingText from "../../../components/ui/HeadingText";
import TextField from "../../../components/ui/TextField";
import FieldLabel from "../../../components/ui/FieldLabel";
import PrimaryButton from "../../../components/ui/PrimaryButton";
import Divider from "../../../components/ui/Divider";
import SecondaryButton from "../../../components/ui/SecondaryButton";
import Subtext from "../../../components/ui/Subtext";
import { useNavigate } from "react-router-dom";

export default function Login({
  onSubmit,
  onForgotPassword,
  onContinueAsGuest,
  onCreateAccount,
}) {
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
        <span className="text-orange-600">Welcome</span> back
      </HeadingText>
      <Subtext>Your next Moroccan adventure awaits</Subtext>

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
          <div className="flex justify-end mt-1.5">
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-xs font-medium text-orange-600 hover:underline"
            >
              Forgot password?
            </button>
          </div>
        </div>

        <PrimaryButton type="submit" className="mt-2">
          Sign in to your account
          <ArrowRight size={16} />
        </PrimaryButton>
      </form>

      <Divider />

      <SecondaryButton type="button" onClick={() => navigate("/")}>
        <User size={16} />
        Continue as guest
      </SecondaryButton>

      <p className="text-center text-sm text-neutral-500 mt-6">
        Don&apos;t have an account?
        <button
          type="button"
          onClick={() => {
            navigate("/auth/register");
          }}
          className="text-orange-600 font-medium hover:underline"
        >
          Create one free
        </button>
      </p>
    </>
  );
}
