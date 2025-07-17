import { useEffect, useState } from "react"

interface WarmupScreenProps {
  onComplete: () => void
}

export function WarmupScreen({ onComplete }: WarmupScreenProps) {
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutos
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
      <div className="w-full h-screen bg-black flex items-center justify-center text-center">
        <div className="space-y-4">
          <h1 className="text-yellow-400 text-6xl md:text-8xl font-black animate-pulse">
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
      </div>
    </div>
  )
}
