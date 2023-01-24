import * as Popover from "@radix-ui/react-popover";
import clsx from "clsx";
import { ProgressBar } from "./ProgressBar";
import dayjs from "dayjs";
import { HabitList } from "./HabitList";
import { useEffect, useState } from "react";

interface HabitDayProps {
    date: Date,
    completed?: number,
    amount?: number
}

export function HabitDay({ completed = 0, amount = 0, date }: HabitDayProps) {
    const dayAndMonth = dayjs(date).format('DD/MM');
    const dayOfWeek = dayjs(date).format('dddd');
    const initialPercentage = amount > 0 ? Math.round((completed / amount) * 100) : 0;
    const [percentage, setPercentage] = useState<number>(initialPercentage);
    
    function habitUpdatePercentage(contTotalHabits: number, completed: number) {
        const calculatePercentage = amount > 0 ? Math.round((completed / contTotalHabits) * 100) : 0;
        setPercentage(calculatePercentage);
        console.log(completed, contTotalHabits)
    }

    useEffect(() => {
        setPercentage(initialPercentage)
    }, [amount, completed])

    return (
        <Popover.Root>
            <Popover.Trigger className={clsx("w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg cursor-pointer transition-colors duration-10 ease-linear", 
                {
                'bg-zinc-900 border-zinc-800': percentage === 0, 
                'bg-violet-900 border-violet-700': percentage > 0 && percentage < 20, 
                'bg-violet-800 border-violet-600': percentage >= 20 && percentage < 40, 
                'bg-violet-700 border-violet-500': percentage >= 40 && percentage < 60, 
                'bg-violet-600 border-violet-500': percentage >= 60 && percentage < 80, 
                'bg-violet-500 border-violet-400': percentage >= 80, 
                })}
                
            />

            <Popover.Portal>
                <Popover.Content className="min-w-[320px] w-full p-6 rounded-2xl bg-zinc-900 flex flex-col scrollBarStyle">
                    <span className="font-semibold text-zinc-400">{dayOfWeek}</span>
                    <span className="mt-1 font-extrabold leading-tight text-3xl">{dayAndMonth}</span>

                    <ProgressBar progress={percentage} />
                    
                    <HabitList date={date} habitUpdatePercentage={habitUpdatePercentage}/>

                    <Popover.Arrow height={8} width={16} className="fill-zinc-900"/>   
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}