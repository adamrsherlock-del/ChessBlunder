type Props = {
    position: string
    movesLoaded: number
    currentMove: number
    controlledSquares: number
}

export default function GameInfoPanel({
    position,
    movesLoaded,
    currentMove,
    controlledSquares,
}: Props) {
    return (
        <>
            <p>{position}</p>
            <p>Moves loaded: {movesLoaded}</p>
            <p>Current move: {currentMove}</p>
            <p>Controlled squares: {controlledSquares}</p>
        </>
    )
}