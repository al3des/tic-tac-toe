import React from "react"
import useBoard from "../useBoard"

import Square from "./Square"

export default function Board() {

  let [state, dispatchBoard] = useBoard()
  let { board, isXNext} = state
console.log(state)
  function makeMove(i) {
    dispatchBoard({type: "MAKE_MOVE", i, board})
  }

  function goBack() {
     dispatchBoard({type: "GO_BACK"})
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
          <button onClick={() => goBack()}>go back</button>
        </div>
      </div>
    </div>
  )
}
