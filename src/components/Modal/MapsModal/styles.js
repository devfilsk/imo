import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

export const Container = styled.View`
  /* flex: 1; */
`;

export const HeaderContainer = styled.View`
    width: 100%;
    height: 150px;
    background: #FFF;
    position: absolute;
    top: 0;
    left: 0;
    padding: 20px;
    z-index: 5;
`;

export const ImageMarker = styled.Image`
  width: 50px;
  height: 50px;
  position: absolute;
  align-self: center;
  top: ${(Dimensions.get('window').height / 2) - 60};
`;

export const TextHeader = styled.Text`
    font-size: 25px;
    color: #333;
    margin-top: 10px;
`;

export const NextButton = styled.TouchableOpacity`
    padding: 10px 20px;
    background: #6558f5;
    width: auto;
    position: absolute;
    bottom: 20px;
    right: 20px;
    border-radius: 4px;
`;

export const NextButtonText = styled.Text`
    font-size: 20px;
    color: #FFF;
    font-weight: bold;
`;