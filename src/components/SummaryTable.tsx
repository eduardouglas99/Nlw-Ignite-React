import { generateDatesFromYearBeginning } from "../utils/genarete-dates-from-year-beginning"
import { HabitDay } from "./HabitDay"

const weekDays = [
    'D', 'S', 'T', 'Q', 'Q', 'S', 'S',
]

const SummaryDates = generateDatesFromYearBeginning();

const minimumSummaryDatesSize = 18 * 7;
const amountOfDaysToFill = minimumSummaryDatesSize - SummaryDates.length;

export default function SummaryTable() {
    return(
        <div className="w-full flex">
            <div className="grid grid-rows-7 grid-flow-row gap-3">
                {weekDays.map((week, i) => {
                    return (
                        <div className="text-zinc-400 text-xl font-bold h-10 flex justify-center" key={`${week}-${i}`}>
                            {week}
                        </div>
                    )
                })}
            </div>

            <div className="grid grid-rows-7 grid-flow-col gap-3">
                {SummaryDates.map((date) => {
                    return(
                        <HabitDay 
                            amount={5} 
                            completed={Math.round(Math.random())} 
                            key={date.toString()}
                        />
                    )
                })}

                {amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map((_, i) => {
                    return(
                        <div className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed" key={i} />
                    )
                })}
            </div>
        </div>
    )
}