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

const bishopDirections = [
  [-1, -1],
  [-1, 1],
  [1, -1],
  [1, 1],
]

const rookDirections = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
]

function addPawnAttacks(
  control: ControlMap,
  row: number,
  col: number,
  fromSquare: string,
  colour: "w" | "b"
) {
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
}

function addKnightAttacks(
  control: ControlMap,
  row: number,
  col: number,
  fromSquare: string,
  colour: "w" | "b"
) {
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
}

function addSlidingAttacks(
  game: Chess,
  control: ControlMap,
  row: number,
  col: number,
  fromSquare: string,
  piece: string,
  colour: "w" | "b",
  directions: number[][]
) {
}


function addBishopAttacks(
  game: Chess,
  control: ControlMap,
  row: number,
  col: number,
  fromSquare: string,
  colour: "w" | "b"
) {
  for (const [rowStep, colStep] of bishopDirections) {

    let currentRow = row + rowStep
    let currentCol = col + colStep

    while (
      currentRow >= 0 &&
      currentRow < 8 &&
      currentCol >= 0 &&
      currentCol < 8
    ) {

      const file = String.fromCharCode(97 + currentCol)
const rank = 8 - currentRow
const target = `${file}${rank}`

addAttack(control, target, fromSquare, "b", colour)

// Stop sliding if we hit a piece
if (game.board()[currentRow][currentCol]) {
  break
}

currentRow += rowStep
currentCol += colStep
    }
  }
}


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
          addPawnAttacks(control, row, col, fromSquare, colour)
          break
        }

        case "n": {
  addKnightAttacks(control, row, col, fromSquare, colour)
  break
}


        case "b": {
  addBishopAttacks(game, control, row, col, fromSquare, colour)
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