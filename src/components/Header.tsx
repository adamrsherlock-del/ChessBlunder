export default function Header() {
    return (
        <header className="flex items-center justify-between border-b border-slate-700 px-8 py-5">
            <h1 className="text-4xl font-bold">
                Chess<span className="text-violet-400">Blunder</span>
            </h1>

            <nav className="flex gap-8 text-lg">
                <button className="text-violet-400 font-semibold border-b-2 border-violet-400 pb-1">
                    Replay
                </button>

                <button className="text-slate-400 hover:text-white">
                    Analysis
                </button>

                <button className="text-slate-400 hover:text-white">
                    Vision
                </button>
            </nav>
        </header>
    )
}