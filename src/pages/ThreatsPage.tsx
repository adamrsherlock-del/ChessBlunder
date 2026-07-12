import type { Threat } from "../utils/getThreatMap"

type Props = {
    threats: Threat[]
    selectedThreat: Threat | null
    showWhiteThreats: boolean
    showBlackThreats: boolean

    showHanging: boolean
    showAttacked: boolean
    showDefended: boolean
}

function getPieceName(piece: string) {
    switch (piece) {
        case "p": return "Pawn"
        case "n": return "Knight"
        case "b": return "Bishop"
        case "r": return "Rook"
        case "q": return "Queen"
        case "k": return "King"
        default: return piece
    }
}

function getColourName(colour: "w" | "b") {
    return colour === "w" ? "White" : "Black"
}

function getPieceIcon(piece: string, colour: "w" | "b") {

    const white = {
        p: "♙",
        n: "♘",
        b: "♗",
        r: "♖",
        q: "♕",
        k: "♔",
    }

    const black = {
        p: "♟",
        n: "♞",
        b: "♝",
        r: "♜",
        q: "♛",
        k: "♚",
    }

    return colour === "w"
        ? white[piece as keyof typeof white]
        : black[piece as keyof typeof black]

}

function getThreatStatus(threat: Threat) {

    if (threat.hanging) {
        return "🔴 Hanging"
    }

    if (threat.attacked && threat.defended) {
        return "🟠 Under Pressure"
    }

    return "🟢 Safe"

}

export default function ThreatsPage({
    threats,
    selectedThreat,
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

                <div className="grid grid-cols-3 gap-3 mb-6">

                    <div className="rounded-lg bg-red-900 p-4 text-center">

                        <div className="text-3xl font-bold">
                            {hanging.length}
                        </div>

                        <div className="text-sm">
                            🔴 Hanging
                        </div>

                    </div>

                    <div className="rounded-lg bg-amber-700 p-4 text-center">

                        <div className="text-3xl font-bold">
                            {underPressure.length}
                        </div>

                        <div className="text-sm">
                            🟠 Under Pressure
                        </div>

                    </div>

                    <div className="rounded-lg bg-emerald-700 p-4 text-center">

                        <div className="text-3xl font-bold">
                            {safe.length}
                        </div>

                        <div className="text-sm">
                            🟢 Safe
                        </div>

                    </div>

                </div>

                <div className="rounded-lg bg-slate-800 p-6 mt-6">

                    <h3 className="text-xl font-bold mb-4">
                        Threat Inspector
                    </h3>

                    {selectedThreat ? (

                        <>
                            <p><strong>Square:</strong> {selectedThreat.square}</p>

                            <h4 className="text-2xl font-bold mb-4">

                                {getPieceIcon(selectedThreat.piece, selectedThreat.colour)}
                                {" "}
                                {getColourName(selectedThreat.colour)}
                                {" "}
                                {getPieceName(selectedThreat.piece)}

                            </h4>

                            <p className="text-lg mt-4">

                                <strong>Status:</strong>

                                {" "}

                                {getThreatStatus(selectedThreat)}

                            </p>

                            <h4 className="text-lg font-bold mt-6">
                                Attackers
                            </h4>

                            {selectedThreat.attackers.length === 0 ? (

                                <p className="text-slate-400">
                                    None
                                </p>

                            ) : (

                                selectedThreat.attackers.map((attacker) => (

                                    <p key={attacker.from}>
                                        {attacker.piece.toUpperCase()} from {attacker.from}
                                    </p>

                                ))

                            )}

                            <h4 className="text-lg font-bold mt-6">
                                Defenders
                            </h4>

                            {selectedThreat.defenders.length === 0 ? (

                                <p className="text-slate-400">
                                    None
                                </p>

                            ) : (

                                selectedThreat.defenders.map((defender) => (

                                    <p key={defender.from}>
                                        {defender.piece.toUpperCase()} from {defender.from}
                                    </p>

                                ))

                            )}
                        </>

                    ) : (

                        <p className="text-slate-400">
                            Click a piece on the board.
                        </p>

                    )}

                </div>



            </div>

        </div>

    )

}