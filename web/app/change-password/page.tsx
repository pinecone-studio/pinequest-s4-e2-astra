// "use client";

// import React, { useState } from "react";
// import HomeBackdrop from "@/components/home/HomeBackdrop";
// import PhoneFrame from "@/components/home/PhoneFrame";
// import { Lock, Mail, KeyRound, ChevronLeft, Loader2 } from "lucide-react";

// export default function ResetPasswordPage() {
//   const [formData, setFormData] = useState({
//     email: "",
//     code: "",
//     newPassword: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ type: "", text: "" }); // type: "success" | "error"

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage({ type: "", text: "" });

//     try {
//       const response = await fetch("/api/auth/reset-password", {
//         // Өөрийн backend API path-аар солиорой
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || "Алдаа гарлаа");
//       }

//       setMessage({ type: "success", text: data.message });
//       setFormData({ email: "", code: "", newPassword: "" }); // Форм цэвэрлэх
//     } catch (err: any) {
//       setMessage({ type: "error", text: err.message });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Идэвхтэй эсэхийг шалгах (Товч идэвхжүүлэхэд ашиглана)
//   const isFormValid = formData.email && formData.code && formData.newPassword;

//   return (
//     <div className="relative min-h-screen flex items-center justify-center">
//       <HomeBackdrop active={true} />
//       <div className="relative z-10">
//         <PhoneFrame>
//           <div className="h-[95%] flex flex-col bg-gray-50">
//             {/* Дээд ногоон хэсэг (Screenshot 2026-07-01 at 18.47.57.jpg-тэй төстэй) */}
//             <div className="bg-[#1e3a2f] text-white pt-12 pb-8 px-6 rounded-b-[2.5rem] shadow-md">
//               <div className="flex justify-between items-center mb-6">
//                 <h1 className="text-xl font-semibold tracking-wide">
//                   Нууц үг сэргээх
//                 </h1>
//                 <button className="flex items-center text-sm text-gray-300 hover:text-white transition">
//                   <ChevronLeft className="w-4 h-4" /> Буцах
//                 </button>
//               </div>
//               <p className="text-xs text-gray-300 text-center max-w-[220px] mx-auto">
//                 Таны имэйл хаяг руу илгээсэн баталгаажуулах кодыг оруулна уу.
//               </p>
//             </div>

//             {/* Форм байрлах цагаан хэсэг */}
//             <div className="flex-1 overflow-y-auto px-6 pt-6 pb-4">
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 {/* Оролтын талбарууд (Групп бүтэцтэй, дугуйрсан булантай) */}
//                 <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-100">
//                   {/* Имэйл хаяг */}
//                   <div className="p-4 flex items-center gap-4">
//                     <div className="p-2.5 bg-blue-50 rounded-xl text-blue-500">
//                       <Mail className="w-5 h-5" />
//                     </div>
//                     <div className="flex-1">
//                       <label className="block text-[10px] text-gray-400 font-medium uppercase tracking-wider">
//                         Имэйл хаяг
//                       </label>
//                       <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         placeholder="example@gmail.com"
//                         className="w-full bg-transparent border-none p-0 text-sm focus:ring-0 text-gray-800 placeholder-gray-300 mt-0.5 outline-none"
//                         required
//                       />
//                     </div>
//                   </div>

//                   {/* Баталгаажуулах код */}
//                   <div className="p-4 flex items-center gap-4">
//                     <div className="p-2.5 bg-amber-50 rounded-xl text-amber-500">
//                       <KeyRound className="w-5 h-5" />
//                     </div>
//                     <div className="flex-1">
//                       <label className="block text-[10px] text-gray-400 font-medium uppercase tracking-wider">
//                         Баталгаажуулах код
//                       </label>
//                       <input
//                         type="text"
//                         name="code"
//                         value={formData.code}
//                         onChange={handleChange}
//                         placeholder="Кодоо оруулна уу"
//                         className="w-full bg-transparent border-none p-0 text-sm focus:ring-0 text-gray-800 placeholder-gray-300 mt-0.5 outline-none"
//                         required
//                       />
//                     </div>
//                   </div>

//                   {/* Шинэ нууц үг */}
//                   <div className="p-4 flex items-center gap-4">
//                     <div className="p-2.5 bg-purple-50 rounded-xl text-purple-500">
//                       <Lock className="w-5 h-5" />
//                     </div>
//                     <div className="flex-1">
//                       <label className="block text-[10px] text-gray-400 font-medium uppercase tracking-wider">
//                         Шинэ нууц үг
//                       </label>
//                       <input
//                         type="password"
//                         name="newPassword"
//                         value={formData.newPassword}
//                         onChange={handleChange}
//                         placeholder="••••••••"
//                         className="w-full bg-transparent border-none p-0 text-sm focus:ring-0 text-gray-800 placeholder-gray-300 mt-0.5 outline-none"
//                         required
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Алдаа болон Амжилтын мессеж */}
//                 {message.text && (
//                   <div
//                     className={`p-3.5 rounded-xl text-xs font-medium text-center transition-all ${
//                       message.type === "success"
//                         ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
//                         : "bg-rose-50 text-rose-600 border border-rose-100"
//                     }`}
//                   >
//                     {message.text}
//                   </div>
//                 )}

