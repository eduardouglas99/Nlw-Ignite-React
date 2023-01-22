interface ProgressBar {
    progress: number
}


export function ProgressBar({ progress } : ProgressBar) {
    return(
        <div className="h-3 rounded-xl bg-zinc-700 w-full mt-4" 
            role={"progressbar"} 
            arial-label="Progresso de hábitos completados nesse dia"
            aria-aria-valuenow={progress}>
            <div className="h-3 rounded-xl bg-violet-600"
            style={{width: `${progress}`}}></div>
        </div>
    )
}