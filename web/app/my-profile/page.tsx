"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import HomeBackdrop from "@/components/home/HomeBackdrop";
import PhoneFrame from "@/components/home/PhoneFrame";
import { ProfileData, ProfileFormState } from "./components/types";
import { ProfileHeader } from "./components/ProfileHeader";
import { ProfileForm } from "./components/ProfileForm";

export const MyProfile = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [form, setForm] = useState<ProfileFormState>({ name: "", phone: "" });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/user/profile", {
          method: "GET",
          credentials: "include",
        });

        let data: any = null;
        try {
          data = await res.json();
        } catch {}

        if (!res.ok) {
          setError(
            data?.error || `Мэдээлэл татахад алдаа гарлаа (код: ${res.status})`,
          );
          return;
        }

        setProfile(data);
        setForm({ name: data?.name ?? "", phone: data?.phone ?? "" });
      } catch {
        setError("Сервертэй холбогдоход алдаа гарлаа");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const isDirty =
    !!profile &&
    (form.name !== (profile.name ?? "") ||
      form.phone !== (profile.phone ?? ""));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile || !isDirty || saving) return;

    setSaving(true);
    setError(null);
    setSuccess(null);

    const payload: Record<string, string> = {};
    if (form.name !== (profile.name ?? "")) payload.name = form.name;
    if (form.phone !== (profile.phone ?? "")) payload.phone = form.phone;

    try {
      const res = await fetch("/api/user/profile/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      let data: any = null;
      try {
        data = await res.json();
      } catch {}

      if (!res.ok) {
        setError(
          res.status === 500
            ? "Серверт алдаа гарлаа. Мэдээлэл хадгалагдаагүй байж болзошгүй."
            : data?.error || `Шинэчлэхэд алдаа гарлаа (код: ${res.status})`,
        );
        return;
      }

      setProfile((prev) => (prev ? { ...prev, ...data.user } : prev));
      setForm({ name: data?.user?.name ?? "", phone: data?.user?.phone ?? "" });
      setSuccess(data?.message || "Амжилттай шинэчлэгдлээ");
    } catch {
      setError("Сервертэй холбогдоход алдаа гарлаа");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <HomeBackdrop active={true} />
      <PhoneFrame>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex h-full w-full flex-col overflow-y-auto bg-[#f3f4f2]"
        >
          {loading ? (
            <div className="flex h-full items-center justify-center bg-[#1c3226]">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/15 border-t-amber-400" />
            </div>
          ) : (
            <>
              <ProfileHeader
                profile={profile}
                onBack={() => router.push("/profile")}
              />
              <ProfileForm
                form={form}
                email={profile?.email ?? ""}
                isDirty={isDirty}
                saving={saving}
                error={error}
                success={success}
                onChange={handleChange}
                onSubmit={handleSubmit}
              />
            </>
          )}
        </motion.div>
      </PhoneFrame>
    </div>
  );
};

export default MyProfile;
