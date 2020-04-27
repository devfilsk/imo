import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

export const Container = styled.View`
  flex: 1;
  margin: 20px;
  justify-content: space-between;
`;

export const FieldsContainer = styled.View`
  /* flex: 1; */
  /* background: #555; */
`;

export const Title = styled.Text`
    font-size: 20px;
    color: #444;
    font-weight: bold;
    margin: 20px 0;
`;

export const Input = styled.TextInput`
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #FFF;
  align-self: stretch;
  margin-top: 10px; 
  /* margin: 0 20px; */
  font-size: 16px;
  /* padding: 15px 20px;
  border-radius: 5px;
  background-color: #FFF;
  align-self: stretch;
  margin-bottom: 15px;
  font-size: 16px; */
`;

export const ButtonNext = styled.TouchableHighlight`
  /* position: absolute;
  bottom: 0;
  right: 0; */
  width: auto;
  border: 1px;
  padding: 10px 30px;
  border-radius: 4px;
  border-bottom-color: #777;
  /* background-color: #6558f5; */
`;

export const ButtonNextText = styled.Text`
  color: #444;
  font-size: 16px;
  text-align: center;
  font-weight: bold;

`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  text-align: center;
  font-weight: bold;
`;

/** Camera */
export const ModalContainer = styled.View`
  flex: 1;
  background-color: #FFF;
`;

export const ModalImageItem = styled.Image`
  height: 100px;
  width: 100px;
  margin-right: 10px;
`;

export const ModalButtons = styled.View`
  padding: 0 10px;
  padding: 5px 0;
  flex-direction: row;
  justify-content: space-between;
`;

export const CameraButtonContainer = styled.TouchableHighlight`
  padding: 20px 0;
  padding: 0 40px;
`;

export const CancelButtonText = styled.Text`
  color: #333;
  font-size: 18px;
  font-weight: bold;
`;

export const ContinueButtonText = styled.Text`
  color: #fc6663;
  font-size: 18px;
  font-weight: bold;
`;

export const TakePictureButtonContainer = styled.TouchableHighlight`
  position: absolute;
  align-self: center;
  top: -70px;
  width: 60px;
  height: 60px;
  background-color: #FFF;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
`;

export const TakePictureButtonLabel = styled.View`
  width: 52px;
  height: 52px;
  border-radius: 26px;
  background-color: #fc6663;
`;

export const ModalAddressContainer = styled.View`
  /* flex: 1; */
  height: auto;
  background-color: #FFF;
  padding: 20px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 5;
`;

export const ImageMarker = styled.Image`
  width: 40px;
  height: 40px;
  position: absolute;
  align-self: center;
  top: ${(Dimensions.get('window').height / 2) - 40};
`;
export const ErrorLabel = styled.Text`
    color: #9E1A1A;
    font-size: 14px;
    padding-left: 5px;
    margin-top: 5px;
`;