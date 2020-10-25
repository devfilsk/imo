import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

export const MenuIten = styled.TouchableOpacity`
  height: 50px;
  flex-direction: row;
  justify-content: space-between;
  border-bottom-width: 0.8px;
  border-bottom-color: #d3e2e6;
  align-items: center;
`;

export const MenuItenText = styled.Text`
  font-size: 16px;
`;
