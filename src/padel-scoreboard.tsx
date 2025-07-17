"use client"

import { useState } from "react"
import { InitialScreen } from "./components/initial-screen"
import { WarmupScreen } from "./components/warmup-screen"
import { GameScoreboard } from "./components/game-scoreboard"

type GameState = "initial" | "warmup" | "game"

export default function PadelScoreboard() {
  const [gameState, setGameState] = useState<GameState>("initial")

  const handleStart = () => {
    setGameState("warmup")
  }

  const handleWarmupComplete = () => {
    setGameState("game")
  }

  switch (gameState) {
    case "initial":
      return <InitialScreen onStart={handleStart} />
    case "warmup":
      return <WarmupScreen onComplete={handleWarmupComplete} />
    case "game":
      return <GameScoreboard />
    default:
      return <InitialScreen onStart={handleStart} />
  }
}
