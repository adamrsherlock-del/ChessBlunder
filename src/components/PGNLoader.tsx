type Props = {
    pgn: string
    setPgn: (value: string) => void
    onLoadGame: () => void
}

export default function PGNLoader({
    pgn,
    setPgn,
    onLoadGame,
}: Props) {
    return (
        <>
            <textarea
                placeholder="Paste your Chess.com PGN here"
                value={pgn}
                onChange={(event) => setPgn(event.target.value)}
            />

            <button onClick={onLoadGame}>
                Load Game
            </button>
        </>
    )
}