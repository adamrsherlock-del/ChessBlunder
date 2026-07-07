import { Chess } from "chess.js"
import { getControlMap } from "./chesshelpers"
import type { Attack } from "./chesshelpers"

export type Threat = {
    square: string
    colour: "w" | "b"
    piece: string

    attacked: boolean
    defended: boolean
    hanging: boolean

    attackers: Attack[]
    defenders: Attack[]
}

export function getThreatMap(chess: Chess): Threat[] {

    const threats: Threat[] = []

    const board = chess.board()

    // Get every square controlled by both sides
    const whiteControl = getControlMap(chess, "w")
    const blackControl = getControlMap(chess, "b")

    for (let row = 0; row < 8; row++) {

        for (let col = 0; col < 8; col++) {

            // ----------------------------------------------------
            // Get the piece on this board square.
            // If there isn't one, move on to the next square.
            // ----------------------------------------------------
            const piece = board[row][col]

            if (!piece) continue

            // ----------------------------------------------------
            // Convert the board coordinates into chess notation.
            //
            // Examples:
            //
            // row 0, col 0  = a8
            // row 0, col 4  = e8
            // row 7, col 4  = e1
            // ----------------------------------------------------
            const file = "abcdefgh"[col]
            const rank = (8 - row).toString()
            const square = file + rank

            // ----------------------------------------------------
            // Save this piece ready for threat analysis.
            // We'll fill in attacked/defended later.
            // ----------------------------------------------------
            // -----------------------------------------
            // Find every piece attacking this square.
            // -----------------------------------------
            const enemyAttacks =
                piece.color === "w"
                    ? blackControl[square] ?? []
                    : whiteControl[square] ?? []

            const friendlyAttacks =
                piece.color === "w"
                    ? whiteControl[square] ?? []
                    : blackControl[square] ?? []

            // Is this piece under attack?
            const attacked = enemyAttacks.length > 0

            // Is this piece defended?
            const defended = friendlyAttacks.length > 0

            // A piece is hanging if it is attacked
            // but has no defenders.
            const hanging = attacked && !defended

            // Save the analysis
            threats.push({

                square,

                colour: piece.color,

                piece: piece.type,

                attacked,

                defended,

                hanging,

                attackers: enemyAttacks,

                defenders: friendlyAttacks,

            })

        }

    }

    return threats
}