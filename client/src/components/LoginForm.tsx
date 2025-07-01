import { useState } from "react"
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
        alert("Registration successful! Please log in.")
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

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">{isRegistering ? "Register" : "Login"}</h2>
      <div className="mb-4">
        <label className="block mb-1">Username</label>
        <input
          className="w-full border px-3 py-2 rounded"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
      </div>
      {isRegistering && (
        <div className="mb-4">
          <label className="block mb-1">Email (optional)</label>
          <input
            className="w-full border px-3 py-2 rounded"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
      )}
      <div className="mb-4">
        <label className="block mb-1">Password</label>
        <input
          className="w-full border px-3 py-2 rounded"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mb-2"
        disabled={loading}
      >
        {loading ? (isRegistering ? "Registering..." : "Logging in...") : (isRegistering ? "Register" : "Login")}
      </button>
      <button
        type="button"
        className="w-full text-blue-600 hover:text-blue-700 text-sm"
        onClick={() => {
          setIsRegistering(!isRegistering)
          setError(null)
        }}
      >
        {isRegistering ? "Already have an account? Login" : "Don't have an account? Register"}
      </button>
    </form>
  )
} 