import React, { useContext } from "react"
import BoardContext from "../BoardContext"
import useHistory from "../useHistory"

import Square from "./Square"

export default function Board() {
  let { board, setBoard, isXNext, setIsXNext, moves, setMoves } = useContext(
    BoardContext
  )
  let [history, dispatchHistory] = useHistory()
  function makeMove(i) {
    setBoard(
      board.map((square, index) => {
        if (index === i && !square) {
          return isXNext ? "X" : "O"
        }
        return square
      })
    )
    dispatchHistory({ type: "SAVE_HISTORY", board })
    console.log("history", history)
    setIsXNext(!isXNext)
    setMoves(moves + 1)
  }
  function goTo(step) {
    if (step > moves || step < 0) {
      return
    }
    setBoard(history[step + 1])
    dispatchHistory({ type: "RESET_TO_MOVE", moves })
    setIsXNext(!isXNext)
    setMoves(step)
  }
  function renderSquares(board) {
    return board.map((square, index) => (
      <div
        onClick={() => !square && makeMove(index)}
        key={index}
        style={{
          border: "1px solid black",
          width: "50px",
          height: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Square value={square} />
      </div>
    ))
  }
  return (
    <div>
      <h1>Board</h1>
      <h2>Next Move: {isXNext ? "X" : "O"}</h2>
      <div style={{ display: "flex", flexWrap: "wrap", width: "200px" }}>
        {renderSquares(board)}
        <div>
          <button onClick={() => goTo(moves - 1)}>go back</button>
        </div>
      </div>
    </div>
  )
}
