import { useNavigation } from '@react-navigation/native';

import { Text, View } from 'react-native';

interface HabitsEmptyProps {
  isInPast: boolean;
}

export function HabitsEmpty({ isInPast }: HabitsEmptyProps) {
  const { navigate } = useNavigation();

  return (
    <View>
      {isInPast ? (
        <Text className="text-zinc-400 text-base">
          Você não estava monitorando nenhum hábito neste dia {` `}
          <Text
            className="text-violet-400 underline text-base active:text-violet-600"
            onPress={() => navigate('new')}
          >
            comece cadastrando um.
          </Text>
        </Text>
      ) : (
        <Text className="text-zinc-400 text-base">
          Você ainda não está monitorando nenhum hábito hoje {` `}
          <Text
            className="text-violet-400 underline text-base active:text-violet-600"
            onPress={() => navigate('new')}
          >
            comece cadastrando um.
          </Text>
        </Text>
      )}
    </View>
  );
}
