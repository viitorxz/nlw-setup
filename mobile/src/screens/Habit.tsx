import clsx from 'clsx';
import dayjs from 'dayjs';

import { useRoute } from '@react-navigation/native';
import { View, Text, ScrollView, Alert } from 'react-native';

import { api } from '../lib/axios';
import { generateProgressPercentage } from '../utils/generate-progess-percentage';

import { BackButton } from '../components/BackButton';
import { ProgressBar } from '../components/ProgressBar';
import { Checkbox } from '../components/Checkbox';
import { useEffect, useState } from 'react';
import { Loading } from '../components/Loading';
import { HabitsEmpty } from '../components/HabitsEmpty';

interface RouteParams {
  date: string;
}

interface DayInfoProps {
  possibleHabits: Array<{
    id: string;
    title: string;
  }>;
  completedHabits: Array<string>;
}

export function Habit() {
  const [loading, setLoading] = useState(true);
  const [dayInfo, setDayInfo] = useState<DayInfoProps | null>(null);
  const [completedHabits, setCompletedHabits] = useState<Array<string>>([]);

  const route = useRoute();
  const { date } = route.params as RouteParams;

  const parsedDate = dayjs(date);
  const isDateInPast = parsedDate.endOf('day').isBefore(new Date());
  const dayOfWeek = parsedDate.format('dddd');
  const dayAndMonth = parsedDate.format('DD/MM');

  const habitProgress = dayInfo?.possibleHabits.length
    ? generateProgressPercentage(
        dayInfo.possibleHabits.length,
        completedHabits.length
      )
    : 0;

  async function fetchHabits() {
    try {
      setLoading(true);
      const response = await api.get<DayInfoProps>('/day', {
        params: { date },
      });
      setDayInfo(response.data);
      setCompletedHabits(response.data.completedHabits);
    } catch (err) {
      console.error(err);
      Alert.alert('Ooops!', 'Não foi possível obter as informações deste dia!');
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleHabit(habitId: string) {
    try {
      await api.patch(`/habits/${habitId}/toggle`);
      if (completedHabits.includes(habitId)) {
        setCompletedHabits((prevState) =>
          prevState.filter((habit) => habit !== habitId)
        );
      } else {
        setCompletedHabits((prev) => [...prev, habitId]);
      }
      setDayInfo({
        possibleHabits: dayInfo!.possibleHabits,
        completedHabits,
      });
    } catch (error) {
      console.error(error);
      Alert.alert('Ooops!', 'Houve um error ao atualizar o status do hábito')
    }
  }

  useEffect(() => {
    fetchHabits();
  }, []);

  if (loading) return <Loading />;

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />

        <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
          {dayOfWeek}
        </Text>

        <Text className="text-white font-extrabold text-3xl">
          {dayAndMonth}
        </Text>

        <ProgressBar progress={habitProgress} />

        <View
          className={clsx('mt-6', {
            'opacity-50': isDateInPast,
          })}
        >
          {dayInfo?.possibleHabits && dayInfo.possibleHabits.length > 0 ? (
            dayInfo.possibleHabits.map((habit) => (
              <Checkbox
                key={habit.id}
                title={habit.title}
                disabled={isDateInPast}
                checked={completedHabits.includes(habit.id)}
                onPress={() => handleToggleHabit(habit.id)}
              />
            ))
          ) : (
            <HabitsEmpty isInPast={isDateInPast} />
          )}
        </View>
      </ScrollView>
    </View>
  );
}