//                 {/* Илгээх товч */}
//                 <div className="pt-2">
//                   <button
//                     type="submit"
//                     disabled={!isFormValid || loading}
//                     className={`w-full py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 flex justify-center items-center gap-2 ${
//                       isFormValid && !loading
//                         ? "bg-[#1e3a2f] text-white shadow-md hover:bg-[#152921] active:scale-[0.99]"
//                         : "bg-gray-200 text-gray-400 cursor-not-allowed"
//                     }`}
//                   >
//                     {loading ? (
//                       <>
//                         <Loader2 className="w-4 h-4 animate-spin" />
//                         Шинэчилж байна...
//                       </>
//                     ) : (
//                       "Нууц үг шинэчлэх"
//                     )}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </PhoneFrame>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";
import HomeBackdrop from "@/components/home/HomeBackdrop";
import PhoneFrame from "@/components/home/PhoneFrame";
import { Lock, Mail, KeyRound, ChevronLeft, Loader2 } from "lucide-react";

export default function ResetPasswordPage() {
  const [formData, setFormData] = useState({
    email: "",
    code: "",
    newPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);
  const [timer, setTimer] = useState(0);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Таймер ажиллуулах лог (60 секунд хүлээлгэх)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 1. КОД ИЛГЭЭХ ФУНКЦ
  const handleSendCode = async () => {
    if (!formData.email) {
      setMessage({ type: "error", text: "Эхлээд имэйл хаягаа оруулна уу!" });
      return;
    }

    setSendingCode(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await fetch("/api/auth/forgot-password", {
        // Өөрийн код илгээдэг API хаягаар солиорой
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Код илгээхэд алдаа гарлаа");
      }

      setMessage({
        type: "success",
        text: "Баталгаажуулах кодыг имэйл рүү илгээлээ.",
      });
      setTimer(60); // 60 секундын хүлээлгэж эхлэх
    } catch (err: any) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setSendingCode(false);
    }
  };

  // 2. НУУЦ ҮГ ШИНЭЧЛЭХ ФУНКЦ (Таны анхны логик)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Алдаа гарлаа");
      }

      setMessage({ type: "success", text: data.message });
      setFormData({ email: "", code: "", newPassword: "" });
    } catch (err: any) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = formData.email && formData.code && formData.newPassword;

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <HomeBackdrop active={true} />
      <div className="relative z-10">
        <PhoneFrame>
          <div className="h-[95%] flex flex-col bg-gray-50">
            {/* Дээд ногоон хэсэг */}
            <div className="bg-[#1e3a2f] text-white pt-12 pb-8 px-6 rounded-b-[2.5rem] shadow-md">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-semibold tracking-wide">
                  Нууц үг сэргээх
                </h1>
                <button
                  type="button"
                  className="flex items-center text-sm text-gray-300 hover:text-white transition"
                >
                  <ChevronLeft className="w-4 h-4" /> Буцах
                </button>
              </div>
              <p className="text-xs text-gray-300 text-center max-w-[220px] mx-auto">
                Имэйлээ оруулан код авч, нууц үгээ шинэчилнэ үү.
              </p>
            </div>

            {/* Форм байрлах цагаан хэсэг */}
            <div className="flex-1 overflow-y-auto px-6 pt-6 pb-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Оролтын талбарууд */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-100">
                  {/* Имэйл хаяг + Код илгээх товч */}
                  <div className="p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="p-2.5 bg-blue-50 rounded-xl text-blue-500 flex-shrink-0">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <label className="block text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                          Имэйл хаяг
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="example@gmail.com"
                          className="w-full bg-transparent border-none p-0 text-sm focus:ring-0 text-gray-800 placeholder-gray-300 mt-0.5 outline-none"
                          required
                        />
                      </div>
                    </div>

                    {/* Код илгээх товчлуур */}
                    <button
                      type="button"
                      onClick={handleSendCode}
                      disabled={!formData.email || sendingCode || timer > 0}
                      className={`text-xs font-semibold px-3 py-2 rounded-xl transition-all flex-shrink-0 ${
                        formData.email && !sendingCode && timer === 0
                          ? "bg-emerald-50 text-[#1e3a2f] hover:bg-emerald-100 active:scale-95"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {sendingCode ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : timer > 0 ? (
                        `${timer}с`
                      ) : (
                        "Код авах"
                      )}
                    </button>
                  </div>

                  {/* Баталгаажуулах код */}
                  <div className="p-4 flex items-center gap-4">
                    <div className="p-2.5 bg-amber-50 rounded-xl text-amber-500">
                      <KeyRound className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                        Баталгаажуулах код
                      </label>
                      <input
                        type="text"
                        name="code"
                        value={formData.code}
                        onChange={handleChange}
                        placeholder="Кодоо оруулна уу"
                        className="w-full bg-transparent border-none p-0 text-sm focus:ring-0 text-gray-800 placeholder-gray-300 mt-0.5 outline-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Шинэ нууц үг */}
                  <div className="p-4 flex items-center gap-4">
                    <div className="p-2.5 bg-purple-50 rounded-xl text-purple-500">
                      <Lock className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                        Шинэ нууц үг
                      </label>
                      <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="w-full bg-transparent border-none p-0 text-sm focus:ring-0 text-gray-800 placeholder-gray-300 mt-0.5 outline-none"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Алдаа болон Амжилтын мессеж */}
                {message.text && (
                  <div
                    className={`p-3.5 rounded-xl text-xs font-medium text-center transition-all ${
                      message.type === "success"
                        ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                        : "bg-rose-50 text-rose-600 border border-rose-100"
                    }`}
                  >
                    {message.text}
                  </div>
                )}

                {/* Илгээх товч */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={!isFormValid || loading}
                    className={`w-full py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 flex justify-center items-center gap-2 ${
                      isFormValid && !loading
                        ? "bg-[#1e3a2f] text-white shadow-md hover:bg-[#152921] active:scale-[0.99]"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Шинэчилж байна...
                      </>
                    ) : (
                      "Нууц үг шинэчлэх"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </PhoneFrame>
      </div>
    </div>
  );
}
