import type { Threat } from "./getThreatMap"

export function getThreatSquareStyles(
    threats: Threat[],
    showWhite: boolean,
    showBlack: boolean,
    showHanging: boolean,
    showAttacked: boolean,
    showDefended: boolean
) {

    const styles: {
        [square: string]: React.CSSProperties
    } = {}

    for (const threat of threats) {

        // Filter by piece colour


        if (threat.colour === "w" && !showWhite) continue

        if (threat.colour === "b" && !showBlack) continue

        if (threat.hanging && showHanging) {

            styles[threat.square] = {
                boxShadow: "inset 0 0 0 4px #ef4444"
            }

        }

        else if (
            threat.attacked &&
            threat.defended &&
            showAttacked
        ) {

            styles[threat.square] = {
                boxShadow: "inset 0 0 0 4px #f59e0b"
            }

        }

        else if (
            threat.defended &&
            !threat.attacked &&
            showDefended
        ) {

            styles[threat.square] = {
                boxShadow: "inset 0 0 0 4px #22c55e"
            }

        }

    }

    return styles

}