import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  background: #fff;
  border-width: 1px;
  border-color: #e6e6f0;
  border-radius: 8px;
  margin-bottom: 16px;
  overflow: hidden;
`;

export const Profile = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 24px;
`;

export const Avatar = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  background: #eee;
`;

export const Info = styled.View`
  margin-left: 16px;
`;

export const InfoName = styled.Text`
  font-family: Archivo_700Bold;
  color: #32264d;
  font-size: 20px;
`;

export const InfoSubject = styled.Text`
  font-family: Poppins_400Regular;
  color: #6a6180;
  font-size: 12px;
  margin-top: 4px;
`;

export const Bio = styled.Text`
  margin-left: 24px;
  margin-right: 24px;
  font-family: Poppins_400Regular;
  font-size: 15px;
  line-height: 25px;
  color: #6a6180;
`;

export const Footer = styled.View`
  background: #fafafc;
  padding: 24px;
  align-items: center;
  margin-top: 24px;
`;

export const Price = styled.Text`
  font-family: Poppins_400Regular;
  color: #6a6180;
  font-size: 14px;
`;

export const PriceValue = styled.Text`
  font-family: Archivo_700Bold;
  color: #8257e5;
  font-size: 16px;
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  margin-top: 16px;
`;

export const ButtonFavorite = styled(RectButton)`
  background: #8257e5;
  width: 56px;
  height: 56px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
`;

export const ButtonFavoriteIcon = styled.Image``;

export const ButtonUnFavorite = styled(RectButton)`
  background: #e33d3d;
  width: 56px;
  height: 56px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
`;

export const ButtonUnFavoriteIcon = styled.Image``;

export const ButtonContact = styled(RectButton)`
  background: #04d361;
  flex: 1;
  flex-direction: row;
  height: 56px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
`;

export const ButtonContactIcon = styled.Image``;

export const ButtonContactText = styled.Text`
  color: #fff;
  font-family: Archivo_700Bold;
  font-size: 16px;
  margin-left: 16px;
`;
