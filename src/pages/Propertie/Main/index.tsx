import React from 'react';

import { Container, Title, ButtonLarger, ButtonLargerText } from './styles';

export default function MainProperties({ navigation }) {
  return (
    <Container>
        <Title>Seus Imóveis</Title>

        <ButtonLarger onPress={() => navigation.navigate("NewPropertie")}>
          <ButtonLargerText>Cadastrar Imóvel</ButtonLargerText>
        </ButtonLarger>
    </Container>
  );
}
