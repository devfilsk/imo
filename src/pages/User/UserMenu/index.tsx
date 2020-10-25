import React from 'react';

import {useNavigation} from '@react-navigation/native';

import {Title, Text} from '~/components/Elements/Texts';

import {
  PrimaryButtonContainer,
  PrimaryButtonText,
} from '~/components/Elements/Buttons';

import {Container, MenuIten, MenuItenText} from './styles';

import {useAuth} from '~/contexts/auth';

import UserNotAuthenticatedBox from '~/pages/User/UserNotAuthenticatedBox';

const UserMenu: React.FC = () => {
  const navigation = useNavigation();
  const {signed, signOut} = useAuth();

  function handleNavigationCreatePropertie() {
    navigation.navigate('PropertiesRoutes', {screen: 'SelectMapPosition'});
  }
  if (!signed) {
    return (
      <Container>
        <Title>Seu Perfil</Title>
        <UserNotAuthenticatedBox />
      </Container>
    );
  }

  return (
    <Container>
      <Title>Seu Perfil</Title>

      <MenuIten onPress={handleNavigationCreatePropertie}>
        <MenuItenText>Cadastrar imóvel</MenuItenText>
      </MenuIten>

      <PrimaryButtonContainer
        style={{position: 'absolute', bottom: 20, left: 24, right: 24}}
        onPress={signOut}>
        <PrimaryButtonText>Sair do app</PrimaryButtonText>
      </PrimaryButtonContainer>
    </Container>
  );
};

export default UserMenu;
