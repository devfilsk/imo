import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

import { Container, CloseIcon } from './styles';

export default function CloseModal({ closeModal }) {
  return (
    <Container>
      <CloseIcon onPress={closeModal}>
        <Icon name="close" size={30} color="#333" />
      </CloseIcon>
    </Container>
  );
}
