import type { CSSProperties } from "react"
import type { ControlMap } from "./chesshelpers"
// ---------------------------------------------------------
// Creates the blue highlights shown on the chessboard
// based on which filters are currently enabled.
// ---------------------------------------------------------
export function getSquareStyles(
    controlMap: ControlMap,
    showPawns: boolean,
    showKnights: boolean,
    showBishops: boolean,
    showRooks: boolean,
    showQueens: boolean,
    showKings: boolean,
    showWhite: boolean,
    showBlack: boolean
) {

    const squareStyles: { [square: string]: CSSProperties } = {}
    for (const square of Object.keys(controlMap)) {

        const attacks = controlMap[square]

        const shouldShow = attacks.some((attack) => {

            // Hide white/black attacks if disabled
            if (attack.colour === "w" && !showWhite) return false
            if (attack.colour === "b" && !showBlack) return false

            // Only show enabled piece types
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
            backgroundColor: "rgba(0,100,255,0.35)",
        }
    }

    return squareStyles
}