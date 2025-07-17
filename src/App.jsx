import { useState } from 'react'
import PadelScoreboard from "./padel-scoreboard"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <PadelScoreboard />
    </div>
  )
}

export default App
