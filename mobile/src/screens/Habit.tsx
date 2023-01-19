import dayjs from 'dayjs';
import { useRoute } from '@react-navigation/native';
import { View, Text, ScrollView } from 'react-native';

import { BackButton } from '../components/BackButton';
import { ProgressBar } from '../components/ProgressBar';
import { Checkbox } from '../components/Checkbox';

interface RouteParams {
  date: string;
}

export function Habit() {
  const route = useRoute();

  const { date } = route.params as RouteParams;

  const parsedDate = dayjs(date);
  const dayOfWeek = parsedDate.format('dddd');
  const dayAndMonth = parsedDate.format('DD/MM');

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

        <ProgressBar progress={30} />

        <View className="mt-6">
          <Checkbox title="Beber 1L de pinga" checked={false} />
          <Checkbox title="Beber 2L de agua" checked={true} />
        </View>
      </ScrollView>
    </View>
  );
}
