import { Chess } from "chess.js"
import { getControlMap } from "./chesshelpers"
import type { ControlMap } from "./chesshelpers"

// ---------------------------------------------------------
// Replay the game to a chosen move.
//
// Instead of changing the existing Chess object,
// we create a fresh one and replay the moves.
// This guarantees the board is always correct.
// ---------------------------------------------------------
export function goToMove(

    // Which move should we replay to?
    moveNumber: number,

    // Complete list of moves from the PGN
    moveList: string[]

) {

    const replayChess = new Chess()

    // Replay each move up to moveNumber
    for (let i = 0; i < moveNumber; i++) {
        replayChess.move(moveList[i])
    }

    // Calculate all controlled squares
    const whiteControl = getControlMap(replayChess, "w")
    const blackControl = getControlMap(replayChess, "b")

    const controlMap: ControlMap = {
        ...whiteControl,
        ...blackControl,
    }

    // Work out the last move played
    const lastMove =
        moveNumber > 0
            ? replayChess.history({ verbose: true })[moveNumber - 1]
            : null

    // Return everything the UI needs
    return {
        chess: replayChess,
        position: replayChess.fen(),
        controlMap,
        lastMove,
    }

}