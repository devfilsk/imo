import React from 'react';
import { View } from 'react-native';

import { useApp } from '~/contexts/app';

import { Container, Title } from './styles';

export default function ListScreen() {

  const { properties } = useApp();

  return (
    <Container>
        <Title>Lista de imóveis</Title>
    </Container>
  );
}
