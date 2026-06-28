import { Chess } from "chess.js"

export type Attack = {
  from: string
  piece: string
  colour: "w" | "b"
}

export type ControlMap = {
  [square: string]: Attack[]
}

export function getControlMap(game: Chess, colour: "w" | "b"): ControlMap {
  const control: ControlMap = {}

  const board = game.board()

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col]

      if (!piece) continue

      if (piece.color !== colour) continue

      if (piece.type !== "p") continue

      const fromFile = String.fromCharCode(97 + col)
const fromRank = 8 - row
const fromSquare = `${fromFile}${fromRank}`

      const attackRow = row - 1
const attackCol = col - 1

if (attackRow >= 0 && attackCol >= 0) {
  const file = String.fromCharCode(97 + attackCol)
  const rank = 8 - attackRow

  const target = `${file}${rank}`

if (!control[target]) {
  control[target] = []
}

control[target].push({
  from: fromSquare,
  piece: "p",
  colour,
})
}

const rightAttackCol = col + 1

if (attackRow >= 0 && rightAttackCol < 8) {
  const file = String.fromCharCode(97 + rightAttackCol)
  const rank = 8 - attackRow

  const target = `${file}${rank}`

if (!control[target]) {
  control[target] = []
}

control[target].push({
  from: fromSquare,
  piece: "p",
  colour,
})
}

    }
  }

  return control
}

// Temporary compatibility function
export function getControlledSquares(game: Chess, colour: "w" | "b") {
  return []
}