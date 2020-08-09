import styled from 'styled-components/native';
import { BorderlessButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  padding-top: 50px;
  padding-left: 40px;
  padding-right: 40px;
  padding-bottom: 40px;
  background: #8257e5;

`;

export const TopBar = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const BackButton = styled(BorderlessButton)``;

export const BackButtonIcon = styled.Image``;

export const LogoImage = styled.Image``;

export const Title = styled.Text`
  font-family: Archivo_700Bold;
  color: #fff;
  font-size: 24px;
  line-height: 32px;
  max-width: 160px;
  margin-top: 40px;
  margin-bottom: 40px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
