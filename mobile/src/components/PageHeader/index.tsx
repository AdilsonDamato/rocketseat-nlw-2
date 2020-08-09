import React, { ReactNode } from 'react';
import { useNavigation } from '@react-navigation/native';

import {
  Container,
  TopBar,
  BackButton,
  BackButtonIcon,
  LogoImage,
  Title,
  Header,
} from './styles';

import backButtonIcon from '../../assets/images/icons/back.png';
import logoImage from '../../assets/images/logo.png';

interface PageHeaderProps {
  title: string;
  headerRight?: ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, headerRight, children }) => {
  const { navigate } = useNavigation();

  function handleBackButton() {
    navigate('Landing');
  }

  return (
    <Container>
      <TopBar>
        <BackButton onPress={handleBackButton}>
          <BackButtonIcon source={backButtonIcon} resizeMode="contain" />
        </BackButton>

        <LogoImage source={logoImage} resizeMode="contain" />
      </TopBar>

      <Header>
        <Title>{title}</Title>

        {headerRight}
      </Header>

      {children}
    </Container>
  );
}

export default PageHeader;
