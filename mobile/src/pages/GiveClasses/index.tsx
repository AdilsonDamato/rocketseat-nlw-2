import React from 'react';
import { useNavigation } from '@react-navigation/native';

import {
  Container,
  ImageBackground,
  Title,
  Description,
  Button,
  ButtonText,
} from './styles';

import giveClassesBackgroundImage from '../../assets/images/give-classes-background.png';

const GiveClasses: React.FC = () => {
  const { navigate } = useNavigation();

  function handleNavigateToLandingPage() {
    navigate('Landing');
  }

  return (
    <Container>
      <ImageBackground 
        source={giveClassesBackgroundImage}
        resizeMode="contain"
      >
        <Title>
          Quer ser um Proffy?
        </Title>

        <Description>
          Para começar, você precisa se cadastrar como professor na nossa plataforma web.
        </Description>
      </ImageBackground>

      <Button onPress={handleNavigateToLandingPage}>
        <ButtonText>Tudo bem</ButtonText>
      </Button>
    </Container>
  );
}

export default GiveClasses;
