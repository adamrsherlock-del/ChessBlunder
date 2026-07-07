import { Chessboard } from "react-chessboard"

type Props = {
    position: string
    flipBoard: boolean
    squareStyles: { [square: string]: React.CSSProperties }
    arrows: [string, string][]
}

export default function ChessBoardPanel({
    position,
    flipBoard,
    squareStyles,
    arrows,
}: Props) {
    return (
        <Chessboard
            key={position}
            position={position}
            boardOrientation={flipBoard ? "black" : "white"}
            customSquareStyles={squareStyles}
        />
    )
}