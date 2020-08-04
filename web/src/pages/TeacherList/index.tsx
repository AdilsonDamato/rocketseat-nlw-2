import React from 'react';

import {
  Container,
  PageHeader,
  TopBarContainer,
  BackButton
} from './styles';

import backIcon from '../../assets/images/icons/back.svg';

const TeacherList: React.FC = () => {
  return (
    <Container>
      <PageHeader>
        <TopBarContainer>
          <BackButton to="/">
            <img src={backIcon} alt="Voltar" />
          </BackButton>
        </TopBarContainer>
      </PageHeader>
    </Container>
  );
}

export default TeacherList;
