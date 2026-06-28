import { useState } from "react"
import { Chessboard } from "react-chessboard"
import { Chess } from "chess.js"
import { getControlMap, getControlledSquares } from "./utils/chesshelpers"
function App() {
  const [pgn, setPgn] = useState("")
  const [chess] = useState(new Chess())
  const [position, setPosition] = useState(chess.fen())
  const [moves, setMoves] = useState<string[]>([])
  const [currentMove, setCurrentMove] = useState(0)
  const [controlledSquares, setControlledSquares] = useState<string[]>([])

  function goToMove(moveNumber: number, moveList: string[]) {
  const replayChess = new Chess()

  for (let i = 0; i < moveNumber; i++) {
    replayChess.move(moveList[i])
  }

  setPosition(replayChess.fen())
}

  return (
    <div style={{ width: "500px" }}>
      <h1>ChessBlunder</h1>

      <textarea
        placeholder="Paste your Chess.com PGN here"
        value={pgn}
        onChange={(event) => setPgn(event.target.value)}
      />

      <button
        onClick={() => {
          const newChess = new Chess()
          console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(newChess)))

          newChess.loadPgn(pgn)

const controlMap = getControlMap(newChess, "w")
console.log(controlMap)

setControlledSquares(getControlledSquares(newChess, "w"))
          
          const gameMoves = newChess.history()

setMoves(gameMoves)
setCurrentMove(0)
goToMove(0, gameMoves)

          
          
        }}
      >
        Load Game
      </button>

      <p>{position}</p>
      <p>Moves loaded: {moves.length}</p>
      <p>Current move: {currentMove}</p>
      <p>Controlled squares: {controlledSquares.length}</p>
      
<button
  onClick={() => {
    setCurrentMove(0)
    goToMove(0, moves)
  }}
>
  |◀
</button>

<button
  onClick={() => {
    if (currentMove > 0) {
      const previousMove = currentMove - 1
      setCurrentMove(previousMove)
      goToMove(previousMove, moves)
    }
  }}
>
  ◀ Previous
</button>
          
      <button
        onClick={() => {
          if (currentMove < moves.length) {
            const nextMove = currentMove + 1
            setCurrentMove(nextMove)
            goToMove(nextMove, moves)
          }
        }}
      >
        Next ▶
      </button>

      <button
  onClick={() => {
    setCurrentMove(moves.length)
    goToMove(moves.length, moves)
  }}
>
  ▶|
</button>

      <Chessboard
        key={position}
        position={position}
      />
    </div>
  )
}

export default App