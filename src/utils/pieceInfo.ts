export function getPieceName(piece: string): string {
    switch (piece) {
        case "p":
            return "Pawn"
        case "n":
            return "Knight"
        case "b":
            return "Bishop"
        case "r":
            return "Rook"
        case "q":
            return "Queen"
        case "k":
            return "King"
        default:
            return piece
    }
}

export function getPieceIcon(piece: string): string {
    switch (piece) {
        case "p":
            return "♟"
        case "n":
            return "♞"
        case "b":
            return "♝"
        case "r":
            return "♜"
        case "q":
            return "♛"
        case "k":
            return "♚"
        default:
            return ""
    }
}