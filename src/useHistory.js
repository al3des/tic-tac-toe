import { useReducer } from "react"

function useHistory() {
  let [history, dispatch] = useReducer(
    (history, action) => {
      switch (action.type) {
        case "SAVE_HISTORY":
          return history.concat(Array(1).fill(action.board))
        case "RESET_TO_MOVE":
          if (action.moves === 1) {
            return history.slice(0, 1)
          }
          return history.slice(0, action.moves)
        default:
          return history
      }
    },
    [Array(9).fill(null)]
  )
  return [history, dispatch]
}

export default useHistory
