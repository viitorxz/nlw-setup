import { TouchableOpacity, Dimensions, TouchableOpacityProps } from 'react-native';
import dayjs from 'dayjs';
import clsx from 'clsx';
import { generateProgressPercentage } from '../utils/generate-progess-percentage';

const WEEK_DAYS = 7;
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;

export const DAY_MARING_BETWEEN = 8;
export const DAY_SIZE = (Dimensions.get("screen").width / WEEK_DAYS) - (SCREEN_HORIZONTAL_PADDING + 5);

interface HabitDayProps extends TouchableOpacityProps {
  amountOfHabits?: number;
  amountCompleted?: number;
  date: Date;
}

export function HabitDay({amountOfHabits = 0, amountCompleted = 0, date, ...props}: HabitDayProps) {
  const amountAccomplishedPercentege = amountOfHabits > 0 ? generateProgressPercentage(amountOfHabits, amountCompleted) : 0;
  const today = dayjs().startOf('day').toDate();
  const isCurrentDay = dayjs(date).isSame(today, 'day');
  return (
    <TouchableOpacity
      {...props}
      className={
        clsx("rounded-lg border-2 m-1", {
          "bg-zinc-900 border-zinc-800": amountAccomplishedPercentege === 0,
          "bg-violet-900 border-violet-700": amountAccomplishedPercentege > 0 && amountAccomplishedPercentege < 20,
          "bg-violet-800 border-violet-600": amountAccomplishedPercentege > 20 && amountAccomplishedPercentege < 40,
          "bg-violet-700 border-violet-500": amountAccomplishedPercentege > 40 && amountAccomplishedPercentege < 60,
          "bg-violet-600 border-violet-500": amountAccomplishedPercentege > 60 && amountAccomplishedPercentege < 80,
          "bg-violet-500 border-violet-400": amountAccomplishedPercentege > 80,
          "border-white border-4": isCurrentDay
        })
      }
      style={{ height: DAY_SIZE, width: DAY_SIZE }}
      activeOpacity={0.8}
    />
  )
}
