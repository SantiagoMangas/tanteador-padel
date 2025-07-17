"use client"

import { useState, useEffect } from "react"
import { LEDNumber } from "./led-number"

export function GameScoreboard() {
  const [gameTime, setGameTime] = useState(0)
  const [gameScore, setGameScore] = useState({ team1: 0, team2: 0 })
  const [setScore, setSetScore] = useState({ team1: 0, team2: 1 })
  const [gameState, setGameState] = useState<"playing" | "break" | "changeSide">("break")
  const [breakTime, setBreakTime] = useState(85) // 1:25 en segundos

  useEffect(() => {
    const timer = setInterval(() => {
      if (gameState === "playing") {
        setGameTime((prev) => prev + 1)
      } else if (gameState === "break" && breakTime > 0) {
        setBreakTime((prev) => prev - 1)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [gameState, breakTime])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getStateMessage = () => {
    switch (gameState) {
      case "break":
        return `DESCANSO ${formatTime(breakTime)}`
      case "changeSide":
        return "CAMBIO DE LADO"
      default:
        return "EN JUEGO"
    }
  }

  const getStateColor = () => {
    switch (gameState) {
      case "break":
        return "bg-blue-500"
      case "changeSide":
        return "bg-blue-600"
      default:
        return "bg-green-600"
    }
  }

  return (
    <div className="w-full h-screen bg-black text-white font-mono flex flex-col">
      {/* Header con cronómetro y zona del torneo */}
      <div className="flex justify-between items-center p-6 bg-gray-900">
        <LEDNumber value={formatTime(gameTime)} size="medium" color="yellow" />
        <div className="text-white text-3xl font-bold">4ta - libres - Z "A"</div>
      </div>

      {/* Estado del partido */}
      <div className={`${getStateColor()} text-center py-4`}>
        <div className="text-white text-3xl font-bold tracking-wide">{getStateMessage()}</div>
      </div>

      {/* Contenedor principal del marcador */}
      <div className="flex-1 flex p-6 space-x-6">
        {/* Lado izquierdo - GAME y jugadores equipo 1 */}
        <div className="w-1/2 space-y-6">
          {/* Marcador GAME */}
          <div className="space-y-4">
            <div className="bg-yellow-400 text-black text-center py-3 text-4xl font-bold rounded">GAME</div>
            <div className="flex space-x-4">
              <LEDNumber value={gameScore.team1} color="green" />
              <LEDNumber value={gameScore.team2} color="red" />
            </div>
          </div>

          {/* Nombres de jugadores equipo 1 */}
          <div className="space-y-3">
            <div className="bg-green-600 text-white text-center py-4 text-2xl font-bold rounded border-2 border-green-400">
              FERNANDO POTRO
            </div>
            <div className="bg-green-600 text-white text-center py-4 text-2xl font-bold rounded border-2 border-green-400">
              MARTIN PEREZOSO
            </div>
          </div>

          {/* Controles */}
          <div className="flex space-x-2">
            <button
              onClick={() => setGameScore((prev) => ({ ...prev, team1: prev.team1 + 1 }))}
              className="bg-green-700 hover:bg-green-600 px-4 py-2 rounded text-sm"
            >
              +1 Verde
            </button>
            <button
              onClick={() => setGameState(gameState === "playing" ? "break" : "playing")}
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-sm"
            >
              {gameState === "playing" ? "Pausar" : "Jugar"}
            </button>
          </div>
        </div>

        {/* Lado derecho - SET y jugadores equipo 2 */}
        <div className="w-1/2 space-y-6">
          {/* Marcador SET */}
          <div className="space-y-4">
            <div className="bg-yellow-400 text-black text-center py-3 text-4xl font-bold rounded">SET</div>
            <div className="flex items-center justify-center space-x-6">
              <LEDNumber value={setScore.team1} size="medium" color="green" />
              <div className="text-yellow-400 text-5xl font-bold">-1-</div>
              <LEDNumber value={setScore.team2} size="medium" color="red" />
            </div>
          </div>

          {/* Nombres de jugadores equipo 2 */}
          <div className="space-y-3">
            <div className="bg-red-600 text-white text-center py-4 text-2xl font-bold rounded border-2 border-red-400">
              ADRIAN LIMON
            </div>
            <div className="bg-red-600 text-white text-center py-4 text-2xl font-bold rounded border-2 border-red-400">
              CACO PANCHO
            </div>
          </div>

          {/* Espacio publicitario */}
          <div className="bg-gradient-to-r from-orange-500 to-red-600 h-32 flex items-center justify-center rounded-lg border-2 border-orange-400">
            <div className="text-white text-3xl font-bold italic transform -skew-x-12">Nike</div>
          </div>

          {/* Controles */}
          <div className="flex space-x-2">
            <button
              onClick={() => setGameScore((prev) => ({ ...prev, team2: prev.team2 + 1 }))}
              className="bg-red-700 hover:bg-red-600 px-4 py-2 rounded text-sm"
            >
              +1 Rojo
            </button>
            <button
              onClick={() => setGameState("changeSide")}
              className="bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded text-sm"
            >
              Cambio
            </button>
          </div>
        </div>
      </div>

      {/* Banda inferior */}
      <div className="bg-blue-600 text-white text-center py-4">
        <div className="text-3xl font-bold tracking-wide flex items-center justify-center">
          <span className="mr-4">←</span>
          <span>CAMBIO DE LADO</span>
          <span className="ml-4">→</span>
        </div>
      </div>
    </div>
  )
}
