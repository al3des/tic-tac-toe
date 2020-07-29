import React, { useState } from "react"
import BoardContext from "./BoardContext"
import Game from "./components/Game"

function App() {
  let [board, setBoard] = useState(Array(9).fill(null))
  let [moves, setMoves] = useState(0)
  let [isXNext, setIsXNext] = useState(true)

  return (
    <div className="App">
      <BoardContext.Provider
        value={{ board, setBoard, isXNext, setIsXNext, moves, setMoves }}
      >
        <Game />
      </BoardContext.Provider>
    </div>
  )
}

export default App
