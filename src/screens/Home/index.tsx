import React, { useEffect, useState } from "react";
import { Alert, FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Participant } from "../../components/Participant";

import { styles } from "./styles";

export const Home: React.FC = () => {
  const [partName, setPartName] = useState('');
  const [participants, setParticipants] = useState(['Éric', 'Felipe', 'Otavio', 'Leonan', 'Anna', 'Miryan', 'Joao Pedro', 'Ana Clara', 'Luis Felipe', 'João Lucas Buzzo']);

  const handleParticipantAdd = (name: string) => {
    if (participants.includes(name)) {
      Alert.alert('Participante Existe', 'Já existe um participante na lista com esse nome.');
      return;
    }

    setParticipants(prevState => [...prevState, name]);
    setPartName('');
  }

  const handleParticipantRemove = (name: string) => {
    Alert.alert('Remover', `Remover o participante ${name}?`, [
      {
        text: 'Sim',
        onPress: () => {
          setParticipants(participants.filter(p => p !== name));
        }
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do evento</Text>
      <Text style={styles.eventDate}>Sexta, 4 de Novembro de 2022.</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor={"#6B6B6B"}
          onChangeText={setPartName}
          value={partName}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleParticipantAdd(partName)}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={(_, i) => `${i}`}
        renderItem={({ item }) =>
          <Participant
            name={item}
            onRemove={() => handleParticipantRemove(item)}
          />
        }
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>Ninguém chegou no evento ainda? Adicione participantes a sua lista de presença.</Text>
        )}
      />
    </View>
  );

}