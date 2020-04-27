import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

/** Camera */
export const ModalContainer = styled.View`
  flex: 1;
  background-color: #FFF;
`;

export const ModalImagesListContainer = styled.View`
    position: absolute;
    bottom: 50px;
    width: 100%;
    left: 0;
`;

export const ModalImagesList = styled.ScrollView`
  padding: 20px 0;
  /* padding-top: 20px; */
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
  flex: 1;
  background-color: #FFF;
  padding: 20px;
`;

export const ContainerLinkButton = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const LinkButton = styled.TouchableHighlight`
  padding: 10px 20px;
  margin-top: 20px;
`;

export const LinkButtonText = styled.Text`
  color: #333;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
`;
