import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

export const Title = styled.Text`
  font-size: 25px;
  font-weight: bold;
  align-self: center;
`;

export const ButtonSignOut = styled.TouchableOpacity`
    width: 100%;
    position: absolute;
    bottom: 20px;
    left: 20px;
    border-radius: 4px;
    border: 1px solid #666;
`;

export const ButtonSignOutText = styled.Text`
    font-size: 16px;
    padding: 10px 0;
    align-self: center;
`;
