import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from "phosphor-react";
import dayjs from "dayjs";
import { useEffect, useState } from 'react';
import { http } from '../lib/axios';

interface HabitsListProps {
    date: Date,
    habitUpdatePercentage: (contTotalHabits: number, contCompletedHabits: number) => void,
}

interface HabitsInfo {
    possibleHabits: Array<{
        id: string,
        title: string,
        created_at: string
    }>,
    completedHabits: string[]
}

export function HabitList( {date, habitUpdatePercentage}: HabitsListProps ) {

    const [habitInfo, setHabitInfo] = useState<HabitsInfo>();

    useEffect(() => {
        http.get('day', {
          params: {
            date: date.toISOString(),
          }  
        }).then(response => {
            setHabitInfo(response.data)
        })
    }, [])

    async function handleToggleHabit(habitId: string) {
        const isHabitAlreadyCompleted = habitInfo!.completedHabits.includes(habitId);

        let completedHabits: string[] = [];

        if(isHabitAlreadyCompleted) {
            completedHabits = habitInfo!.completedHabits.filter(id => id !== habitId);
        } else {
            completedHabits = [...habitInfo!.completedHabits, habitId]
        }

        setHabitInfo({
            possibleHabits: habitInfo!.possibleHabits,
            completedHabits,
        })

        await http.patch(`habits/${habitId}/toggle`);

        const contCompletedHabits: number = completedHabits.length;
        const contTotalHabits: number = habitInfo!.possibleHabits.length;
        habitUpdatePercentage(contTotalHabits, contCompletedHabits);
    }

    const isDateInPast = dayjs(date).endOf('day').isBefore(new Date())
    return(
        <div className="mt-6 flex flex-col gap-3">
            {habitInfo?.possibleHabits.map(habit => {
                return(
                    <Checkbox.Root 
                        className="flex items-center gap-3 group" 
                        key={habit.id} 
                        onCheckedChange={() => handleToggleHabit(habit.id)}
                        checked={habitInfo.completedHabits.includes(habit.id)}
                        disabled={isDateInPast}>

                        <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
                            <Checkbox.Indicator>
                                <Check size={20} className="text-white"/>
                            </Checkbox.Indicator>
                        </div>

                        <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
                            {habit.title}
                        </span>
                    </Checkbox.Root>
                )
            })}
        </div>
    )
}