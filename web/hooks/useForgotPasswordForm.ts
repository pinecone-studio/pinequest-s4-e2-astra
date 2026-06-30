"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useState } from "react";

import {
  FORGOT_PASSWORD_ERRORS,
  extractErrorMessage,
  isStepOneValid,
  isStepTwoValid,
} from "@/utils/validator";

export function useForgotPasswordForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [step, setStep] = useState(1);
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setMessage("");

    try {
      if (step === 1) {
        if (!isStepOneValid({ email })) {
          setIsSubmitting(false);
          return;
        }

        const response = await axios.post("/api/auth/forgot-password", {
          email: email.trim(),
        });

        setMessage(
          response.data.message ?? FORGOT_PASSWORD_ERRORS.CODE_SENT_DEFAULT,
        );
        setStep(2);
      } else {
        if (!isStepTwoValid({ code, newPassword })) {
          setIsSubmitting(false);
          return;
        }

        const response = await axios.post("/api/auth/reset-password", {
          email: email.trim(),
          code: code.trim(),
          newPassword: newPassword.trim(),
        });

        setMessage(
          response.data.message ??
            FORGOT_PASSWORD_ERRORS.PASSWORD_RESET_DEFAULT,
        );
        setCode("");
        setNewPassword("");

        setTimeout(() => {
          router.push("/signin");
        }, 2000);
      }
    } catch (error: any) {
      setMessage(extractErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    email,
    setEmail,
    message,
    isSubmitting,
    step,
    code,
    setCode,
    newPassword,
    setNewPassword,
    handleSubmit,
  };
}
