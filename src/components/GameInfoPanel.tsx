type Props = {
    movesLoaded: number
    currentMove: number
    controlledSquares: number
}

export default function GameInfoPanel({
    movesLoaded,
    currentMove,
    controlledSquares,
}: Props) {
    return (
        <div>

            <h3 className="text-lg font-semibold mb-3">
                Information
            </h3>

            <div className="space-y-2 text-sm">

                <p>
                    <strong>Moves loaded:</strong> {movesLoaded}
                </p>

                <p>
                    <strong>Current move:</strong> {currentMove}
                </p>

                <p>
                    <strong>Controlled squares:</strong> {controlledSquares}
                </p>

            </div>

        </div>
    )
}