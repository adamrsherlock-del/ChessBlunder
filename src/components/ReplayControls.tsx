// ===============================
// ReplayControls
//
// These buttons allow the user to
// move backwards and forwards
// through the game.
//
// The component doesn't know HOW
// replay works.
//
// It simply calls functions that
// App.tsx gives it.
// ===============================

type ReplayControlsProps = {

    // Which move are we currently viewing?
    currentMove: number

    // Total number of moves in the game
    totalMoves: number

    // Functions supplied by App.tsx
    onFirst: () => void
    onPrevious: () => void
    onNext: () => void
    onLast: () => void
}

export default function ReplayControls({

    currentMove,
    totalMoves,
    onFirst,
    onPrevious,
    onNext,
    onLast,

}: ReplayControlsProps) {

    return (

        <>
            {/* Show the current replay position */}
            <p className="text-sm text-slate-400">
                Move {currentMove} / {totalMoves}
            </p>

            <div className="flex gap-3 mt-2">

                <button onClick={onFirst}>
                    |◀
                </button>

                <button onClick={onPrevious}>
                    ◀ Previous
                </button>

                <button onClick={onNext}>
                    Next ▶
                </button>

                <button onClick={onLast}>
                    ▶|
                </button>

            </div>

        </>

    )
}