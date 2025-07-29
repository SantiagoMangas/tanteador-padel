import type React from "react"
import { useState, useEffect } from "react"

interface Team {
  id: number
  players: [string, string]
}

interface GameState {
  team1Score: number // 0, 15, 30, 40, 50 (ventaja)
  team2Score: number
  team1Sets: number
  team2Sets: number
  team1Games: number
  team2Games: number
  isDeuce: boolean
  hasAdvantage: number | null // 1 o 2, null si no hay ventaja
  currentSet: number
  matchStatus: "EN JUEGO" | "DESCANSO" | "CAMBIO DE LADO" | "FINALIZADO"
  winner: number | null
}

// Componente para números LED
const LEDNumber: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div
    className={`font-mono text-white bg-black border-2 border-yellow-400 
    px-4 py-2 text-center shadow-lg ${className}`}
    style={{
      fontFamily: "monospace",
      textShadow: "0 0 10px #ffff00, 0 0 20px #ffff00, 0 0 30px #ffff00",
      backgroundColor: "#0a0a0a",
    }}
  >
    {children}
  </div>
)

const GameScoreboard: React.FC = () => {
  // Estado inicial
  const [gameState, setGameState] = useState<GameState>({
    team1Score: 0,
    team2Score: 0,
    team1Sets: 0,
    team2Sets: 0,
    team1Games: 0,
    team2Games: 0,
    isDeuce: false,
    hasAdvantage: null,
    currentSet: 1,
    matchStatus: "EN JUEGO",
    winner: null,
  })

  // Equipos
  const [teams] = useState<[Team, Team]>([
    { id: 1, players: ["FERNANDO POTRO", "MARTIN PEREZOSO"] },
    { id: 2, players: ["ADRIAN LIMON", "CACO PANCHO"] },
  ])

  // Timer del partido
  const [matchTime, setMatchTime] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(true)

  // Timer para cambio de lado
  const [sideChangeTime, setSideChangeTime] = useState(45)

  // Información del torneo
  const tournamentInfo = '4ta - libres - Z "A"'

  // Timer effect para el tiempo del partido
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null

    if (isTimerRunning && gameState.matchStatus !== "FINALIZADO" && gameState.matchStatus !== "CAMBIO DE LADO") {
      interval = setInterval(() => {
        setMatchTime((prevTime) => prevTime + 1)
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isTimerRunning, gameState.matchStatus])

  // Timer effect para cambio de lado
  useEffect(() => {
    if (gameState.matchStatus === "CAMBIO DE LADO") {
      setSideChangeTime(45)
      const timer = setInterval(() => {
        setSideChangeTime((prev) => {
          if (prev <= 1) {
            setGameState((prevState) => ({ ...prevState, matchStatus: "EN JUEGO" }))
            return 45
          }
          return prev - 1
        })
      }, 1000)
      
      return () => clearInterval(timer)
    }
  }, [gameState.matchStatus])

  // Formatear tiempo
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  // Formatear tiempo de cambio de lado
  const formatSideChangeTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  // Convertir puntuación a display
  const getScoreDisplay = (score: number, isAdvantage: boolean, hasAdv: number | null, teamId: number): string => {
    if (gameState.isDeuce && hasAdv === null) return "40"
    if (isAdvantage && hasAdv === teamId) return "V"
    if (isAdvantage && hasAdv !== teamId && hasAdv !== null) return "40"

    switch (score) {
      case 0:
        return "0"
      case 15:
        return "15"
      case 30:
        return "30"
      case 40:
        return "40"
      default:
        return "0"
    }
  }

  // Lógica para sumar punto
  const addPoint = (teamId: 1 | 2) => {
    if (gameState.matchStatus === "FINALIZADO" || 
        gameState.matchStatus === "CAMBIO DE LADO" || 
        gameState.matchStatus === "DESCANSO") return

    setGameState((prev) => {
      const isTeam1 = teamId === 1
      const currentTeamScore = isTeam1 ? prev.team1Score : prev.team2Score
      const opponentScore = isTeam1 ? prev.team2Score : prev.team1Score

      const newState = { ...prev }

      // Si hay ventaja
      if (prev.hasAdvantage !== null) {
        if (prev.hasAdvantage === teamId) {
          // El equipo con ventaja gana el game
          return winGame(newState, teamId)
        } else {
          // Volver a deuce
          newState.hasAdvantage = null
          newState.isDeuce = true
          return newState
        }
      }

      // Si ambos están en 40 (deuce)
      if (prev.isDeuce || (currentTeamScore === 40 && opponentScore === 40)) {
        newState.hasAdvantage = teamId
        newState.isDeuce = false
        return newState
      }

      // Progresión normal de puntos
      if (currentTeamScore < 40) {
        const nextScore = currentTeamScore === 0 ? 15 : currentTeamScore === 15 ? 30 : 40

        if (isTeam1) {
          newState.team1Score = nextScore
        } else {
          newState.team2Score = nextScore
        }

        // Verificar si se forma deuce
        if (nextScore === 40 && opponentScore === 40) {
          newState.isDeuce = true
        }

        return newState
      }

      // Si el equipo ya tiene 40 y el oponente no
      if (currentTeamScore === 40 && opponentScore < 40) {
        return winGame(newState, teamId)
      }

      return newState
    })
  }

  // Ganar game
  const winGame = (state: GameState, teamId: 1 | 2): GameState => {
    const newState = { ...state }

    // Resetear puntuación del game
    newState.team1Score = 0
    newState.team2Score = 0
    newState.isDeuce = false
    newState.hasAdvantage = null

    // Agregar game al equipo ganador
    if (teamId === 1) {
      newState.team1Games += 1
    } else {
      newState.team2Games += 1
    }

    // Verificar si se gana el set
    const team1Games = newState.team1Games
    const team2Games = newState.team2Games

    if ((team1Games >= 6 && team1Games - team2Games >= 2) || (team2Games >= 6 && team2Games - team1Games >= 2)) {
      const setWinner = team1Games > team2Games ? 1 : 2

      // Agregar set al ganador
      if (setWinner === 1) {
        newState.team1Sets += 1
      } else {
        newState.team2Sets += 1
      }

      console.log(`Set ganado por equipo ${setWinner}. Sets actuales: ${newState.team1Sets}-${newState.team2Sets}`)

      // Verificar si se gana el match (mejor de 3) DESPUÉS de asignar el set
      if (newState.team1Sets >= 2 || newState.team2Sets >= 2) {
        newState.matchStatus = "FINALIZADO"
        newState.winner = newState.team1Sets >= 2 ? 1 : 2
        console.log(`Match finalizado. Ganador: Equipo ${newState.winner}`)
        return newState
      }

      // Resetear games solo si el match no ha terminado
      newState.team1Games = 0
      newState.team2Games = 0
      newState.currentSet += 1

      console.log(`Continuando al set ${newState.currentSet}`)

      // Cambio de lado automático al final del set (solo si el match continúa)
      newState.matchStatus = "CAMBIO DE LADO"
    }

    return newState
  }

  // Cambio de lado manual
  const changeSide = () => {
    setGameState((prev) => ({
      ...prev,
      matchStatus: "CAMBIO DE LADO",
    }))
  }

  // Pausa/Reanudar
  const toggleTimer = () => {
    setIsTimerRunning((prev) => !prev)
    setGameState((prev) => ({
      ...prev,
      matchStatus: prev.matchStatus === "DESCANSO" ? "EN JUEGO" : "DESCANSO",
    }))
  }

  // Reset match
  const resetMatch = () => {
    setGameState({
      team1Score: 0,
      team2Score: 0,
      team1Sets: 0,
      team2Sets: 0,
      team1Games: 0,
      team2Games: 0,
      isDeuce: false,
      hasAdvantage: null,
      currentSet: 1,
      matchStatus: "EN JUEGO",
      winner: null,
    })
    setMatchTime(0)
    setIsTimerRunning(true)
    setSideChangeTime(45)
  }

  return (
    <div className="bg-black text-white font-mono">
      {/* Pantalla Principal del Tanteador - Flexbox Layout */}
      <div className="h-screen bg-black p-6">
        <div className="flex flex-col h-full gap-4 mx-auto">
          {/* Fila 1: TIEMPO + Info Torneo | SET */}
          <div className="flex flex-row gap-4 flex-1">
            {/* TIEMPO + Info Torneo */}
            <div className="flex-1 flex flex-col">
              <div
                className="text-center text-8xl font-bold mb-2"
                style={{ 
                  backgroundColor: gameState.matchStatus === "CAMBIO DE LADO" ? "#00BCD4" : "#FFEB3B",
                  color: gameState.matchStatus === "CAMBIO DE LADO" ? "#ffffff" : "black"
                }}
              >
                {gameState.matchStatus === "CAMBIO DE LADO" ? formatSideChangeTime(sideChangeTime) : formatTime(matchTime)}
              </div>
              <div className="text-white text-center text-6xl font-bold">{tournamentInfo}</div>
            </div>

            {/* SET */}
            <div className="flex-1 flex items-center justify-center">
              <div className="flex flex-col items-center w-full max-w-[420px]">
                <div
                  className="bg-yellow-400 text-black text-7xl font-bold w-full text-center mb-2"
                  style={{ backgroundColor: "#FFEB3B" }}
                >
                  SET
                </div>
                <div className="flex items-center justify-center gap-6">
                  <div className="bg-green-600 w-36 h-36 flex items-center justify-center text-white text-9xl font-bold">
                    {gameState.team1Sets}
                  </div>
                  <div className="text-yellow-400 text-5xl font-bold tracking-wide">-{gameState.currentSet}-</div>
                  <div className="bg-red-600 w-36 h-36 flex items-center justify-center text-white text-9xl font-bold">
                    {gameState.team2Sets}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Fila 2: GAME Header | Logo/Publicidad */}
          <div className="flex flex-row gap-4 flex-1">
            {/* GAME Header */}
            <div className="flex-1 flex flex-col items-center">
              <div
                className="bg-yellow-400 text-black text-center text-8xl font-bold w-full mb-2"
                style={{ backgroundColor: "#FFEB3B" }}
              >
                GAME
              </div>
              <div className="flex justify-between w-full gap-4">
                <div className="bg-green-600 w-72 h-52 flex items-center justify-center text-white text-9xl font-bold">
                  {getScoreDisplay(gameState.team1Score, gameState.hasAdvantage !== null, gameState.hasAdvantage, 1)}
                </div>
                <div className="bg-red-600 w-72 h-52 flex items-center justify-center text-white text-9xl font-bold">
                  {getScoreDisplay(gameState.team2Score, gameState.hasAdvantage !== null, gameState.hasAdvantage, 2)}
                </div>
              </div>
            </div>

            {/* Logo/Publicidad Central */}
            <div className="flex-1 flex items-center justify-center">
              <div className="bg-amber-700 w-full h-full flex items-center justify-center">
                <div className="text-center text-white text-2xl">⚡PUBLICIDAD</div>
              </div>
            </div>
          </div>

          {/* Fila 4: Nombres de Jugadores, Cambio de Lado o Ganador */}
          <div className="flex flex-row gap-4 flex-1">
            {gameState.matchStatus === "FINALIZADO" ? (
              // Cartel de Ganador
              <div className="w-full flex items-center justify-center relative">
                <div 
                  className="w-full h-full flex items-center justify-center text-white text-6xl font-bold relative overflow-hidden"
                  style={{ backgroundColor: "#4CAF50" }}
                >
                  <div className="flex flex-col items-center">
                    <div className="text-6xl font-bold mb-4">🏆 GANADOR 🏆</div>
                    <div className="text-5xl">EQUIPO {gameState.winner}</div>
                  </div>
                </div>
              </div>
            ) : gameState.matchStatus === "CAMBIO DE LADO" ? (
              // Cartel de Cambio de Lado
              <div className="w-full flex items-center justify-center relative">
                <div 
                  className="w-full h-full flex items-center justify-center text-white text-6xl font-bold relative overflow-hidden"
                  style={{ backgroundColor: "#00BCD4" }}
                >
                  {/* Flecha izquierda */}
                  <div className="absolute left-8 text-8xl">←</div>
                  
                  {/* Contenido central */}
                  <div className="flex flex-col items-center">
                    <div className="text-6xl font-bold">CAMBIO DE LADO</div>
                  </div>
                  
                  {/* Flecha derecha */}
                  <div className="absolute right-8 text-8xl">→</div>
                </div>
              </div>
            ) : (
              // Nombres de jugadores normales
              <>
                {/* Equipo 1 - Nombres */}
                <div className="flex-1 flex flex-col gap-2">
                  <div className="bg-green-600 text-white text-center py-3 px-4 text-3xl font-bold">{teams[0].players[0]}</div>
                  <div className="bg-green-600 text-white text-center py-3 px-4 text-3xl font-bold">{teams[0].players[1]}</div>
                </div>

                {/* Equipo 2 - Nombres */}
                <div className="flex-1 flex flex-col gap-2">
                  <div className="bg-red-600 text-white text-center py-3 px-4 text-3xl font-bold">{teams[1].players[0]}</div>
                  <div className="bg-red-600 text-white text-center py-3 px-4 text-3xl font-bold">{teams[1].players[1]}</div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Panel de Control (fuera del diseño visual) */}
      <div className="fixed bottom-4 left-4 bg-gray-800 p-4 rounded-lg border border-gray-600 space-y-2">
        <h3 className="text-lg font-bold text-yellow-400 mb-3">Control del Partido</h3>

        <div className="flex space-x-2">
          <button
            onClick={() => addPoint(1)}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm font-bold disabled:bg-gray-500 disabled:cursor-not-allowed"
            disabled={gameState.matchStatus === "FINALIZADO" || gameState.matchStatus === "CAMBIO DE LADO" || gameState.matchStatus === "DESCANSO"}
          >
            +1 Verde
          </button>

          <button
            onClick={() => addPoint(2)}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm font-bold disabled:bg-gray-500 disabled:cursor-not-allowed"
            disabled={gameState.matchStatus === "FINALIZADO" || gameState.matchStatus === "CAMBIO DE LADO" || gameState.matchStatus === "DESCANSO"}
          >
            +1 Rojo
          </button>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={changeSide}
            className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded text-sm font-bold text-black"
            disabled={gameState.matchStatus === "FINALIZADO" || gameState.matchStatus === "CAMBIO DE LADO"}
          >
            Cambio Lado
          </button>

          <button
            onClick={toggleTimer}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm font-bold"
            disabled={gameState.matchStatus === "FINALIZADO" || gameState.matchStatus === "CAMBIO DE LADO"}
          >
            {isTimerRunning ? "Pausa" : "Reanudar"}
          </button>
        </div>

        <button
          onClick={resetMatch}
          className="w-full bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-sm font-bold"
        >
          Reiniciar Partido
        </button>

        {/* Info del estado actual */}
        <div className="text-xs text-gray-300 mt-3 border-t border-gray-600 pt-2">
          <div>Set: {gameState.currentSet}/3</div>
          <div>
            Games: {gameState.team1Games}-{gameState.team2Games}
          </div>
          <div>Deuce: {gameState.isDeuce ? "Sí" : "No"}</div>
          {gameState.hasAdvantage && <div>Ventaja: Equipo {gameState.hasAdvantage}</div>}
          {gameState.matchStatus === "CAMBIO DE LADO" && (
            <div>Cambio de lado: {formatSideChangeTime(sideChangeTime)}</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default GameScoreboard