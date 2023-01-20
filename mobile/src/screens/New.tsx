import { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { Alert } from 'react-native';
import colors from 'tailwindcss/colors';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { BackButton } from '../components/BackButton';
import { Checkbox } from '../components/Checkbox';
import { api } from '../lib/axios';

const availableWeekDays = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feria',
  'Sexta-feira',
  'Sábado',
];

export function New() {
  const [weekDays, setWeeekDays] = useState<number[]>([]);
  const [title, setTitle] = useState<string>('');

  function handleToggleWeekDay(weekDayIndex: number) {
    if (weekDays.includes(weekDayIndex)) {
      setWeeekDays((prev) => prev.filter((weekDay) => weekDay != weekDayIndex));
    } else {
      setWeeekDays((prev) => [...prev, weekDayIndex]);
    }
  }

  async function handleCreateNewHabit() {
    try {
      if (!title.trim() || weekDays.length === 0) return Alert.alert('Novo hábito', 'Informe os dados do novo hábito')
      await api.post('/habits', { title, weekDays })

      setTitle('')
      setWeeekDays([]);

      Alert.alert('YAY!', "Hábito criado com sucesso!")
    } catch(err) {
      console.error(err);
      Alert.alert('Ooops!', 'Não foi possível criar o hábito 😭')
    }
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />

        <Text className="mt-6 text-white font-extrabold text-3xl">
          Criar hábito
        </Text>

        <Text className="mt-6 text-white font-semibold text-base">
          Qual seu comprometimento?
        </Text>

        <TextInput
          autoFocus
          value={title}
          onChangeText={text => setTitle(text)}
          placeholder="ex.: Exercícios, dormir bem, etc..."
          placeholderTextColor={colors.zinc[500]}
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-800 text-white focus:border-2 focus:border-violet-500"
        />

        <Text className="font-semibold mt-4 mb-3 text-white text-base">
          Qual a recorrência?
        </Text>

        {availableWeekDays.map((days, index) => (
          <Checkbox
            key={`${days}_${index}`}
            title={days}
            checked={weekDays.includes(index)}
            onPress={() => handleToggleWeekDay(index)}
          />
        ))}

        <TouchableOpacity
          onPress={handleCreateNewHabit}
          className="w-full h-14 flex-row justify-center items-center bg-green-500 rounded-md mt-6"
          activeOpacity={0.7}
        >
          <Feather name="check" size={20} color={colors.white} />
          <Text className="font-semibold text-base text-white ml-2">
            Confirmar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
