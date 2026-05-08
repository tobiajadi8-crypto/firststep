"use client"
import { useRouter } from "next/navigation"

export default function LandingPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-[#0A0A0A] flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-white/5">
        <span className="font-syne font-800 text-xl tracking-tight text-white">
          First<span className="text-[#F5C842]">Step</span>
        </span>
        <button
          onClick={() => router.push("/onboarding/quiz")}
          className="text-sm font-dm text-white/60 hover:text-white transition-colors"
        >
          Get started →
        </button>
      </nav>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center py-24">
        <div className="inline-flex items-center gap-2 bg-[#F5C842]/10 border border-[#F5C842]/20 rounded-full px-4 py-1.5 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F5C842] animate-pulse" />
          <span className="text-[#F5C842] text-xs font-dm tracking-wide">Built for young professionals in Canada</span>
        </div>

        <h1 className="font-syne font-extrabold text-5xl md:text-7xl leading-[1.05] tracking-tight mb-6 max-w-3xl">
          Your financial<br />
          <span className="text-[#F5C842]">launch pad.</span>
        </h1>

        <p className="text-white/50 font-dm text-lg max-w-md leading-relaxed mb-12">
          Banks don't teach you this. Your employer doesn't either.
          We built the tool that does.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => router.push("/onboarding/quiz")}
            className="bg-[#F5C842] text-black font-syne font-bold text-sm px-8 py-4 rounded-full hover:bg-[#F5C842]/90 active:scale-95 transition-all"
          >
            Build my roadmap →
          </button>
          <button
            onClick={() => router.push("/dashboard")}
            className="border border-white/10 text-white/70 font-dm text-sm px-8 py-4 rounded-full hover:border-white/20 hover:text-white transition-all"
          >
            View demo dashboard
          </button>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-16">
          {["Credit building", "TFSA & RRSP setup", "Budget planning", "Debt payoff", "Emergency fund"].map((f) => (
            <span key={f} className="bg-white/5 border border-white/8 text-white/40 text-xs font-dm px-4 py-2 rounded-full">
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* Stats strip */}
      <div className="border-t border-white/5 grid grid-cols-3 divide-x divide-white/5">
        {[
          { num: "13", label: "Personalized questions" },
          { num: "5", label: "Financial focus areas" },
          { num: "100%", label: "Free to use" },
        ].map((s) => (
          <div key={s.label} className="py-8 flex flex-col items-center gap-1">
            <span className="font-syne font-bold text-2xl text-[#F5C842]">{s.num}</span>
            <span className="text-white/30 text-xs font-dm">{s.label}</span>
          </div>
        ))}
      </div>
    </main>
  )
}