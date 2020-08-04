import React from 'react';

import logoImg from '../../assets/images/logo.svg';
import landingImg from '../../assets/images/landing.svg';

import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

import { 
  PageLanding, 
  PageLandingContent,
  LogoContainer,
  HeroImage,
  ButtonsContainer,
  Study,
  GiveClasses,
  TotalConnections 
} from './styles';

const Landing: React.FC = () => {
  return (
    <PageLanding>
      <PageLandingContent>
        <LogoContainer>
          <img src={logoImg} alt="Proffy" />
          <h2>Sua plataforma de estudos online.</h2>
        </LogoContainer>

        <HeroImage 
          src={landingImg} 
          alt="Plataforma de estudos" 
        />

        <ButtonsContainer>
          <Study to="/study">
            <img src={studyIcon} alt="Estudar" />
            Estudar
          </Study>

          <GiveClasses to="/give-classes">
            <img src={giveClassesIcon} alt="Dar aulas" />
            Dar aulas
          </GiveClasses>
        </ButtonsContainer>

        <TotalConnections>
          Total de 200 conexões já realizadas <img src={purpleHeartIcon} alt="Coração roxo" />
        </TotalConnections>
      </PageLandingContent>
    </PageLanding>
  );
}

export default Landing; 
