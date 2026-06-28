import { Chess } from "chess.js"

export type Attack = {
  from: string
  piece: string
}

export type ControlMap = {
  [square: string]: Attack[]
}

export function getControlMap(game: Chess, colour: "w" | "b"): ControlMap {
  const control: ControlMap = {}

  const files = ["a", "b", "c", "d", "e", "f", "g", "h"]

  for (let rank = 1; rank <= 8; rank++) {
    for (const file of files) {
      const square = `${file}${rank}`

      const attackers = game.attackers(square as any, colour)

      if (attackers.length === 0) continue

      control[square] = []

      for (const attacker of attackers) {
        const piece = game.get(attacker)

        if (!piece) continue

        control[square].push({
          from: attacker,
          piece: piece.type,
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