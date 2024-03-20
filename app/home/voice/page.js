"use client";
import { useRouter } from "next/navigation";
import { Button } from "antd";

export default function PathPage() {
  const router = useRouter();

  return (
    <div className="w-full h-full pt-24 pb-10 flex flex-col items-center justify-center gap-5">
      voice page
    </div>
  );
}
