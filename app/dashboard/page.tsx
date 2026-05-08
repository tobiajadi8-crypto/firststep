"use client"
import { useRouter } from "next/navigation"

const milestones = [
  { id: 1, title: "Get a secured credit card", category: "Credit", done: true },
  { id: 2, title: "Open a TFSA account", category: "Savings", done: true },
  { id: 3, title: "Set up 50/30/20 budget", category: "Budget", done: false },
  { id: 4, title: "Build 1-month emergency fund", category: "Savings", done: false },
  { id: 5, title: "Understand your pay stub deductions", category: "Paycheck", done: false },
  { id: 6, title: "Open an RRSP", category: "Savings", done: false },
]

const categoryColors: Record<string, string> = {
  Credit: "bg-[#F5C842]/10 text-[#F5C842] border-[#F5C842]/20",
  Savings: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
  Budget: "bg-blue-400/10 text-blue-400 border-blue-400/20",
  Paycheck: "bg-purple-400/10 text-purple-400 border-purple-400/20",
}

export default function DashboardPage() {
  const router = useRouter()
  const done = milestones.filter((m) => m.done).length
  const progress = Math.round((done / milestones.length) * 100)

  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-5 border-b border-white/5">
        <span className="font-syne font-bold text-lg text-white">
          First<span className="text-[#F5C842]">Step</span>
        </span>
        <div className="flex items-center gap-6">
          <button onClick={() => router.push("/roadmap")} className="text-white/40 text-sm font-dm hover:text-white transition-colors">Roadmap</button>
          <button onClick={() => router.push("/paycheck")} className="text-white/40 text-sm font-dm hover:text-white transition-colors">Paycheck</button>
          <button onClick={() => router.push("/onboarding/quiz")} className="bg-[#F5C842] text-black text-xs font-syne font-bold px-4 py-2 rounded-full hover:bg-[#F5C842]/90 transition-all">
            Retake quiz
          </button>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <p className="text-white/30 text-sm font-dm mb-1">Welcome back</p>
          <h1 className="font-syne font-bold text-3xl text-white">Your financial dashboard</h1>
        </div>

        {/* Score card */}
        <div className="bg-[#141414] border border-white/8 rounded-3xl p-6 mb-6 glow-gold">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-white/40 text-xs font-dm uppercase tracking-widest mb-1">Progress</p>
              <p className="font-syne font-bold text-4xl text-white">{progress}<span className="text-white/30 text-2xl">%</span></p>
            </div>
            <div className="text-right">
              <p className="text-white/40 text-xs font-dm uppercase tracking-widest mb-1">Completed</p>
              <p className="font-syne font-bold text-4xl text-[#F5C842]">{done}<span className="text-white/30 text-2xl">/{milestones.length}</span></p>
            </div>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#F5C842] rounded-full transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={() => router.push("/roadmap")}
            className="bg-[#141414] border border-white/8 rounded-2xl p-5 text-left hover:border-white/15 transition-all group"
          >
            <p className="text-2xl mb-3">🗺️</p>
            <p className="font-syne font-bold text-white text-sm">Credit Roadmap</p>
            <p className="text-white/30 text-xs font-dm mt-1">Step-by-step credit plan</p>
          </button>
          <button
            onClick={() => router.push("/paycheck")}
            className="bg-[#141414] border border-white/8 rounded-2xl p-5 text-left hover:border-white/15 transition-all group"
          >
            <p className="text-2xl mb-3">💰</p>
            <p className="font-syne font-bold text-white text-sm">Paycheck Guide</p>
            <p className="text-white/30 text-xs font-dm mt-1">TFSA, RRSP, deductions</p>
          </button>
        </div>

        {/* Milestone list */}
        <div>
          <h2 className="font-syne font-bold text-lg text-white mb-4">Your milestones</h2>
          <div className="space-y-3">
            {milestones.map((m) => (
              <div
                key={m.id}
                className={`flex items-center gap-4 p-4 rounded-2xl border transition-all
                  ${m.done ? "bg-white/3 border-white/5 opacity-60" : "bg-[#141414] border-white/8 hover:border-white/15"}`}
              >
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0
                  ${m.done ? "bg-[#F5C842] border-[#F5C842]" : "border-white/20"}`}>
                  {m.done && <span className="text-black text-xs font-bold">✓</span>}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-dm text-sm ${m.done ? "line-through text-white/30" : "text-white"}`}>
                    {m.title}
                  </p>
                </div>
                <span className={`text-xs font-dm px-2.5 py-1 rounded-full border ${categoryColors[m.category]}`}>
                  {m.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}