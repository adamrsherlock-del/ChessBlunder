import { Chessboard } from "react-chessboard"

type Props = {
    position: string
    flipBoard: boolean
    squareStyles: { [square: string]: React.CSSProperties }
}

export default function ChessBoardPanel({
    position,
    flipBoard,
    squareStyles,
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