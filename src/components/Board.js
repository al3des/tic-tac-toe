import React, {useState, useEffect} from "react"
import useBoard from "../useBoard"

import Square from "./Square"

export default function Board() {
  let [winner, setWinner] = useState(false)
  let [state, dispatchBoard] = useBoard()
  let { board, isXNext} = state
useEffect(()=>{
  setWinner(checkWinner(board))
}, [board])

  function makeMove(i) {
    if(!winner ){
      dispatchBoard({type: "MAKE_MOVE", i, board})
    }
     return
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
      {!checkWinner(board) ?
      <h2>Next Move: {isXNext ? "X" : "O"}</h2> :
      <h2>Winner: {winner}</h2>
      }
      <div style={{ display: "flex", flexWrap: "wrap", width: "200px" }}>
        {renderSquares(board)}
        <div>
          <button onClick={() => goBack()}>go back</button>
        </div>
      </div>
    </div>
  )
}

function checkWinner(board) {
  let winnerIndexes = [
    [0, 1, 2],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
  ];

  let winner = "";
  winnerIndexes.forEach(winnerComb => {
    if(!winner){
      winnerComb.reduce((acc, curr, i) => {
        if (board[acc] !== board[curr]) {
          winner = false
          return false
        }
        winner = board[curr]
        return curr;
      });
    }
    return winner;
  });
  return winner ? winner : false;
}