// ---------------------------------------------------------
// Properties that App.tsx passes into this component
// ---------------------------------------------------------
type Props = {
    showPawns: boolean
    setShowPawns: React.Dispatch<React.SetStateAction<boolean>>

    showKnights: boolean
    setShowKnights: React.Dispatch<React.SetStateAction<boolean>>

    showBishops: boolean
    setShowBishops: React.Dispatch<React.SetStateAction<boolean>>

    showRooks: boolean
    setShowRooks: React.Dispatch<React.SetStateAction<boolean>>

    showQueens: boolean
    setShowQueens: React.Dispatch<React.SetStateAction<boolean>>

    showKings: boolean
    setShowKings: React.Dispatch<React.SetStateAction<boolean>>

    showWhite: boolean
    setShowWhite: React.Dispatch<React.SetStateAction<boolean>>

    showBlack: boolean
    setShowBlack: React.Dispatch<React.SetStateAction<boolean>>

    flipBoard: boolean
    setFlipBoard: React.Dispatch<React.SetStateAction<boolean>>
}

// ---------------------------------------------------------
// Checkbox panel
// ---------------------------------------------------------
export default function ControlFilters({
    showPawns,
    setShowPawns,
    showKnights,
    setShowKnights,
    showBishops,
    setShowBishops,
    showRooks,
    setShowRooks,
    showQueens,
    setShowQueens,
    showKings,
    setShowKings,
    showWhite,
    setShowWhite,
    showBlack,
    setShowBlack,
    flipBoard,
    setFlipBoard,
}: Props) {
    return (
        <>
            <label>
                <input
                    type="checkbox"
                    checked={showPawns}
                    onChange={(e) => setShowPawns(e.target.checked)}
                />
                Pawns
            </label>

            <label style={{ marginLeft: "20px" }}>
                <input
                    type="checkbox"
                    checked={showKnights}
                    onChange={(e) => setShowKnights(e.target.checked)}
                />
                Knights
            </label>

            <label style={{ marginLeft: "20px" }}>
                <input
                    type="checkbox"
                    checked={showBishops}
                    onChange={(e) => setShowBishops(e.target.checked)}
                />
                Bishops
            </label>

            <label style={{ marginLeft: "20px" }}>
                <input
                    type="checkbox"
                    checked={showRooks}
                    onChange={(e) => setShowRooks(e.target.checked)}
                />
                Rooks
            </label>

            <label style={{ marginLeft: "20px" }}>
                <input
                    type="checkbox"
                    checked={showQueens}
                    onChange={(e) => setShowQueens(e.target.checked)}
                />
                Queens
            </label>

            <label style={{ marginLeft: "20px" }}>
                <input
                    type="checkbox"
                    checked={showKings}
                    onChange={(e) => setShowKings(e.target.checked)}
                />
                Kings
            </label>

            <label style={{ marginLeft: "20px" }}>
                <input
                    type="checkbox"
                    checked={showWhite}
                    onChange={(e) => setShowWhite(e.target.checked)}
                />
                White
            </label>

            <label style={{ marginLeft: "20px" }}>
                <input
                    type="checkbox"
                    checked={showBlack}
                    onChange={(e) => setShowBlack(e.target.checked)}
                />
                Black
            </label>

            <label style={{ marginLeft: "20px" }}>
                <input
                    type="checkbox"
                    checked={flipBoard}
                    onChange={(e) => setFlipBoard(e.target.checked)}
                />
                Flip Board
            </label>
        </>
    )
}