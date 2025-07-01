import { useState } from "react"
import { CheckSquare, Check, Clock, Users, Shield, Zap } from "lucide-react"
import * as api from "../api/todoApi"

export default function LoginForm({ onLogin }: { onLogin: (accessToken: string, refreshToken: string) => void }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [isRegistering, setIsRegistering] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      if (isRegistering) {
        await api.registerUser(username, password, email)
        setIsRegistering(false)
        setError(null)
        setUsername("")
        setPassword("")
        setEmail("")
      } else {
        const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/"
        const res = await fetch(`${API_BASE}token/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        })
        if (!res.ok) throw new Error("Invalid credentials")
        const data = await res.json()
        onLogin(data.access, data.refresh)
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const benefits = [
    { icon: Check, title: "Stay Organized", description: "Keep track of all your tasks in one place" },
    { icon: Clock, title: "Never Miss Deadlines", description: "Set due dates and get organized by priority" },
    { icon: Users, title: "Categorize Tasks", description: "Organize with custom categories and colors" },
    { icon: Shield, title: "Secure & Private", description: "Your data is safe and belongs only to you" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl mx-auto flex items-center justify-center">
        {/* Left Side - Benefits */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12">
          <div className="max-w-md mx-auto">
            {/* Logo */}
            <div className="flex items-center mb-8">
              <CheckSquare className="h-10 w-10 text-blue-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">TodoApp</h1>
            </div>
            
            {/* Tagline */}
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Organize your life, one task at a time
            </h2>
            <p className="text-gray-600 mb-8">
              The simple, powerful way to manage your tasks and boost your productivity.
            </p>

            {/* Benefits */}
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-lg mr-4">
                    <benefit.icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-8 lg:px-12">
          <div className="max-w-md mx-auto w-full">
            {/* Mobile Logo */}
            <div className="flex items-center justify-center mb-8 lg:hidden">
              <CheckSquare className="h-8 w-8 text-blue-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">TodoApp</h1>
            </div>

          {/* Auth Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {isRegistering ? "Create Account" : "Welcome Back"}
              </h2>
              <p className="text-gray-600">
                {isRegistering 
                  ? "Join thousands of users getting organized" 
                  : "Sign in to access your todos"
                }
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  required
                  placeholder="Enter your username"
                />
              </div>

              {isRegistering && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-gray-400">(optional)</span>
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {isRegistering ? "Creating Account..." : "Signing In..."}
                  </div>
                ) : (
                  <>
                    {isRegistering ? "Create Account" : "Sign In"}
                    <Zap className="h-4 w-4 ml-2" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                onClick={() => {
                  setIsRegistering(!isRegistering)
                  setError(null)
                  setUsername("")
                  setPassword("")
                  setEmail("")
                }}
              >
                {isRegistering 
                  ? "Already have an account? Sign in" 
                  : "Don't have an account? Create one"
                }
              </button>
            </div>

            {isRegistering && (
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  By creating an account, you agree to keep your tasks organized and productive! 🚀
                </p>
              </div>
            )}
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}
