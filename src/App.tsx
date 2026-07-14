import { useState } from "react"
import { Chess } from "chess.js"
import Header from "./components/Header.tsx"
import ChessBoardPanel from "./components/ChessBoardPanel"
import GameInfoPanel from "./components/GameInfoPanel"
import ControlFilters from "./components/ControlFilters"
import PGNLoader from "./components/PGNLoader"
import ReplayControls from "./components/ReplayControls"
import Sidebar from "./components/Sidebar"
import { getSquareStyles } from "./utils/getSquareStyles"
import { goToMove } from "./utils/goToMove"
import type { ControlMap } from "./utils/chesshelpers"
import ThreatsPage from "./pages/ThreatsPage"
import { getThreatMap } from "./utils/getThreatMap"
import ReplayPanel from "./components/ReplayPanel"
import { getThreatSquareStyles } from "./utils/getThreatSquareStyles"
import ThreatFilters from "./components/ThreatFilters"
import { getAttackArrows } from "./utils/getAttackArrows"
import { getDefenceArrows } from "./utils/getDefenceArrows"
import { demoGame } from "./data/demoGame"



function App() {
    const [pgn, setPgn] = useState("")
    const [chess] = useState(new Chess())
    const [currentChess, setCurrentChess] = useState(new Chess())
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
    const [showWhiteThreats, setShowWhiteThreats] = useState(true)
    const [showBlackThreats, setShowBlackThreats] = useState(true)
    const [showHanging, setShowHanging] = useState(true)
    const [showAttacked, setShowAttacked] = useState(true)
    const [showDefended, setShowDefended] = useState(true)
    const [showAttackArrows, setShowAttackArrows] = useState(false)
    const [showDefenceArrows, setShowDefenceArrows] = useState(false)
    const [showBlack, setShowBlack] = useState(true)
    const [flipBoard, setFlipBoard] = useState(false)
    const [page, setPage] = useState<"vision" | "threats">("threats")
    const [selectedThreat, setSelectedThreat] = useState<string | null>(null)


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
        setCurrentChess(result.chess)
    }

    // ---------------------------------------------------------
    // Load a PGN entered by the user.
    //
    // 1. Read the PGN
    // 2. Save every move
    // 3. Reset replay to move 0
    // 4. Update the board
    // ---------------------------------------------------------
    function loadGameFromPgn(gamePgn: string) {

        const chess = new Chess()

        // Read the PGN into a chess game
        chess.loadPgn(gamePgn)

        // Get every move from the game
        const gameMoves = chess.history()

        // Save the moves
        setMoves(gameMoves)

        // Start replay from the beginning
        setCurrentMove(0)

        // Show the starting position
        updateBoard(0, gameMoves)
    }

    function loadGame() {
        loadGameFromPgn(pgn)
    }

    function loadDemoGame() {
        loadGameFromPgn(demoGame)
        setPgn(demoGame)
        setPage("threats")
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
    const visionSquareStyles = getSquareStyles(
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



    const threats = getThreatMap(currentChess)

    const selectedThreatData =
        threats.find(threat => threat.square === selectedThreat) ?? null
    console.log("Selected threat:", selectedThreatData)

    const defenceArrows = showDefenceArrows
        ? getDefenceArrows(selectedThreatData)
        : []

    const threatSquareStyles = getThreatSquareStyles(
        threats,
        showWhiteThreats,
        showBlackThreats,
        showHanging,
        showAttacked,
        showDefended
    )

    const attackArrows = showAttackArrows
        ? getAttackArrows(selectedThreatData)
        : []

    console.log("Attack arrows:", attackArrows)



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

                    {/* Main chess board */}
                    <div className="flex-1 flex justify-center">

                        <div className="flex flex-col items-center gap-6">

                            <div style={{ width: "720px" }}>
                                <ChessBoardPanel
                                    position={position}
                                    flipBoard={flipBoard}
                                    squareStyles={
                                        page === "vision"
                                            ? visionSquareStyles
                                            : threatSquareStyles
                                    }
                                    arrows={[
                                        ...attackArrows,
                                        ...defenceArrows,
                                    ]}
                                    onSquareClick={(square) => {
                                        setSelectedThreat(square)
                                    }}
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

                    </div>






                    {/* Right-hand control panel */}

                    <ReplayPanel>

                        {page === "threats" && (
                            <>
                                <ThreatsPage
                                    threats={threats}
                                    selectedThreat={selectedThreatData}
                                    showWhiteThreats={showWhiteThreats}
                                    showBlackThreats={showBlackThreats}
                                    showHanging={showHanging}
                                    showAttacked={showAttacked}
                                    showDefended={showDefended}
                                />

                                <hr className="border-slate-700 my-6" />
                            </>
                        )}

                        <PGNLoader
                            pgn={pgn}
                            setPgn={setPgn}
                            onLoadGame={loadGame}
                            onLoadDemoGame={loadDemoGame}
                        />

                        <GameInfoPanel
                            movesLoaded={moves.length}
                            currentMove={currentMove}
                        />

                        <hr className="border-slate-700 my-6" />

                        {page === "vision" && (
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
                        )}

                        {page === "threats" && (
                            <ThreatFilters
                                showWhiteThreats={showWhiteThreats}
                                setShowWhiteThreats={setShowWhiteThreats}
                                showBlackThreats={showBlackThreats}
                                setShowBlackThreats={setShowBlackThreats}
                                showHanging={showHanging}
                                setShowHanging={setShowHanging}
                                showAttacked={showAttacked}
                                setShowAttacked={setShowAttacked}
                                showDefended={showDefended}
                                setShowDefended={setShowDefended}
                                showAttackArrows={showAttackArrows}
                                setShowAttackArrows={setShowAttackArrows}
                                showDefenceArrows={showDefenceArrows}
                                setShowDefenceArrows={setShowDefenceArrows}
                            />
                        )}

                    </ReplayPanel>







                </div>
            </div>
        </div>





    )
}

export default App;