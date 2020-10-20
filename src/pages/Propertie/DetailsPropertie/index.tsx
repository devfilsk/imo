import React from 'react';

import { Container, Title, ContainerProperty, CardHeader, CardHeaderText } from './styles';

export default function DetailsPropertie() {
  return (
    <Container>
      <Title>Imóvel Selecionado</Title>
      <ContainerProperty>
        <CardHeader>
          <CardHeaderText>Nome do imóvel</CardHeaderText>
          <CardHeaderText>Nome do imóvel</CardHeaderText>
        </CardHeader>
      </ContainerProperty>
      
    </Container>
  );
}
