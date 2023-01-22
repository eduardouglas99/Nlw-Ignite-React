import { Check } from "phosphor-react";

export function NewHabitForm() {
    return(
        <form className="w-full flex flex-col mt-6">
            <label htmlFor="tile" className="font-semibold leadind-tight">Qual seu comprometimento</label>
            <input type="text" id="title" placeholder="ex.: Exércicios, dormir bem, etc..." className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"/>

            <label htmlFor="" className="font-semibold leadind-tight m-4">Qual a recorência</label>
            <button type="submit" className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500">
                <Check size={20} weight="bold"/>
                Confirmar
            </button>
        </form>
    )
}