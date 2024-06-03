"use client";

import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "@components/ui/aurora-background";
import Link from "next/link";

export default function Page() {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="text-3xl md:text-5xl font-bold text-white text-center">
          Welcome to Next Manager
        </div>
        <div className="font-extralight text-base md:text-2xl text-neutral-200 py-4 px-[2rem] text-center">
          This is a full-stack application utilizing Next.js, Tailwind CSS, and TypeScript for the frontend, and ASP.NET Core, C#, SQL Server, and Azure for the backend.
        </div>
        <Link href={"/auth/login"} className="btnSecondary text-lg ">
          Lets start!
        </Link>
      </motion.div>
    </AuroraBackground>
  );
}
