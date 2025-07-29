<<<<<<< HEAD
import { useState, useEffect } from "react"
=======
import { useEffect, useState } from "react"
>>>>>>> d340090d49f91b01944b43dcdcd9b8bb9c14269b

interface WarmupScreenProps {
  onComplete: () => void
}

export function WarmupScreen({ onComplete }: WarmupScreenProps) {
<<<<<<< HEAD
  const [timeLeft, setTimeLeft] = useState(5) // 5segundos
=======
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutos
>>>>>>> d340090d49f91b01944b43dcdcd9b8bb9c14269b
  const [isFinished, setIsFinished] = useState(false)

  // Temporizador
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (!isFinished) {
      setIsFinished(true)
      setTimeout(() => onComplete(), 3000)
    }
  }, [timeLeft, isFinished, onComplete])

  // Formateo mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  // Vista al finalizar
  if (isFinished) {
    return (
<<<<<<< HEAD
      <div className="w-full h-screen bg-black flex items-center justify-center relative overflow-hidden">
        <img src = "../assets/fondo-precione.jpg" alt="Fondo" className="absolute inset-0 w-full h-full object-cover" />

        {/* Mensaje final */}
        <div className="relative z-10 text-center">
          <h1
            className="text-8xl font-black text-yellow-400 mb-4 animate-pulse"
            style={{
              textShadow: "4px 4px 0px #dc2626, 8px 8px 0px #991b1b",
              WebkitTextStroke: "2px #dc2626",
            }}
          >
=======
      <div className="w-full h-screen bg-black flex items-center justify-center text-center">
        <div className="space-y-4">
          <h1 className="text-yellow-400 text-6xl md:text-8xl font-black animate-pulse">
>>>>>>> d340090d49f91b01944b43dcdcd9b8bb9c14269b
            TIEMPO DE CALENTAMIENTO
          </h1>
          <h2 className="text-yellow-400 text-6xl md:text-8xl font-black animate-pulse">
            FINALIZADO!!!
          </h2>
        </div>
      </div>
    )
  }

  return (
<<<<<<< HEAD
    <div className="w-full h-screen bg-black text-white flex flex-col gap-6">
      {/* Cronómetro */}
      <div className="flex-1 flex items-center justify-center">
          <div className="text-yellow-300 px-40 py-40">
            <div className="text-9xl font-mono font-black tracking-wider">{formatTime(timeLeft)}</div>
          </div>

          {/* Logo publicitario simulado */}
          <div className="bg-red-600 text-white px-80 py-50">
            <div className="text-4xl font-bold italic">Coca-Cola</div>
          </div>
      </div>

      {/* Banda de estado */}
      <div className="bg-yellow-300 text-black text-center py-6">
        <div className="text-6xl font-bold tracking-wide">TIEMPO DE CALENTAMIENTO</div>
      </div>

      {/* Banda inferior */}
      <div className="bg-blue-600 text-white text-center py-4">
        <div className="text-6xl font-bold tracking-wide">PARA COMENZAR PARTIDO PRESIONE</div>
=======
    <div className="grid gap-6 w-full h-screen bg-black text-white">
      <div className="flex flex-1 p-4 gap-4 items-center justify-center">
        <div className="bg-black text-yellow-400 text-[8rem] md:text-[15rem] px-6 py-4">
          {formatTime(timeLeft)}
        </div>

        <div className="bg-white flex items-center justify-center h-full max-h-[600px] p-2">
          <img
            src="../assets/PublicidadCoca.png"
            alt="Publicidad"
            className="h-full object-contain"
          />
        </div>
      </div>

      <div className="flex bg-yellow-400 text-black justify-center items-center">
        <div className="text-6xl md:text-8xl font-bold tracking-wider">
          TIEMPO DE CALENTAMIENTO
        </div>
      </div>

      <div className="flex justify-center items-center bg-sky-500 text-white text-center">
        <div className="text-3xl md:text-6xl font-bold tracking-wide">
          PARA COMENZAR PARTIDO PRESIONE
        </div>
>>>>>>> d340090d49f91b01944b43dcdcd9b8bb9c14269b
      </div>
    </div>
  )
}
