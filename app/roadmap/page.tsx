"use client"
import { useRouter } from "next/navigation"

const steps = [
  {
    step: 1,
    title: "Get a secured credit card",
    description: "No credit history required. Deposit $200-$500 as collateral and use it for small recurring purchases like subscriptions.",
    action: "Apply at Scotiabank, TD, or KOHO",
    impact: "High",
    timeframe: "This week",
  },
  {
    step: 2,
    title: "Set up autopay",
    description: "Always pay your full balance every month. A single missed payment can drop your score by 50-100 points.",
    action: "Enable autopay in your bank app",
    impact: "High",
    timeframe: "Same day",
  },
  {
    step: 3,
    title: "Keep utilization below 30%",
    description: "If your credit limit is $500, never carry more than $150 in charges. Lower is better.",
    action: "Set a spending alert in your banking app",
    impact: "High",
    timeframe: "Ongoing",
  },
  {
    step: 4,
    title: "Become an authorized user",
    description: "Ask a trusted family member to add you to their card. Their good history boosts your score immediately.",
    action: "Talk to a family member with good credit",
    impact: "Medium",
    timeframe: "This month",
  },
  {
    step: 5,
    title: "Report your rent payments",
    description: "Services like Landlord Credit Bureau report your on-time rent to credit bureaus. Free credit building.",
    action: "Sign up at landlordcreditbureau.ca",
    impact: "Medium",
    timeframe: "This month",
  },
  {
    step: 6,
    title: "Open a second credit product",
    description: "After 6-12 months, apply for a store card or low-limit card to diversify your credit mix.",
    action: "Check pre-approvals in your bank app",
    impact: "Medium",
    timeframe: "In 6-12 months",
  },
]

const impactColors: Record<string, string> = {
  High: "bg-[#F5C842]/10 text-[#F5C842] border-[#F5C842]/20",
  Medium: "bg-blue-400/10 text-blue-400 border-blue-400/20",
  Low: "bg-white/5 text-white/40 border-white/10",
}

export default function RoadmapPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <nav className="flex items-center justify-between px-6 py-5 border-b border-white/5">
        <button onClick={() => router.push("/dashboard")} className="text-white/40 text-sm font-dm hover:text-white transition-colors">
          ← Dashboard
        </button>
        <span className="font-syne font-bold text-lg text-white">
          First<span className="text-[#F5C842]">Step</span>
        </span>
        <div className="w-16" />
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <p className="text-[#F5C842] text-xs font-dm uppercase tracking-widest mb-2">Credit</p>
        <h1 className="font-syne font-bold text-3xl text-white mb-2">Your credit roadmap</h1>
        <p className="text-white/40 font-dm text-sm mb-10">Follow these steps in order to build a strong credit profile.</p>

        <div className="space-y-4">
          {steps.map((s, i) => (
            <div key={s.step} className="bg-[#141414] border border-white/8 rounded-3xl p-6 hover:border-white/15 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#F5C842]/10 border border-[#F5C842]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[#F5C842] text-xs font-syne font-bold">{s.step}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <h3 className="font-syne font-bold text-white text-base">{s.title}</h3>
                    <span className={`text-xs font-dm px-2 py-0.5 rounded-full border ${impactColors[s.impact]}`}>
                      {s.impact} impact
                    </span>
                  </div>
                  <p className="text-white/50 font-dm text-sm leading-relaxed mb-3">{s.description}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-emerald-400 text-xs font-dm">→ {s.action}</p>
                    <span className="text-white/20 text-xs font-dm">{s.timeframe}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}