import type { Square } from "chess.js"
import type { Threat } from "./getThreatMap"

export function getDefenceArrows(
    threat: Threat | null
): [Square, Square][] {

    if (!threat) {
        return []
    }

    return threat.defenders.map((defender) => [
        defender.from as Square,
        threat.square as Square,
    ])

}