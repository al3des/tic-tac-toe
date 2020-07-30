import { useReducer } from "react"

function useBoard() {
  let [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "MAKE_MOVE":
          
          return {
            ...state, 
            board: state.board.map((square, index) => {
              if (index === action.i && !square) {
                return state.isXNext ? "X" : "O"
              }
              return square
            })
            ,history: state.history.concat(Array(1).fill(action.board)), 
            isXNext: !state.isXNext, 
            moves: state.moves +1
        }
        case "GO_BACK":
          if (state.moves < 1) {
            return state
          }
          return {
            ...state,  
            board:  state.history[state.moves -1],
            isXNext: !state.isXNext,
            moves: state.moves -1,
            history: state.history.slice(0, state.moves)
          }
          
          default:
          return state
      }
    },
    {board: Array(9).fill(null), history: [], isXNext: true, moves: 0}
  )
  return [state, dispatch]
}

export default useBoard
