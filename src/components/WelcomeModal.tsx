type Props = {
    onGetStarted: () => void
}

export default function WelcomeModal({ onGetStarted }: Props) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">

            <div className="w-full max-w-lg rounded-xl bg-slate-800 p-8 shadow-2xl">

                <h2 className="mb-4 text-3xl font-bold">
                    👋 Welcome to ChessBlunder
                </h2>

                <p className="mb-6 text-slate-300">
                    Improve your chess vision by instantly revealing
                    hanging pieces, threats and defended pieces from
                    any PGN.
                </p>

                <div className="mb-6 space-y-3 text-slate-300">

                    <p>
                        🎯 <strong>New here?</strong><br />
                        Load the Demo Game to explore the features.
                    </p>

                    <p>
                        📋 <strong>Already have a game?</strong><br />
                        Paste a Chess.com or Lichess PGN and click
                        <strong> Load PGN</strong>.
                    </p>

                    <p>
                        ♟️ Click any piece to inspect attackers,
                        defenders and tactical threats.
                    </p>

                </div>

                <button onClick={onGetStarted} className="w-full rounded bg-purple-600 py-3 font-semibold hover:bg-purple-500">
                    Get Started
                </button>

            </div>

        </div>
    )
}