import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

export const Header = styled.View`
  width: 100%;
  position: absolute;
  top: 0px;
`;

export const Title = styled.Text`
    font-size: 30px;
    color: #444;
    margin-top: 90px;
    font-weight: bold;
`;
export const Description = styled.Text`
    font-size: 16px;
    color: #737380;
`;
export const PropertyList = styled.FlatList`
    margin-top: 16px;
`;
export const Property = styled.View`
    padding: 24px;
    border-radius: 4px;
    background: #FFF;
    margin-top: 16px;
`;
export const PropertyTitle = styled.Text`
    font-size: 16px;
    color: #737380;
`;
export const PropertyDescription = styled.Text`
    font-size: 16px;
    color: #737380;
`;
export const PropertyMetters = styled.Text`
    font-size: 16px;
    color: #737380;
`;
export const PropertyValue = styled.Text`
    font-size: 16px;
    color: #737380;
`;

export const PropertyButton = styled.TouchableOpacity`
  flex-direction: row;
  margin-top: 20px;
  justify-content: space-between; 
`;

export const PropertyButtonText = styled.Text`
  font-size: 15;
  color: #e02041;
  font-weight: bold;
`;
