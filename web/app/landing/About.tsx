"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="mx-auto max-w-7xl px-8 py-28">
      <div className="grid gap-16 lg:grid-cols-2 items-center">

        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative"
        >
          <img
            src="tuguldur-baatar--NtLX05El5M-unsplash.jpg"
            alt="Монголын байгалийн үзэсгэлэнт газар"
            className="rounded-3xl shadow-xl object-cover w-full h-[520px]"
          />

          {/* small info card */}
          <div className="absolute -bottom-6 left-6 rounded-2xl bg-white p-5 shadow-xl border">
            <p className="text-2xl font-bold text-teal-700">AI</p>
            <p className="text-sm text-gray-600">
              Ухаалаг маршрут төлөвлөлт
            </p>
          </div>
        </motion.div>

        {/* TEXT */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center"
        >
          <span className="mb-4 w-fit rounded-full bg-teal-100 px-4 py-2 text-xs font-semibold text-teal-700">
            MONGOLIA TRAVEL ROUTE PLANNER
          </span>

          <h2 className="mb-6 text-5xl font-bold text-gray-800 leading-tight">
            Монгол орны аяллаа
            <br />
            ухаалгаар төлөвлөөрэй
          </h2>

          <p className="mb-8 text-gray-600 leading-relaxed">
            MonTrip нь хиймэл оюунд суурилсан систем ашиглан
            таны төсөв, хугацаа, сонирхолд тохирсон
            аяллын маршрутыг автоматаар гаргаж өгнө.
          </p>

          <div className="space-y-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="rounded-xl border p-4 text-gray-700 hover:bg-gray-50 transition"
            >
              🎯 Төсөвт тохирсон маршрут тооцоолох
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="rounded-xl border p-4 text-gray-700 hover:bg-gray-50 transition"
            >
              🗺️ Автомат аяллын төлөвлөгөө гаргах
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="rounded-xl border p-4 text-gray-700 hover:bg-gray-50 transition"
            >
              ⏱️ Цаг хугацаанд суурилсан зохион байгуулалт
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}