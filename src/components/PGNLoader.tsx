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

        </div>
    )
}