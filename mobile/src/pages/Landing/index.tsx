import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';

import { 
  Container, 
  Image,
  Title,
  TitleBold, 
  ButtonsContainer,
  StudyButton,
  StudyIcon,
  StudyText,
  GiveClassesButton,
  GiveClassesIcon,
  GiveClassesText,
  TotalConnections,
  TotalConnectionsIcon,
} from './styles';

import landingImage from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';

const Landing: React.FC = () => {
  const { navigate } = useNavigation();

  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    api.get('connections').then(response => {
      const { total } = response.data;

      setTotalConnections(total);
    });
  }, []);

  function handleNavigateToGiveClassesPage() {
    navigate('GiveClasses');
  }

  function handleNavigateToStudyPages() {
    navigate('Study');
  }

  return (
    <Container>
      <Image source={landingImage} resizeMode="contain" />

      <Title>
        Seja bem vindo, {'\n'}
        <TitleBold>
          O que deseja fazer?
        </TitleBold>
      </Title>

      <ButtonsContainer>
        <StudyButton onPress={handleNavigateToStudyPages}>
          <StudyIcon source={studyIcon} />
          <StudyText>
            Estudar
          </StudyText>
        </StudyButton>

        <GiveClassesButton onPress={handleNavigateToGiveClassesPage}>
          <GiveClassesIcon source={giveClassesIcon} />
          <GiveClassesText>
            Dar aulas
          </GiveClassesText>
        </GiveClassesButton>
      </ButtonsContainer>

      <TotalConnections>
        Total de {
          (totalConnections > 1) ? 
            `${totalConnections} conexões` : 
            `${totalConnections} conexão`
        } já realizadas {' '}
        <TotalConnectionsIcon source={heartIcon} />
      </TotalConnections>
    </Container>
  );
}

export default Landing;
