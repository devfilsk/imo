import React from 'react';

import {useNavigation} from '@react-navigation/native';

import {Title, Text} from '~/components/Elements/Texts';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

import {
  PrimaryButtonContainer,
  PrimaryButtonText,
} from '~/components/Elements/Buttons';

import {Container, MenuIten, MenuItenText} from './styles';

import {useAuth} from '~/contexts/auth';

import UserNotAuthenticatedBox from '~/pages/User/UserNotAuthenticatedBox';
import Dashboard from '~/pages/Dashboard';

const UserMenu: React.FC = () => {
  const navigation = useNavigation();
  const {signed, signOut} = useAuth();

  function handleNavigationCreatePropertie() {
    navigation.navigate('PropertiesRoutes', {screen: 'SelectMapPosition'});
  }

  function handleNavigationMyProperties() {
    navigation.navigate('PropertiesRoutes', {screen: 'MyProperties'});
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

      <MenuIten onPress={handleNavigationMyProperties}>
        <MenuItenText>Seus imóveis </MenuItenText>
        <AntDesign name="home" size={24} />
      </MenuIten>
      <MenuIten onPress={handleNavigationCreatePropertie}>
        <MenuItenText>Cadastrar imóvel </MenuItenText>
        <Entypo name="plus" size={24} />
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
