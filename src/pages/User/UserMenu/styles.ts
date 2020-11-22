import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

export const MenuItensContainer = styled.View`
  margin-top: 30px;
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

export const HeaderMenuContainer = styled.View`
  flex-direction: row;
`;

export const Image = styled.Image`
  height: 80px;
  width: 80px;
  border-radius: 80px;
  background: #c5c5c5;
  margin-right: 20px;
`;

export const TextHeaderContainer = styled.View`
  flex-direction: column;
`;

export const HeaderTextLink = styled.Text`
  font-size: 20px;
  color: #d3e2e6;
`;
