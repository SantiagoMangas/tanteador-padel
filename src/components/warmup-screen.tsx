"use client"

import { useState, useEffect } from "react"

interface WarmupScreenProps {
  onComplete: () => void
}

export function WarmupScreen({ onComplete }: WarmupScreenProps) {
  const [timeLeft, setTimeLeft] = useState(5) // 5 segundos
  const [isFinished, setIsFinished] = useState(false)

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (!isFinished) {
      setIsFinished(true)
      // Mostrar mensaje final por 3 segundos
      setTimeout(() => onComplete(), 3000)
    }
  }, [timeLeft, isFinished, onComplete])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (isFinished) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center relative overflow-hidden">
        {/* Fondo con efecto */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-800 via-green-600 to-green-400 opacity-40" />

        {/* Mensaje final */}
        <div className="relative z-10 text-center">
          <h1
            className="text-8xl font-black text-yellow-400 mb-4 animate-pulse"
            style={{
              textShadow: "4px 4px 0px #dc2626, 8px 8px 0px #991b1b",
              WebkitTextStroke: "2px #dc2626",
            }}
          >
            TIEMPO DE CALENTAMIENTO
          </h1>
          <h2
            className="text-8xl font-black text-yellow-400 animate-pulse"
            style={{
              textShadow: "4px 4px 0px #dc2626, 8px 8px 0px #991b1b",
              WebkitTextStroke: "2px #dc2626",
            }}
          >
            FINALIZADO!!!
          </h2>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-screen bg-black text-white flex flex-col">
      {/* Cronómetro principal */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-8">
          <div className="bg-yellow-400 text-black px-16 py-8 rounded-2xl shadow-2xl">
            <div className="text-9xl font-mono font-black tracking-wider">{formatTime(timeLeft)}</div>
          </div>

          {/* Logo publicitario simulado */}
          <div className="bg-red-600 text-white px-12 py-6 rounded-xl shadow-xl">
            <div className="text-4xl font-bold italic">Coca-Cola</div>
          </div>
        </div>
      </div>

      {/* Banda de estado */}
      <div className="bg-yellow-400 text-black text-center py-6">
        <div className="text-4xl font-bold tracking-wide">TIEMPO DE CALENTAMIENTO</div>
      </div>

      {/* Banda inferior */}
      <div className="bg-blue-600 text-white text-center py-6">
        <div className="text-3xl font-bold tracking-wide">PARA COMENZAR PARTIDO PRESIONE</div>
      </div>
    </div>
  )
}
