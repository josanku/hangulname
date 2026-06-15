"use client";

export default function KoreaBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-zinc-950" />
      <div className="absolute -top-[30%] left-1/2 -translate-x-1/2 w-[90%] aspect-square rounded-full bg-indigo-600/[0.07] blur-[120px]" />
      <div className="absolute top-[60%] -right-[15%] w-[40%] aspect-square rounded-full bg-violet-600/[0.04] blur-[100px]" />
    </div>
  );
}
