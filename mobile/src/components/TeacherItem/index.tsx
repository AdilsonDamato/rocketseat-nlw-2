import React, { useState } from 'react';
import { Linking } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';

import {
  Container,
  Profile,
  Avatar,
  Info,
  InfoName,
  InfoSubject,
  Bio,
  Footer,
  Price,
  PriceValue,
  ButtonsContainer,
  ButtonFavorite,
  ButtonFavoriteIcon,
  ButtonUnFavorite,
  ButtonUnFavoriteIcon,
  ButtonContact,
  ButtonContactIcon,
  ButtonContactText
} from './styles';

import favoriteIcon from '../../assets/images/icons/heart-outline.png';
import unFavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

export interface Teacher {
  id: number;
  subject: string;
  cost: number;
  name: string;
  avatar: string;
  whatsapp: string;
  bio: string;
}

interface TeachersItemProps {
  teacher: Teacher;
  favorited: boolean;
}

const TeacherItem: React.FC<TeachersItemProps> = ({ teacher, favorited }) => {
  const [isFavorited, setIsFavorited] = useState(favorited);

  async function handleLinkToWhatsApp() {
    await api.post('connections', {
      user_id: teacher.id,
    });

    Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`);
  }

  async function handleToggleFavorite() {
    const favorites = await AsyncStorage.getItem('favorites');

    let favoritesArray = [];
      
    if (favorites) {
      favoritesArray = JSON.parse(favorites);
    }

    if (isFavorited) {
      const favoriteIndex = favoritesArray.findIndex((teacherItem: Teacher) => {
        return teacherItem.id === teacher.id;
      });

      favoritesArray.splice(favoriteIndex, 1);

      setIsFavorited(false);
    } else {
      favoritesArray.push(teacher);

      setIsFavorited(true);
    }

    await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
  }

  return (
    <Container>
      <Profile>
        <Avatar 
          source={{ uri: teacher.avatar }}
          resizeMode="contain"
        />

        <Info>
          <InfoName>{teacher.name}</InfoName>
          <InfoSubject>{teacher.subject}</InfoSubject>
        </Info>
      </Profile>

      <Bio>{teacher.bio}</Bio>

      <Footer>
        <Price>
          Preço/Hora: {'  '}
          <PriceValue>
            R$ {teacher.cost}
          </PriceValue>
        </Price>

        <ButtonsContainer>
          {isFavorited 
            ? 
            (
              <ButtonUnFavorite onPress={handleToggleFavorite}>
                <ButtonUnFavoriteIcon source={unFavoriteIcon} resizeMode="contain" />
              </ButtonUnFavorite>
            )
            : 
            (
              <ButtonFavorite onPress={handleToggleFavorite}>
                <ButtonFavoriteIcon source={favoriteIcon} resizeMode="contain" />
              </ButtonFavorite>
            )
          }

          <ButtonContact onPress={handleLinkToWhatsApp}>
            <ButtonContactIcon source={whatsappIcon} resizeMode="contain" />
            <ButtonContactText>Entrar em contato</ButtonContactText>
          </ButtonContact>
        </ButtonsContainer>
      </Footer>
    </Container>
  );
}

export default TeacherItem;
