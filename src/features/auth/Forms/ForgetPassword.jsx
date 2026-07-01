import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import HeadingText from "../../../components/ui/HeadingText";
import TextField from "../../../components/ui/TextField";
import FieldLabel from "../../../components/ui/FieldLabel";
import PrimaryButton from "../../../components/ui/PrimaryButton";
import Divider from "../../../components/ui/Divider";
import SecondaryButton from "../../../components/ui/SecondaryButton";
import Subtext from "../../../components/ui/Subtext";

/**
 * ForgotPasswordForm
 * "Forgot your password?" — pure form content, rendered inside the
 * route AuthLayout's <Outlet />.
 */
export default function ForgotPasswordForm({ onSubmit, onBackToSignIn }) {
  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit?.({ email });
  }

  return (
    <>
      <HeadingText>
        <span className="text-orange-600">Forgot</span> your password?
      </HeadingText>
      <Subtext>
        No worries — enter your email and we&apos;ll send you a reset link to
        get back to your Moroccan journey.
      </Subtext>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <FieldLabel>Email</FieldLabel>
          <TextField
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <PrimaryButton type="submit" className="mt-2">
          Send Reset Link
          <ArrowRight size={16} />
        </PrimaryButton>
      </form>

      <div className="mt-3">
        <SecondaryButton type="button" onClick={onBackToSignIn}>
          Back to Sign In
        </SecondaryButton>
      </div>
    </>
  );
}
