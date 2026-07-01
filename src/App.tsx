import { useState } from "react"
import { Chessboard } from "react-chessboard"
import { Chess } from "chess.js"
import {
    getControlMap,
    getControlledSquares,
    type ControlMap,
} from "./utils/chesshelpers"
function App() {
    const [pgn, setPgn] = useState("")
    const [chess] = useState(new Chess())
    const [position, setPosition] = useState(chess.fen())
    const [moves, setMoves] = useState<string[]>([])
    const [currentMove, setCurrentMove] = useState(0)
    const [controlledSquares, setControlledSquares] = useState<string[]>([])
    const [controlMap, setControlMap] = useState<ControlMap>({})
    const [showPawns, setShowPawns] = useState(true)
    const [showKnights, setShowKnights] = useState(true)
    const [showBishops, setShowBishops] = useState(true)
    const [showRooks, setShowRooks] = useState(true)
    const [showQueens, setShowQueens] = useState(true)
    const [showKings, setShowKings] = useState(true)
    const [showWhite, setShowWhite] = useState(true)
    const [showBlack, setShowBlack] = useState(true)
    const [flipBoard, setFlipBoard] = useState(false)

    function goToMove(moveNumber: number, moveList: string[]) {
        const replayChess = new Chess()

        for (let i = 0; i < moveNumber; i++) {
            replayChess.move(moveList[i])
        }

        setPosition(replayChess.fen())

        const whiteControl = getControlMap(replayChess, "w")
        const blackControl = getControlMap(replayChess, "b")

        setControlMap({
            ...whiteControl,
            ...blackControl,
        })
    }

    const squareStyles: { [square: string]: React.CSSProperties } = {}

    for (const square of Object.keys(controlMap)) {
        const attacks = controlMap[square]

        const shouldShow = attacks.some((attack) => {
            if (attack.colour === "w" && !showWhite) return false
            if (attack.colour === "b" && !showBlack) return false

            if (attack.piece === "p" && showPawns) return true
            if (attack.piece === "n" && showKnights) return true
            if (attack.piece === "b" && showBishops) return true
            if (attack.piece === "r" && showRooks) return true
            if (attack.piece === "q" && showQueens) return true
            if (attack.piece === "k" && showKings) return true

            return false
        })

        if (!shouldShow) continue

        squareStyles[square] = {
            backgroundColor: "rgba(0, 100, 255, 0.35)",
        }
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
            <p>Controlled squares: {Object.keys(controlMap).length}</p>

            <div style={{ marginBottom: "10px" }}>
                <label>
                    <input
                        type="checkbox"
                        checked={showPawns}
                        onChange={(e) => setShowPawns(e.target.checked)}
                    />
                    Pawns
                </label>

                <label style={{ marginLeft: "20px" }}>
                    <input
                        type="checkbox"
                        checked={showKnights}
                        onChange={(e) => setShowKnights(e.target.checked)}
                    />
                    Knights
                </label>

                <label style={{ marginLeft: "20px" }}>
                    <input
                        type="checkbox"
                        checked={showBishops}
                        onChange={(e) => setShowBishops(e.target.checked)}
                    />
                    Bishops
                </label>

                <label style={{ marginLeft: "20px" }}>
                    <input
                        type="checkbox"
                        checked={showRooks}
                        onChange={(e) => setShowRooks(e.target.checked)}
                    />
                    Rooks
                </label>

                <label style={{ marginLeft: "20px" }}>
                    <input
                        type="checkbox"
                        checked={showQueens}
                        onChange={(e) => setShowQueens(e.target.checked)}
                    />
                    Queens
                </label>

                <label style={{ marginLeft: "20px" }}>
                    <input
                        type="checkbox"
                        checked={showKings}
                        onChange={(e) => setShowKings(e.target.checked)}
                    />
                    Kings
                </label>

                <label style={{ marginLeft: "20px" }}>
                    <input
                        type="checkbox"
                        checked={showWhite}
                        onChange={(e) => setShowWhite(e.target.checked)}
                    />
                    White
                </label>

                <label style={{ marginLeft: "20px" }}>
                    <input
                        type="checkbox"
                        checked={showBlack}
                        onChange={(e) => setShowBlack(e.target.checked)}
                    />
                    Black
                </label>

                <label style={{ marginLeft: "20px" }}>
                    <input
                        type="checkbox"
                        checked={flipBoard}
                        onChange={(e) => setFlipBoard(e.target.checked)}
                    />
                    Flip Board
                </label>

            </div>

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
                boardOrientation={flipBoard ? "black" : "white"}
                customSquareStyles={squareStyles}
            />

        </div>
    )
}

export default App