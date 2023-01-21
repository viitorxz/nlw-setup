import * as Checkbox from '@radix-ui/react-checkbox';
import dayjs from 'dayjs';
import { Check } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { axiosApi } from '../utils/axios';

interface HabitsListProps {
  date: Date;
  onCompletedChange: (completed: number) => void;
}

interface HabitsInfoInterface {
  possibleHabits: Array<{
    id: string;
    title: string;
    created_at: string;
  }>;
  completedHabits: Array<string>;
}

export function HabitsList(props: HabitsListProps) {
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfoInterface>();

  useEffect(() => {
    axiosApi
      .get('/day', {
        params: {
          date: props.date.toISOString(),
        },
      })
      .then((response) => {
        setHabitsInfo(response.data);
      });
  }, []);

  if (!habitsInfo) return <h1>Carregando...</h1>;

  const isDateInPast = dayjs(props.date).endOf('day').isBefore(new Date());
  let completedHabits: Array<string> = [];

  async function handleToggleHabbit(habitId: string) {
    await axiosApi.patch(`/habits/${habitId}/toggle`);
    const isHabitAlreadyCompleted =
      habitsInfo!.completedHabits.includes(habitId);
    if (isHabitAlreadyCompleted) {
      completedHabits = habitsInfo!.completedHabits.filter(
        (id) => id !== habitId
      );
    } else {
      completedHabits = [...habitsInfo!.completedHabits, habitId];
    }
    setHabitsInfo({
      possibleHabits: habitsInfo!.possibleHabits,
      completedHabits,
    });

    props.onCompletedChange(completedHabits.length);
  }

  return (
    <div className="mt-6 flex flex-col gap-3">
      {habitsInfo?.possibleHabits.map((habit) => (
        <Checkbox.Root
          key={habit.id}
          onCheckedChange={() => handleToggleHabbit(habit.id)}
          disabled={isDateInPast}
          checked={habitsInfo.completedHabits.includes(habit.id)}
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 group-focus:ring-2 group-focus:ring-violet-500 group-focus:ring-offset-2 group-focus:ring-offset-background">
            <Checkbox.Indicator>
              <Check size={20} className="text-white" />
            </Checkbox.Indicator>
          </div>

          <span className="font-semibold text-lg lg:text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-300">
            {habit.title}
          </span>
        </Checkbox.Root>
      ))}
    </div>
  );
}
