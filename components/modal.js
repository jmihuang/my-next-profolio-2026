"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function Modal({ children }) {
  const router = useRouter();
  return (
    <>
      <div className="backdrop !z-[9998] !bg-black/70" onClick={router.back}></div>
      <dialog open className="modal !fixed !inset-0 !z-[9999] !m-0 !h-screen !w-screen !max-w-none !border-0 !bg-transparent !p-0 !overflow-visible">
        <button type="button" aria-label="關閉圖片預覽" onClick={router.back} className="absolute right-6 top-6 z-10 grid h-11 w-11 place-items-center rounded-full bg-white text-2xl text-black shadow-lg transition hover:scale-105">×</button>
        {children}
      </dialog>
    </>
  );
}
