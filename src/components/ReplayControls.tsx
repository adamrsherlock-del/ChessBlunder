type Props = {
    currentMove: number
    totalMoves: number
    onStart: () => void
    onPrevious: () => void
    onNext: () => void
    onEnd: () => void
}

export default function ReplayControls({
    currentMove,
    totalMoves,
    onStart,
    onPrevious,
    onNext,
    onEnd,
}: Props) {
    return (
        <div className="flex gap-2">
            <button onClick={onStart}>|◀</button>

            <button onClick={onPrevious}>
                ◀ Previous
            </button>

            <button onClick={onNext}>
                Next ▶
            </button>

            <button onClick={onEnd}>
                ▶|
            </button>
        </div>
    )
}