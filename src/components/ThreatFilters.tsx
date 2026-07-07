type Props = {
    showWhiteThreats: boolean
    setShowWhiteThreats: (value: boolean) => void

    showBlackThreats: boolean
    setShowBlackThreats: (value: boolean) => void

    showHanging: boolean
    setShowHanging: (value: boolean) => void

    showAttacked: boolean
    setShowAttacked: (value: boolean) => void

    showDefended: boolean
    setShowDefended: (value: boolean) => void

    showAttackArrows: boolean
    setShowAttackArrows: (value: boolean) => void

    showDefenceArrows: boolean
    setShowDefenceArrows: (value: boolean) => void
}



export default function ThreatFilters({
    showWhiteThreats,
    setShowWhiteThreats,
    showBlackThreats,
    setShowBlackThreats,
    showHanging,
    setShowHanging,
    showAttacked,
    setShowAttacked,
    showDefended,
    setShowDefended,
    showAttackArrows,
    setShowAttackArrows,

    showDefenceArrows,
    setShowDefenceArrows,
}: Props) {

    return (

        <div className="rounded-lg bg-slate-800 p-4">

            <h3 className="font-semibold mb-4">
                Threat Filters
            </h3>

            <p className="text-sm text-slate-400 mb-2">
                Pieces
            </p>

            <label className="block">
                <input
                    type="checkbox"
                    checked={showWhiteThreats}
                    onChange={(e) =>
                        setShowWhiteThreats(e.target.checked)
                    }
                />
                <span className="ml-2">White</span>
            </label>

            <label className="block mb-4">
                <input
                    type="checkbox"
                    checked={showBlackThreats}
                    onChange={(e) =>
                        setShowBlackThreats(e.target.checked)
                    }
                />
                <span className="ml-2">Black</span>
            </label>

            <p className="text-sm text-slate-400 mb-2">
                Status
            </p>

            <label className="block">
                <input
                    type="checkbox"
                    checked={showHanging}
                    onChange={(e) =>
                        setShowHanging(e.target.checked)
                    }
                />
                <span className="ml-2">🔴 Hanging</span>
            </label>

            <label className="block">
                <input
                    type="checkbox"
                    checked={showAttacked}
                    onChange={(e) =>
                        setShowAttacked(e.target.checked)
                    }
                />
                <span className="ml-2">🟠 Under Pressure</span>
            </label>

            <label className="block">
                <input
                    type="checkbox"
                    checked={showDefended}
                    onChange={(e) =>
                        setShowDefended(e.target.checked)
                    }
                />
                <span className="ml-2">🟢 Defended</span>
            </label>

            <hr className="my-4 border-slate-600" />

            <h3 className="font-semibold mb-3">
                Visuals
            </h3>

            <label className="block">
                <input
                    type="checkbox"
                    checked={showAttackArrows}
                    onChange={(e) =>
                        setShowAttackArrows(e.target.checked)
                    }
                />
                <span className="ml-2">Attack Arrows</span>
            </label>

            <label className="block">
                <input
                    type="checkbox"
                    checked={showDefenceArrows}
                    onChange={(e) =>
                        setShowDefenceArrows(e.target.checked)
                    }
                />
                <span className="ml-2">Defence Arrows</span>
            </label>

        </div>

    )

}