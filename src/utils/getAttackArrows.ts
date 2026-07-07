import type { Threat } from "./getThreatMap"

export function getAttackArrows(
    threats: Threat[]
): [string, string][] {

    const arrows: [string, string][] = []

    for (const threat of threats) {

        for (const attacker of threat.attackers) {

            arrows.push([
                attacker.from,
                threat.square,
            ])

        }

    }

    return arrows

}