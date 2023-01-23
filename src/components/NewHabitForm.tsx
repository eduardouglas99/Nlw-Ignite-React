import * as Checkbox from "@radix-ui/react-checkbox";
import { AppWindow, Check } from "phosphor-react";
import { FormEvent, useRef, useState } from "react";
import { http } from "../lib/axios";

const availableWeekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

export function NewHabitForm() {
    const [title, setTitle] = useState<string>('');
    // const titleRef = useRef<HTMLInputElement>(null)
    const [HabitWeekDays, setHabitWeekDays] = useState<number[]>([])

    async function createNewHabit(e: FormEvent) {
        e.preventDefault();
        
        if(!title || HabitWeekDays.length === 0) {
            console.log('d')
            return;
        }

        await http.post('habits', {
            title,
            HabitWeekDays,
        });

        setTitle('');
        setHabitWeekDays([]);

        alert('Hábito criado com sucesso!');
    }

    function handleToggleWeekDay(weekDay: number) {
        if(HabitWeekDays.includes(weekDay)) {
            const newWeekDays = HabitWeekDays.filter(day => day !== weekDay);
            setHabitWeekDays(newWeekDays);
            return;
        }
        setHabitWeekDays([...HabitWeekDays, weekDay]);
    }

    return(
        <form className="w-full flex flex-col mt-6" onSubmit={createNewHabit}>
            <label htmlFor="tile" className="font-semibold leadind-tight">Qual seu comprometimento</label>
            <input 
                type="text" 
                id="title" 
                placeholder="ex.: Exércicios, dormir bem, etc..." 
                className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
                autoFocus
                // ref={titleRef}
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                />

            <label htmlFor="" className="font-semibold leadind-tight m-4">Qual a recorência</label>

            <div className="mt-3 flex flex-col gap-2">
                {availableWeekDays.map((day, i) => (
                    <Checkbox.Root 
                        className="flex items-center gap-3 group" 
                        key={day}
                        onCheckedChange={() => handleToggleWeekDay(i)}
                        checked={HabitWeekDays.includes(i)}
                    >
                        <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
                            <Checkbox.Indicator>
                                <Check size={20} className="text-white"/>
                            </Checkbox.Indicator>
                        </div>
                        <span className="text-white leading-tight">
                            {day}
                        </span>
                    </Checkbox.Root>
                ))}
            </div>

            <button type="submit" className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500">
                <Check size={20} weight="bold"/>
                Confirmar
            </button>
        </form>
    )
}