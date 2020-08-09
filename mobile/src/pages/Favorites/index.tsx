import React, { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import {
  Container,
  ScroolView,
} from './styles';

const Favorites: React.FC = () => {
  const [teachersFavorites, setTeachersFavorites] = useState<Teacher[]>([]);

  function loadFavorites() {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);
        
        setTeachersFavorites(favoritedTeachers);
      }
    });
  }

  useFocusEffect(() => {
    loadFavorites();
  });

  return (
    <Container>
      <PageHeader title="Meus proffys Favoritos" />

      <ScroolView contentContainerStyle={{
        paddingHorizontal: 16,
        paddingBottom: 8,
      }}>
        {teachersFavorites.map((teacherFavorite: Teacher) => {
          return (
            <TeacherItem
              key={teacherFavorite.id}
              teacher={teacherFavorite}
              favorited
            />
          )
        })}
      </ScroolView>
    </Container>
  );
}

export default Favorites;
