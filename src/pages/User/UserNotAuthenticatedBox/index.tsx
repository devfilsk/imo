import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {Title, Text} from '~/components/Elements/Texts';

import {
  PrimaryButtonContainer,
  PrimaryButtonText,
} from '~/components/Elements/Buttons';

import {Container} from './styles';

const UserNotAuthenticatedBox: React.FC = () => {
  const navigation = useNavigation();

  function handleNavigationToSignIn() {
    navigation.navigate('UserRoutes', {screen: 'SignIn'});
  }

  return (
    <Container>
      <Text>
        Ao acessar sua conta você poderá cadastrar até um imóvel gratuítamente,
        você também poderá salvar os imóveis de seu interesse como favorito.
      </Text>
      <PrimaryButtonContainer onPress={handleNavigationToSignIn}>
        <PrimaryButtonText>Fazer login</PrimaryButtonText>
      </PrimaryButtonContainer>
    </Container>
  );
};

export default UserNotAuthenticatedBox;
