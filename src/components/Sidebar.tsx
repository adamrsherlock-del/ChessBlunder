export default function Sidebar() {
    return (
        <aside className="w-64 border-r border-slate-700 p-6">
            <button className="w-full rounded-lg bg-violet-600 p-4 text-left mb-3">
                👁 Vision
            </button>

            <button className="w-full p-4 text-left text-slate-300">
                🎯 Control
            </button>

            <button className="w-full p-4 text-left text-slate-500">
                ⚠ Threats
                <div className="text-xs">Coming Soon</div>
            </button>

            <button className="w-full p-4 text-left text-slate-500">
                📈 Analysis
                <div className="text-xs">Coming Soon</div>
            </button>
        </aside>
    )
}