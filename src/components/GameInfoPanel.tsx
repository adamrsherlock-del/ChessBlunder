type Props = {
    movesLoaded: number
    currentMove: number
}

export default function GameInfoPanel({
    movesLoaded,
    currentMove,
}: Props) {
    return (
        <div>

            <h3 className="text-lg font-semibold mb-3">
                Game
            </h3>

            <div className="space-y-2 text-sm">

                <p>
                    <strong>PGN:</strong>{" "}
                    {movesLoaded > 0 ? "✅ Loaded" : "Not Loaded"}
                </p>

                <p>
                    <strong>Move:</strong> {currentMove} / {movesLoaded}
                </p>

            </div>

        </div>
    )
}   