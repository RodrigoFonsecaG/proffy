import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import {
  BorderlessButton,
  GestureHandlerRootView,
  RectButton
} from 'react-native-gesture-handler';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { Feather } from '@expo/vector-icons';

import styles from './styles';
import api from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const TeacherList = () => {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  function handleToggleFiltersVisible() {
    setIsFiltersVisible(!isFiltersVisible);
  }

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');
  const [teachers, setTeachers] = useState([]);

  const [favorites, setFavorites] = useState<number[]>([]);

  function loadFavorites() {
     AsyncStorage.getItem('favorites').then((response) => {
       if (response) {
         const favoritedTeachers = JSON.parse(response);
         const favoritedTeachersIds = favoritedTeachers.map(
           (teacher: Teacher) => {
             return teacher.id;
           }
         );

         setFavorites(favoritedTeachersIds);
       }
     });
  }

  useFocusEffect(() => {
    loadFavorites();
  })


  async function handleFiltersSubmit() {

    loadFavorites();

    const response = await api.get(`classes`, {
      params: {
        subject,
        week_day,
        time
      }
    });

    setIsFiltersVisible(false);

    setTeachers(response.data);
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title="Proffys disponíveis"
        headerRight={
          <BorderlessButton onPress={handleToggleFiltersVisible}>
            <Feather name="filter" size={20} color="#fff" />
          </BorderlessButton>
        }
      >
        {isFiltersVisible && (
          <GestureHandlerRootView style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              value={subject}
              onChangeText={(text) => setSubject(text)}
              style={styles.input}
              placeholder="Qual a matéria?"
              placeholderTextColor="#c1bccc"
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput
                  value={week_day}
                  onChangeText={(text) => setWeekDay(text)}
                  style={styles.input}
                  placeholder="Qual o dia?"
                  placeholderTextColor="#c1bccc"
                />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  value={time}
                  onChangeText={(text) => setTime(text)}
                  style={styles.input}
                  placeholder="Qual o horário?"
                  placeholderTextColor="#c1bccc"
                />
              </View>
            </View>
            <RectButton
              onPress={handleFiltersSubmit}
              style={styles.submitButton}
            >
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </GestureHandlerRootView>
        )}
      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16
        }}
      >
        {teachers.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher} favorited={favorites.includes(teacher.id)} />;
        })}
      </ScrollView>
    </View>
  );
};

export default TeacherList;
