type Props = {
    children: React.ReactNode
}

export default function ReplayPanel({ children }: Props) {

    return (

        <div className="w-96 bg-slate-800 rounded-xl p-6 shadow-xl flex flex-col gap-6">
            {children}

        </div>

    )

}