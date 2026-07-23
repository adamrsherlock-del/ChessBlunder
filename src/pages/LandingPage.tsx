import "./LandingPage.css"

type Props = {
    onTryDemo: () => void
    onAnalyseGame: () => void
}

export default function LandingPage({
    onTryDemo,
    onAnalyseGame,
}: Props) {
    return (
        <div className="landing-page">

            <header className="landing-header">
                <h1>♟ ChessBlunder</h1>
            </header>

            <section className="hero">

                <div className="hero-content">

                    <h2>
                        Stop blundering.
                        <br />
                        Start seeing.
                    </h2>

                    <p>
                        Upload any Chess.com or Lichess game and instantly reveal
                        hidden threats, hanging pieces and tactical opportunities
                        with visual board overlays designed to improve your chess vision.
                    </p>

                    <div className="hero-buttons">
                        <button
                            className="primary-button"
                            onClick={onTryDemo}
                        >
                            Explore Demo Game
                        </button>

                        <button
                            className="secondary-button"
                            onClick={onAnalyseGame}
                        >
                            Analyse a Game
                        </button>
                    </div>

                    <p className="hero-note">
                        Free • No account required
                    </p>

                </div>

                <div className="hero-image">

                    <div className="image-placeholder">
                        Fight Cloud Artwork
                    </div>

                </div>

            </section>

            <section className="features">

                <div className="feature-card">
                    <h3>👁 Reveal Every Threat</h3>
                    <p>
                        Instantly visualise attacks across the board and understand
                        who's really under pressure.
                    </p>
                </div>

                <div className="feature-card">
                    <h3>♟ Find Hanging Pieces</h3>
                    <p>
                        Never overlook undefended pieces or easy tactical wins again.
                    </p>
                </div>

                <div className="feature-card">
                    <h3>📈 Improve Board Vision</h3>
                    <p>
                        Learn visually instead of trying to decode engine evaluations.
                    </p>
                </div>

            </section>

        </div>
    )
}