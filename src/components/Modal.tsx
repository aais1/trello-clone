"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <div className="relative">
      <div
        className="absolute cursor-pointer inset-0 h-[calc(100vh-56px)] mt-auto md:w-[calc(100vw-256px)] ml-auto p-20 bg-black/60 flex items-center justify-center text-white"
        onClick={() => {
          router.back();
        }}
      >
        <div className="relative z-20" onClick={(e) => e.stopPropagation()}>
          <div
            className="absolute z-20 top-0 p-4  right-0 "
            onClick={() => {
              router.back();
            }}
            title="Close"
          >
            <X />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
