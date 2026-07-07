type Props = {
    page: "vision" | "threats"
    setPage: (page: "vision" | "threats") => void
}

export default function Sidebar({ page, setPage }: Props) {
    return (
        <aside className="w-64 border-r border-slate-700 p-6">

            <button
                onClick={() => setPage("threats")}
                className={`w-full rounded-lg p-4 text-left mb-3 ${page === "threats"
                    ? "bg-violet-600"
                    : "bg-slate-800 hover:bg-slate-700"
                    }`}
            >
                ⚠ Threats
            </button>

            <button
                onClick={() => setPage("vision")}
                className={`w-full rounded-lg p-4 text-left mb-3 ${page === "vision"
                    ? "bg-violet-600"
                    : "bg-slate-800 hover:bg-slate-700"
                    }`}
            >
                👁 Vision
            </button>





            <button className="w-full p-4 text-left text-slate-500">
                📈 Analysis
                <div className="text-xs">Coming Soon</div>
            </button>
        </aside>
    )
}