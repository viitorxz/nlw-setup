import { View, Text, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { api } from '../lib/axios';
import { generateRangeBetweenDates } from '../utils/generate-range-between-dates';

import { Header } from '../components/Header';

import { DAY_SIZE, HabitDay } from '../components/HabitDay';
import { useEffect, useState } from 'react';
import { Loading } from '../components/Loading';
import dayjs from 'dayjs';
const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

const datesFromYearStart = generateRangeBetweenDates();
const minimumSummaryDatesSizes = 18 * 7;
const amountOfDaysToFill = minimumSummaryDatesSizes - datesFromYearStart.length;

type Summary = Array<{
  id: string;
  date: string;
  amount: number;
  completed: number;
}>;

export function Home() {
  const [loading, setLoading] = useState(true);
  const { navigate } = useNavigation();
  const [summary, setSummary] = useState<Summary | null>(null);

  async function fetchData() {
    try {
      setLoading(true);
      const response = await api.get('/summary');
      setSummary(response.data);
    } catch (error) {
      Alert.alert('Oooops!', 'Não foi possível carregar o sumário de hábitos.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <Loading />;

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />
      <View className="flex-row mt-6 mb-2">
        {weekDays.map((weekDay, i) => (
          <Text
            key={`${weekDay}-${i}`}
            className="text-zinc-400 text-xl font-bold text-center mx-1 "
            style={{ width: DAY_SIZE }}
          >
            {weekDay}
          </Text>
        ))}
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {summary && (
          <View className="flex-row flex-wrap">
            {datesFromYearStart.map((date) => {
              const dayWithHabits = summary?.find((day) => {
                return dayjs(date).isSame(day.date, 'day');
              });
              return (
                <HabitDay
                  date={date}
                  amountOfHabits={dayWithHabits?.amount}
                  amountCompleted={dayWithHabits?.completed}
                  key={date.toISOString()}
                  onPress={() =>
                    navigate('habit', { date: date.toISOString() })
                  }
                />
              );
            })}
            {amountOfDaysToFill > 0 &&
              Array.from({ length: amountOfDaysToFill }).map((_, i) => (
                <View
                  key={i + 'k'}
                  className="bg-zinc-900 rounded-lg border-2 border-zinc-700 m-1 opacity-40"
                  style={{ width: DAY_SIZE, height: DAY_SIZE }}
                />
              ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
