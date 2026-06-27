import { useState } from "react"
import { Chessboard } from "react-chessboard"
import { Chess } from "chess.js"

function App() {
  const [pgn, setPgn] = useState("")
  const [chess] = useState(new Chess())
  const [position, setPosition] = useState(chess.fen())
  const [moves, setMoves] = useState<string[]>([])
  const [currentMove, setCurrentMove] = useState(0)

  function goToMove(moveNumber: number) {
    const replayChess = new Chess()

    for (let i = 0; i < moveNumber; i++) {
      replayChess.move(moves[i])
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

          newChess.loadPgn(pgn)

          setPosition(newChess.fen())
          setMoves(newChess.history())
          setCurrentMove(0)
        }}
      >
        Load Game
      </button>

      <p>{position}</p>
      <p>Moves loaded: {moves.length}</p>
      <p>Current move: {currentMove}</p>

      <button
        onClick={() => {
          if (currentMove < moves.length) {
            const nextMove = currentMove + 1
            setCurrentMove(nextMove)
            goToMove(nextMove)
          }
        }}
      >
        Next ▶
      </button>

      <Chessboard
        key={position}
        position={position}
      />
    </div>
  )
}

export default App