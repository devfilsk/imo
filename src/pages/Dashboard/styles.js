import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Text = styled.Text`
    
`;



export const NewButtonContainer = styled.TouchableHighlight`
  position: absolute;
  bottom: 54px;
  left: 20px;
  right: 20px;
  align-self: center;
  border-radius: 5px;
  padding: 10px 20px;
  background-color: #6558f5;
`;

export const ButtonsWrapper = styled.View`
  position: absolute;
  bottom: 54;
  left: 20;
  right: 20;
`;

export const CancelButtonContainer = styled.TouchableHighlight`
  align-self: stretch;
  border-radius: 5px;
  padding: 0 20px;
  background-color: #555;
  margin-top: 20px;
`;

export const SelectButtonContainer = styled.TouchableHighlight`
  align-self: stretch;
  border-radius: 5px;
  padding: 0 20px;
  background-color: #fc6663;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  text-align: center;
  font-weight: bold;
`;