import { useState } from "react"
import { Chess } from "chess.js"
import Header from "./components/Header.tsx"
import ChessBoardPanel from "./components/ChessBoardPanel"
import GameInfoPanel from "./components/GameInfoPanel"
// Displays the filter checkboxes
import ControlFilters from "./components/ControlFilters"
import PGNLoader from "./components/PGNLoader"
// Buttons used to replay the game
import ReplayControls from "./components/ReplayControls"
import Sidebar from "./components/Sidebar"
// Utility that decides which board squares should be highlighted
import { getSquareStyles } from "./utils/getSquareStyles"
// ---------------------------------------------------------
// Creates the blue highlights shown on the chessboard
// based on which filters are currently enabled.
// ---------------------------------------------------------
// Replay a game to any move and calculate the board state
import { goToMove } from "./utils/goToMove"

import type { ControlMap } from "./utils/chesshelpers"
import ThreatsPage from "./pages/ThreatsPage"

function App() {
    const [pgn, setPgn] = useState("")
    const [chess] = useState(new Chess())
    const [position, setPosition] = useState(chess.fen())
    const [moves, setMoves] = useState<string[]>([])
    const [currentMove, setCurrentMove] = useState(0)
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
    // Which page is currently being shown?
    const [page, setPage] = useState<"vision" | "threats">("vision")

    // ---------------------------------------------------------
    // Move the replay board to any point in the game.
    //
    // The utility calculates the position and control map.
    // This helper simply updates React state with the result.
    // ---------------------------------------------------------
    function updateBoard(moveNumber: number, moveList: string[]) {

        const result = goToMove(moveNumber, moveList)

        setPosition(result.position)
        setControlMap(result.controlMap)
    }

    // ---------------------------------------------------------
    // Load a PGN entered by the user.
    //
    // 1. Read the PGN
    // 2. Save every move
    // 3. Reset replay to move 0
    // 4. Update the board
    // ---------------------------------------------------------
    function loadGame() {

        const newChess = new Chess()

        // Read the PGN into a chess game
        newChess.loadPgn(pgn)

        // Get every move from the game
        const gameMoves = newChess.history()

        // Save the moves
        setMoves(gameMoves)

        // Start replay from the beginning
        setCurrentMove(0)

        // Show the starting position
        updateBoard(0, gameMoves)
    }


    // ---------------------------------------------------------
    // Jump to the first move
    // ---------------------------------------------------------
    function firstMove() {

        setCurrentMove(0)

        updateBoard(0, moves)

    }

    // ---------------------------------------------------------
    // Go back one move
    // ---------------------------------------------------------
    function previousMove() {

        if (currentMove > 0) {

            const move = currentMove - 1

            setCurrentMove(move)

            updateBoard(move, moves)

        }
    }

    // ---------------------------------------------------------
    // Go forward one move
    // ---------------------------------------------------------
    function nextMove() {

        console.log("Next clicked")

        if (currentMove < moves.length) {

            const move = currentMove + 1

            setCurrentMove(move)

            updateBoard(move, moves)

        }
    }

    // ---------------------------------------------------------
    // Jump to the final move
    // ---------------------------------------------------------
    function lastMove() {

        setCurrentMove(moves.length)

        updateBoard(moves.length, moves)

    }
    // ---------------------------------------------------------
    // Decide which board squares should be highlighted
    // ---------------------------------------------------------
    const squareStyles = getSquareStyles(
        controlMap,
        showPawns,
        showKnights,
        showBishops,
        showRooks,
        showQueens,
        showKings,
        showWhite,
        showBlack
    )
    return (
        <div className="min-h-screen bg-slate-900 text-white">
            <Header />

            <div className="flex">

                <Sidebar
                    page={page}
                    setPage={setPage}
                />

                {/* Main content */}
                <div className="flex flex-1 p-8 gap-8">

                    {page === "vision" && (

                        <>

                            {/* Main chess board */}
                            <div className="flex-1 flex justify-center">

                                <div style={{ width: "520px" }}>
                                    <ChessBoardPanel
                                        position={position}
                                        flipBoard={flipBoard}
                                        squareStyles={squareStyles}
                                    />
                                </div>

                            </div>

                            {/* Right-hand control panel */}
                            <div className="w-96 bg-slate-800 rounded-xl p-6 shadow-xl flex flex-col gap-6">

                                <PGNLoader
                                    pgn={pgn}
                                    setPgn={setPgn}
                                    onLoadGame={loadGame}
                                />

                                <GameInfoPanel
                                    movesLoaded={moves.length}
                                    currentMove={currentMove}
                                    controlledSquares={Object.keys(controlMap).length}
                                />

                                <div style={{ marginBottom: "10px" }}>
                                    <ControlFilters
                                        showPawns={showPawns}
                                        setShowPawns={setShowPawns}
                                        showKnights={showKnights}
                                        setShowKnights={setShowKnights}
                                        showBishops={showBishops}
                                        setShowBishops={setShowBishops}
                                        showRooks={showRooks}
                                        setShowRooks={setShowRooks}
                                        showQueens={showQueens}
                                        setShowQueens={setShowQueens}
                                        showKings={showKings}
                                        setShowKings={setShowKings}
                                        showWhite={showWhite}
                                        setShowWhite={setShowWhite}
                                        showBlack={showBlack}
                                        setShowBlack={setShowBlack}
                                        flipBoard={flipBoard}
                                        setFlipBoard={setFlipBoard}
                                    />
                                </div>

                                <ReplayControls
                                    currentMove={currentMove}
                                    totalMoves={moves.length}
                                    onFirst={firstMove}
                                    onPrevious={previousMove}
                                    onNext={nextMove}
                                    onLast={lastMove}
                                />

                            </div>

                        </>

                    )}

                    {page === "threats" && (

                        <ThreatsPage />

                    )}

                </div>
            </div>
        </div>





    )
}

export default App;