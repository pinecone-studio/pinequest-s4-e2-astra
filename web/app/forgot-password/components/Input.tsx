"use client";

import { ArrowLeft, KeyRound, Lock, Mail } from "lucide-react";
import Link from "next/link";

import { useForgotPasswordForm } from "@/hooks/useForgotPasswordForm";

export default function Input() {
  const {
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
  } = useForgotPasswordForm();

  return (
    <form
      className="absolute inset-x-0 bottom-0 top-[440px] z-20 bg-white px-6 pb-5 pt-2 shadow-2xl shadow-lime-950/10"
      onSubmit={handleSubmit}
    >
      <svg
        aria-hidden="true"
        className="absolute -top-11 left-0 h-14 w-full text-white"
        preserveAspectRatio="none"
        viewBox="0 0 390 56"
      >
        <path
          d="M0 56V19C48 0 92 15 137 24C185 34 230 34 278 23C323 12 356 4 390 19V56H0Z"
          fill="currentColor"
        />
      </svg>
      <div className="flex items-center gap-4">
        <div className="min-w-0">
          <h2 className="text-[22px] font-black leading-tight text-zinc-950">
            {step === 1 ? "Нууц үгээ мартсан уу?" : "Нууц үг шинэчлэх"}
          </h2>
        </div>
      </div>

      <label className="mt-6 block text-[15px] font-extrabold text-zinc-950">
        Имэйл хаяг
        <span className="mt-2.5 flex h-[50px] items-center gap-3 rounded-[15px] border border-zinc-200 px-3 shadow-sm shadow-zinc-200/40">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-lime-50">
            <Mail className="h-5 w-5 text-lime-600" />
          </span>
          <input
            className="min-w-0 flex-1 bg-transparent text-[16px] font-medium text-zinc-700 outline-none placeholder:text-zinc-400 disabled:opacity-60"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Имэйл хаягаа оруулна уу"
            type="email"
            value={email}
            disabled={step === 2}
          />
        </span>
      </label>

      {step === 2 && (
        <>
          <label className="mt-4 block text-[15px] font-extrabold text-zinc-950">
            Баталгаажуулах код
            <span className="mt-2.5 flex h-[50px] items-center gap-3 rounded-[15px] border border-zinc-200 px-3 shadow-sm shadow-zinc-200/40">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-lime-50">
                <KeyRound className="h-5 w-5 text-lime-600" />
              </span>
              <input
                className="min-w-0 flex-1 bg-transparent text-[16px] font-medium text-zinc-700 outline-none placeholder:text-zinc-400"
                onChange={(event) => setCode(event.target.value)}
                placeholder="6 оронтой кодыг оруулна уу"
                type="text"
                maxLength={6}
                value={code}
              />
            </span>
          </label>

          <label className="mt-4 block text-[15px] font-extrabold text-zinc-950">
            Шинэ нууц үг
            <span className="mt-2.5 flex h-[50px] items-center gap-3 rounded-[15px] border border-zinc-200 px-3 shadow-sm shadow-zinc-200/40">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-lime-50">
                <Lock className="h-5 w-5 text-lime-600" />
              </span>
              <input
                className="min-w-0 flex-1 bg-transparent text-[16px] font-medium text-zinc-700 outline-none placeholder:text-zinc-400"
                onChange={(event) => setNewPassword(event.target.value)}
                placeholder="Шинэ нууц үгээ оруулна уу"
                type="password"
                value={newPassword}
              />
            </span>
          </label>
        </>
      )}

      {message ? (
        <p className="mt-3 text-center text-[13px] font-semibold leading-5 text-lime-700">
          {message}
        </p>
      ) : null}

      <button
        className="mt-5 flex h-[52px] w-full items-center justify-center rounded-[15px] bg-lime-600 px-4 text-[20px] font-black text-white shadow-lg shadow-lime-600/25 transition active:scale-[0.99] disabled:opacity-70"
        disabled={isSubmitting}
        type="submit"
      >
        <span className="flex-1 text-center">
          {isSubmitting
            ? "Илгээж байна..."
            : step === 1
              ? "Заавар илгээх"
              : "Нууц үг шинэчлэх"}
        </span>
      </button>

      <div className="mt-5 flex items-center gap-4 text-[13px] font-semibold text-zinc-400">
        <span className="h-px flex-1 bg-zinc-200" />
        <span>эсвэл</span>
        <span className="h-px flex-1 bg-zinc-200" />
      </div>

      <Link
        className="mt-4 flex h-[50px] w-full items-center justify-center gap-3 rounded-[15px] border border-zinc-200 text-[16px] font-semibold text-zinc-800 shadow-sm shadow-zinc-200/30"
        href="/signin"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Нэвтрэх хуудас руу буцах</span>
      </Link>
    </form>
  );
}
