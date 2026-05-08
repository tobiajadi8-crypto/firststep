"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

const sections = [
  {
    id: "deductions",
    title: "Understanding your deductions",
    emoji: "📄",
    content: [
      { label: "CPP (Canada Pension Plan)", desc: "5.95% of your earnings up to ~$68k/year. Goes toward your retirement pension. Your employer matches this." },
      { label: "EI (Employment Insurance)", desc: "1.66% of insurable earnings. Protects you if you lose your job. Your employer pays 1.4x your contribution." },
      { label: "Federal income tax", desc: "Graduated rates: 15% on first $55k, 20.5% up to $111k, 26% up to $154k. Quebec has a separate provincial rate." },
      { label: "Provincial income tax", desc: "Varies by province. Ontario starts at 5.05%, Alberta is a flat 10%. Check your province's rate." },
    ],
  },
  {
    id: "tfsa",
    title: "Setting up your TFSA",
    emoji: "🏦",
    content: [
      { label: "What is it?", desc: "A Tax-Free Savings Account. Any money you invest inside grows completely tax-free — no tax on withdrawals ever." },
      { label: "2024 contribution room", desc: "$7,000 for the year. Unused room carries forward — if you've never contributed, you may have up to $95,000 in room." },
      { label: "What to put in it", desc: "ETFs, index funds, savings account, GICs. Start with a simple all-in-one ETF like XEQT or VGRO." },
      { label: "Where to open one", desc: "Wealthsimple (no fees), your bank, or a discount broker like Questrade. Open one online in 15 minutes." },
    ],
  },
  {
    id: "rrsp",
    title: "Setting up your RRSP",
    emoji: "📈",
    content: [
      { label: "What is it?", desc: "A Registered Retirement Savings Plan. Contributions are tax-deductible — you get a tax refund for contributing." },
      { label: "Contribution limit", desc: "18% of your previous year's earned income, up to $31,560 in 2024. Check your CRA MyAccount for your exact room." },
      { label: "TFSA vs RRSP", desc: "If you're in a low tax bracket now (under $55k), prioritize the TFSA. RRSP is better when you're in a higher bracket." },
      { label: "First Home Buyers Plan", desc: "You can withdraw up to $35,000 from your RRSP tax-free to buy your first home. Must repay over 15 years." },
    ],
  },
  {
    id: "budget",
    title: "The 50/30/20 budget",
    emoji: "📊",
    content: [
      { label: "50% — Needs", desc: "Rent, groceries, transit, utilities, minimum debt payments. If this exceeds 50%, look for ways to reduce fixed costs." },
      { label: "30% — Wants", desc: "Dining out, entertainment, subscriptions, clothing, hobbies. This is where most overspending happens." },
      { label: "20% — Savings & debt", desc: "Emergency fund, TFSA, RRSP, extra debt payments. Pay yourself first by automating this transfer on payday." },
      { label: "Automate it", desc: "Set up automatic transfers on payday. Split your direct deposit or schedule a transfer the same day you get paid." },
    ],
  },
]

export default function PaycheckPage() {
  const router = useRouter()
  const [open, setOpen] = useState<string | null>("deductions")

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
        <p className="text-purple-400 text-xs font-dm uppercase tracking-widest mb-2">Paycheck</p>
        <h1 className="font-syne font-bold text-3xl text-white mb-2">First paycheck guide</h1>
        <p className="text-white/40 font-dm text-sm mb-10">Everything your employer forgot to tell you about your money.</p>

        <div className="space-y-3">
          {sections.map((s) => (
            <div key={s.id} className="bg-[#141414] border border-white/8 rounded-3xl overflow-hidden">
              <button
                onClick={() => setOpen(open === s.id ? null : s.id)}
                className="w-full flex items-center justify-between px-6 py-5 hover:bg-white/3 transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{s.emoji}</span>
                  <span className="font-syne font-bold text-white text-base">{s.title}</span>
                </div>
                <span className={`text-white/30 transition-transform duration-300 ${open === s.id ? "rotate-180" : ""}`}>
                  ↓
                </span>
              </button>

              {open === s.id && (
                <div className="px-6 pb-6 space-y-4 border-t border-white/5">
                  {s.content.map((c) => (
                    <div key={c.label} className="pt-4">
                      <p className="font-syne font-bold text-sm text-white mb-1">{c.label}</p>
                      <p className="font-dm text-sm text-white/50 leading-relaxed">{c.desc}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}