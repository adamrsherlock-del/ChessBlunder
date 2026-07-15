import { useState } from "react"

type Props = {
    pgn: string
    setPgn: (pgn: string) => void
    onLoadGame: () => void
    onLoadDemoGame: () => void
}

export default function PGNLoader({
    pgn,
    setPgn,
    onLoadGame,
    onLoadDemoGame,
}: Props) {
    const [showHelp, setShowHelp] = useState(false)
    return (
        <div className="rounded-lg bg-slate-800 p-4">

            <h3 className="text-lg font-semibold mb-3">
                Load Game
            </h3>

            <textarea
                value={pgn}
                onChange={(e) => setPgn(e.target.value)}
                placeholder="Paste your Chess.com PGN here"
                className="w-full h-40 rounded bg-slate-900 p-2 text-sm"
            />

            <button
                onClick={onLoadGame}
                className="mt-3 w-full rounded bg-blue-600 py-2 font-semibold hover:bg-blue-500"
            >
                Load PGN
            </button>

            <button
                onClick={onLoadDemoGame}
                className="mt-3 w-full rounded bg-purple-600 py-2 font-semibold hover:bg-purple-500"
            >
                🎯 Load Demo Game
            </button>
            <button
                onClick={() => setShowHelp(!showHelp)}
                className="mt-4 text-sm text-blue-400 hover:text-blue-300"
            >
                {showHelp
                    ? "Hide PGN Help ▲"
                    : "Need help getting a PGN? ▼"}
            </button>

            {showHelp && (
                <div className="mt-3 rounded bg-slate-900 p-3 text-sm text-slate-300">

                    <p className="font-semibold mb-2">
                        Chess.com
                    </p>

                    <ol className="list-decimal ml-5 mb-4 space-y-1">
                        <li>Open your completed game.</li>
                        <li>Click <strong>Share</strong>.</li>
                        <li>Choose <strong>Copy PGN</strong> or <strong>Download PGN</strong>.</li>
                        <li>Paste it into ChessBlunder.</li>
                    </ol>

                    <p className="font-semibold mb-2">
                        Lichess
                    </p>

                    <ol className="list-decimal ml-5 space-y-1">
                        <li>Open your game.</li>
                        <li>Click <strong>PGN</strong>.</li>
                        <li>Copy the PGN.</li>
                        <li>Paste it into ChessBlunder.</li>
                    </ol>

                </div>
            )}

        </div>
    )
}