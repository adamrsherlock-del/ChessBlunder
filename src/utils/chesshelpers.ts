import { Chess } from "chess.js"

export type Attack = {
  from: string
  piece: string
  colour: "w" | "b"
}

export type ControlMap = {
  [square: string]: Attack[]
}

function addAttack(
  control: ControlMap,
  target: string,
  from: string,
  piece: string,
  colour: "w" | "b"
) {
  if (!control[target]) {
    control[target] = []
  }

  control[target].push({
    from,
    piece,
    colour,
  })
}

const knightOffsets = [
  [-2, -1],
  [-2, 1],
  [-1, -2],
  [-1, 2],
  [1, -2],
  [1, 2],
  [2, -1],
  [2, 1],
]

export function getControlMap(game: Chess, colour: "w" | "b"): ControlMap {
  const control: ControlMap = {}

  const board = game.board()

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col]

      if (!piece) continue
      if (piece.color !== colour) continue

      const fromFile = String.fromCharCode(97 + col)
      const fromRank = 8 - row
      const fromSquare = `${fromFile}${fromRank}`

      switch (piece.type) {
        case "p": {
          const direction = colour === "w" ? -1 : 1
          const attackRow = row + direction

          const leftCol = col - 1
          if (attackRow >= 0 && attackRow < 8 && leftCol >= 0) {
            const file = String.fromCharCode(97 + leftCol)
            const rank = 8 - attackRow
            const target = `${file}${rank}`

            addAttack(control, target, fromSquare, "p", colour)
          }

          const rightCol = col + 1
          if (attackRow >= 0 && attackRow < 8 && rightCol < 8) {
            const file = String.fromCharCode(97 + rightCol)
            const rank = 8 - attackRow
            const target = `${file}${rank}`

            addAttack(control, target, fromSquare, "p", colour)
          }

          break
        }

                case "n": {
                    for (const [rowOffset, colOffset] of knightOffsets) {
  const targetRow = row + rowOffset
  const targetCol = col + colOffset

  if (
    targetRow < 0 ||
    targetRow > 7 ||
    targetCol < 0 ||
    targetCol > 7
  ) {
    continue
  }

  const file = String.fromCharCode(97 + targetCol)
  const rank = 8 - targetRow
  const target = `${file}${rank}`

  addAttack(control, target, fromSquare, "n", colour)
}

break
          
          
        }
      }
    }
  }

  return control
}

// Temporary compatibility function
export function getControlledSquares(game: Chess, colour: "w" | "b") {
  return []
}