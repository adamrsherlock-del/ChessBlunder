import type { Threat } from "../utils/getThreatMap"

type Props = {
    threats: Threat[]

    showWhiteThreats: boolean
    showBlackThreats: boolean

    showHanging: boolean
    showAttacked: boolean
    showDefended: boolean
}

export default function ThreatsPage({

    threats,

    showWhiteThreats,
    showBlackThreats,

    showHanging,
    showAttacked,
    showDefended,

}: Props) {

    const filteredThreats = threats.filter((threat) => {

        if (threat.colour === "w" && !showWhiteThreats) return false

        if (threat.colour === "b" && !showBlackThreats) return false

        if (threat.hanging) return showHanging

        if (threat.attacked && threat.defended) return showAttacked

        if (threat.defended && !threat.attacked) return showDefended

        return false

    })


    const hanging = filteredThreats.filter(
        (t) => t.hanging
    )

    const underPressure = filteredThreats.filter(
        (t) => t.attacked && t.defended
    )

    const safe = filteredThreats.filter(
        (t) => t.defended && !t.attacked
    )

    return (

        <div className="w-full">

            <h2 className="text-2xl font-bold mb-4">
                ⚠ Threat Analysis
            </h2>

            <div className="rounded-lg bg-slate-800 p-6">

                <div className="space-y-4">

                    <div className="rounded bg-red-900 p-4">
                        🔴 Hanging: {hanging.length}
                    </div>

                    <div className="rounded bg-yellow-700 p-4">
                        🟠 Under Pressure: {underPressure.length}
                    </div>

                    <div className="rounded bg-green-800 p-4">
                        🟢 Safe: {safe.length}
                    </div>

                </div>



            </div>

        </div>

    )

}