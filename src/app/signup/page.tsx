import { SignupForm } from "@/components/signup-form"
import { BookOpen } from "lucide-react"
import Link from "next/link"

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-950 to-emerald-950 relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-blue-600/25 to-green-600/25 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity">
            <BookOpen className="w-10 h-10 text-emerald-400" />
            <span className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              ResearchHub
            </span>
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">Get Started</h1>
          <p className="text-gray-300">Create your account to find the perfect journal</p>
        </div>
        <SignupForm />
        <p className="text-center mt-4 text-sm text-gray-300">
          Already have an account?{" "}
          <Link href="/login" className="text-cyan-400 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
