"use client";

export default function KoreaBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-violet-50 via-white to-purple-50/50" />
      <div className="absolute -top-[30%] left-1/2 -translate-x-1/2 w-[90%] aspect-square rounded-full bg-violet-300/20 blur-[120px]" />
      <div className="absolute top-[60%] -right-[15%] w-[40%] aspect-square rounded-full bg-purple-300/15 blur-[100px]" />
      <div className="absolute top-[20%] -left-[10%] w-[30%] aspect-square rounded-full bg-fuchsia-200/10 blur-[80px]" />
    </div>
  );
}
