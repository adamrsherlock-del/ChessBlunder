import { Chessboard } from "react-chessboard"
import type { Square } from "chess.js"

type Props = {
    position: string
    flipBoard: boolean
    squareStyles: { [square: string]: React.CSSProperties }
    arrows: [Square, Square][]
    onSquareClick: (square: string) => void
}

export default function ChessBoardPanel({
    position,
    flipBoard,
    squareStyles,
    arrows,
    onSquareClick
}: Props) {
    return (
        <Chessboard
            key={position}
            position={position}
            boardOrientation={flipBoard ? "black" : "white"}


            customSquareStyles={squareStyles}
            customArrows={arrows}
            onSquareClick={onSquareClick}


        />
    )
}