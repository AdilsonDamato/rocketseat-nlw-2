import React, { useState, useEffect, useCallback } from 'react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import api from '../../services/api';

import { Picker } from '@react-native-community/picker';
import ModalSelector from 'react-native-modal-selector';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import {
  Container,
  ScroolView,
  SearchForm,
  Label,
  Input,
  InputGroup,
  InputBlock,
  ButtonFilters,
  SubmitButton,
  SubmitButtonText,
  SelectPicker,
} from './styles';

import { Feather } from '@expo/vector-icons';

const TeacherList: React.FC = () => {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [teachersFavorites, setTeachersFavorites] = useState<number[]>([]);

  const [subject, setSubject] = useState('Artes');
  const [week_day, setWeekDay] = useState('Domingo');
  const [time, setTime] = useState('');

  const listSubjects = [
    { key:"Artes", label:"Artes" },
    { key:"Biologia", label:"Biologia" },
    { key:"Ciência", label:"Ciência" },
    { key:"Química", label:"Química" },
    { key:"Física", label:"Física" },
    { key:"Matemática", label:"Matemática" },
    { key:"Português", label:"Português" },
  ];

  const listWeekDays = [
    { key: 0, label: 'Domingo' },
    { key: 1, label: 'Segunda-feira' },
    { key: 2, label: 'Terça-feira' },
    { key: 3, label: 'Quarta-feira' },
    { key: 4, label: 'Quinta-feira' },
    { key: 5, label: 'Sexta-feira' },
    { key: 6, label: 'Sábado' },
  ];

  function loadFavorites() {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);
        const favoritedTEachersIds = favoritedTeachers.map((favoriteTeacher: Teacher) => {
          return favoriteTeacher.id;
        });

        setTeachersFavorites(favoritedTEachersIds);
      }
    });
  }

  async function handleSearchTeachers() {
    loadFavorites();

    const weekDayIndex = listWeekDays.findIndex(weekDay => {
      return weekDay.label === week_day;
    });

    const response = await api.get('classes', {
      params: { 
        subject,
        week_day: weekDayIndex,
        time,
      }
    });
    
    setIsFiltersVisible(false);
    setTeachers(response.data);
  }

  function handleToggleFiltersVisible() {
    setIsFiltersVisible(!isFiltersVisible);
  }

  useFocusEffect(() => {
    loadFavorites();
  });

  return (
    <Container>
      <PageHeader 
        title="Proffys Disponíveis"
        headerRight={(
          <ButtonFilters onPress={handleToggleFiltersVisible}>
            <Feather name="filter" size={20} color="#fff" />
          </ButtonFilters>
        )}
      >
        {isFiltersVisible && (
          <SearchForm>
            <Label>Matéria</Label>
            {Platform.OS === 'android' ? 
              (
                <SelectPicker>
                  <Picker
                    selectedValue={subject}
                    onValueChange={(itemValue, itemIndex) => {
                      setSubject(String(itemValue));
                    }}
                    mode="dialog"
                  >
                    {listSubjects.map(subject => {
                      return <Picker.Item label={subject.label} value={subject.key} />;
                    })}
                  </Picker>
                </SelectPicker>
              )
              :
              (
                <ModalSelector
                  data={listSubjects}
                  initValue={subject}
                  touchableActiveOpacity={1}
                  onChange={option => { 
                    setSubject(option.key);
                  }}
                  cancelText="Cancelar"
                >
                  <Input
                    editable={false}
                    value={subject}
                  />
                </ModalSelector>
              )
            }

            <InputGroup>
              <InputBlock>
                <Label>Dia da semana</Label>
                {Platform.OS === 'android' ? 
                  (
                    <SelectPicker>
                      <Picker
                        selectedValue={week_day}
                        onValueChange={(itemValue, itemIndex) => {
                          setWeekDay(String(itemValue));
                        }}
                        mode="dialog"
                      >
                        {listWeekDays.map(day => {
                          return <Picker.Item label={day.label} value={day.label} />;
                        })}
                      </Picker>
                    </SelectPicker>
                  )
                  :
                  (
                    <ModalSelector
                      data={listWeekDays}
                      initValue={week_day}
                      touchableActiveOpacity={1}
                      onChange={option => { 
                        setWeekDay(String(option.label));
                      }}
                      cancelText="Cancelar"
                    >
                      <Input
                        editable={false}
                        value={week_day}
                      />
                    </ModalSelector>
                  )
                }
                
              </InputBlock>

              <InputBlock>
                <Label>Horário</Label>
                <Input
                  placeholder="Qual horário?"
                  placeholderTextColor="#c1bccc"
                  value={time}
                  onChangeText={text => setTime(text)}
                />
              </InputBlock>
            </InputGroup>

            <SubmitButton onPress={handleSearchTeachers}>
             <SubmitButtonText>Filtrar</SubmitButtonText> 
            </SubmitButton>
          </SearchForm>
        )}
      </PageHeader>

      <ScroolView contentContainerStyle={{
        paddingHorizontal: 16,
        paddingBottom: 8,
      }}>
        {teachers.map((teacher: Teacher) => {
          return (
            <TeacherItem 
              key={teacher.id} 
              teacher={teacher} 
              favorited={teachersFavorites.includes(teacher.id)}
            />
          )
        })}
      </ScroolView>
    </Container>
  );
}

export default TeacherList;
