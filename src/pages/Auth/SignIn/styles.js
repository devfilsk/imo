import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  background-color: #f5f5f5;
  padding: 20px;
`;

export const Logo = styled.Image`
  height: 30%;
  margin-bottom: 40px;
`;

export const Input = styled.TextInput`
  padding: 15px 20px;
  border-radius: 5px;
  background-color: #fff;
  align-self: stretch;
  margin-bottom: 15px;
  font-size: 16px;
`;

export const ErrorMessage = styled.Text`
  text-align: center;
  color: #ce2029;
  font-size: 16px;
  margin-bottom: 15px;
  margin: 0 20px;
`;

export const Button = styled.TouchableHighlight`
  padding: 20px;
  border-radius: 5px;
  background-color: #fc6663;
  align-self: stretch;
  margin-top: 15px;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
`;

export const SignUpLink = styled.TouchableHighlight`
  padding: 10px;
  margin-top: 20px;
`;

export const SignUpLinkText = styled.Text`
  color: #999;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
`;
