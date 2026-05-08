"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Progress } from "@/components/ui/progress"

const questions = [
  {
    id: "employmentStatus",
    section: "Basic Info",
    question: "What is your employment status?",
    type: "radio",
    options: ["Full-time", "Part-time", "Freelance", "Unemployed", "Student"],
  },
  {
    id: "monthlyIncome",
    section: "Basic Info",
    question: "What is your approximate monthly take-home income?",
    type: "radio",
    options: ["Less than $1,000", "$1,000 - $2,000", "$2,000 - $4,000", "$4,000+"],
  },
  {
    id: "province",
    section: "Basic Info",
    question: "What province do you live in?",
    type: "select",
    options: [
      "Alberta", "British Columbia", "Manitoba", "New Brunswick",
      "Newfoundland and Labrador", "Nova Scotia", "Ontario",
      "Prince Edward Island", "Quebec", "Saskatchewan",
    ],
  },
  {
    id: "hasCreditCard",
    section: "Credit",
    question: "Do you have a credit card?",
    type: "radio",
    options: ["Yes", "No"],
  },
  {
    id: "knowsCreditScore",
    section: "Credit",
    question: "Do you know your credit score?",
    type: "radio",
    options: [
      "Yes, 300-559 (Poor)", "Yes, 560-659 (Fair)",
      "Yes, 660-724 (Good)", "Yes, 725-759 (Very Good)",
      "Yes, 760+ (Excellent)", "No",
    ],
  },
  {
    id: "missedPayments",
    section: "Credit",
    question: "Have you ever missed a bill or loan payment?",
    type: "radio",
    options: ["Never", "Once or twice", "Frequently"],
  },
  {
    id: "hasLoans",
    section: "Credit",
    question: "Do you have any loans?",
    type: "radio",
    options: ["Student loan", "Car loan", "Personal loan", "None"],
  },
  {
    id: "hasTFSA",
    section: "Savings",
    question: "Do you have a TFSA?",
    type: "radio",
    options: ["Yes", "No", "Don't know what that is"],
  },
  {
    id: "hasRRSP",
    section: "Savings",
    question: "Do you have an RRSP?",
    type: "radio",
    options: ["Yes", "No", "Don't know what that is"],
  },
  {
    id: "emergencyFund",
    section: "Savings",
    question: "Do you have an emergency fund?",
    type: "radio",
    options: ["Yes, 3+ months of expenses", "Yes, less than 3 months", "No"],
  },
  {
    id: "saveIncome",
    section: "Savings",
    question: "Do you currently save any portion of your income?",
    type: "radio",
    options: ["Yes, consistently", "Sometimes", "No"],
  },
  {
    id: "financialGoal",
    section: "Goals",
    question: "What is your biggest financial priority right now?",
    type: "radio",
    options: ["Build credit", "Save money", "Pay off debt", "Learn the basics", "Invest"],
  },
  {
    id: "confidence",
    section: "Goals",
    question: "How confident are you with managing money?",
    type: "radio",
    options: ["Not at all", "Somewhat", "Pretty confident"],
  },
]

const sectionColors: Record<string, string> = {
  "Basic Info": "text-blue-400",
  "Credit": "text-[#F5C842]",
  "Savings": "text-emerald-400",
  "Goals": "text-purple-400",
}

export default function QuizPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const current = questions[currentStep]
  const progress = (currentStep / questions.length) * 100

  const handleAnswer = (value: string) => {
    setAnswers((prev) => ({ ...prev, [current.id]: value }))
  }

  const handleNext = async () => {
  if (currentStep < questions.length - 1) {
    setCurrentStep((prev) => prev + 1)
  } else {
    try {
      const { db } = await import("@/lib/firebase")
      const { collection, addDoc, serverTimestamp } = await import("firebase/firestore")
      await addDoc(collection(db, "quiz_responses"), {
        ...answers,
        createdAt: serverTimestamp(),
      })
    } catch (err) {
      console.error("Failed to save answers:", err)
    }
    router.push("/dashboard")
  }
}

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1)
  }

  return (
    <main className="min-h-screen bg-[#0A0A0A] flex flex-col">
      {/* Top bar */}
      <div className="px-6 pt-8 pb-4">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-4">
            <span className="font-syne font-bold text-lg text-white">
              First<span className="text-[#F5C842]">Step</span>
            </span>
            <span className="text-white/30 text-sm font-dm">
              {currentStep + 1} / {questions.length}
            </span>
          </div>
          <Progress
            value={progress}
            className="h-1 bg-white/5 [&>div]:bg-[#F5C842] [&>div]:transition-all [&>div]:duration-500"
          />
        </div>
      </div>

      {/* Question area */}
      <div className="flex-1 flex flex-col justify-center px-6 py-8">
        <div className="max-w-lg mx-auto w-full">
          {/* Section label */}
          <p className={`text-xs font-dm font-medium tracking-widest uppercase mb-3 ${sectionColors[current.section] || "text-white/40"}`}>
            {current.section}
          </p>

          {/* Question */}
          <h2 className="font-syne font-bold text-2xl md:text-3xl text-white leading-tight mb-8">
            {current.question}
          </h2>

          {/* Options */}
          {current.type === "select" ? (
            <div className="grid grid-cols-1 gap-3">
              {current.options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  className={`w-full text-left px-5 py-4 rounded-2xl border font-dm text-sm transition-all duration-200
                    ${answers[current.id] === option
                      ? "bg-[#F5C842]/10 border-[#F5C842]/50 text-[#F5C842]"
                      : "bg-white/3 border-white/8 text-white/70 hover:border-white/20 hover:text-white hover:bg-white/5"
                    }`}
                >
                  {option}
                </button>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {current.options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  className={`w-full text-left px-5 py-4 rounded-2xl border font-dm text-sm transition-all duration-200
                    ${answers[current.id] === option
                      ? "bg-[#F5C842]/10 border-[#F5C842]/50 text-[#F5C842]"
                      : "bg-white/3 border-white/8 text-white/70 hover:border-white/20 hover:text-white hover:bg-white/5"
                    }`}
                >
                  <span className="flex items-center gap-3">
                    <span className={`w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center
                      ${answers[current.id] === option ? "border-[#F5C842] bg-[#F5C842]" : "border-white/20"}`}>
                      {answers[current.id] === option && (
                        <span className="w-1.5 h-1.5 rounded-full bg-black" />
                      )}
                    </span>
                    {option}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom nav */}
      <div className="px-6 pb-10">
        <div className="max-w-lg mx-auto flex gap-3">
          {currentStep > 0 && (
            <button
              onClick={handleBack}
              className="flex-1 py-4 rounded-2xl border border-white/10 text-white/50 font-dm text-sm hover:border-white/20 hover:text-white transition-all"
            >
              Back
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!answers[current.id]}
            className={`flex-1 py-4 rounded-2xl font-syne font-bold text-sm transition-all duration-200
              ${answers[current.id]
                ? "bg-[#F5C842] text-black hover:bg-[#F5C842]/90 active:scale-95"
                : "bg-white/5 text-white/20 cursor-not-allowed"
              }`}
          >
            {currentStep === questions.length - 1 ? "Build my roadmap →" : "Next →"}
          </button>
        </div>
      </div>
    </main>
  )
}