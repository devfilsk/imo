import React from 'react';

import {useNavigation} from '@react-navigation/native';

import {Title, SimpleTitle, Text} from '~/components/Elements/Texts';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

import {
  PrimaryButtonContainer,
  PrimaryButtonText,
} from '~/components/Elements/Buttons';

import {
  Container,
  MenuItensContainer,
  MenuIten,
  MenuItenText,
  HeaderMenuContainer,
  TextHeaderContainer,
  Image,
  HeaderTextLink,
} from './styles';

import {useAuth} from '~/contexts/auth';

import UserNotAuthenticatedBox from '~/pages/User/UserNotAuthenticatedBox';
import Dashboard from '~/pages/Dashboard';
import {RectButton, BaseButton} from 'react-native-gesture-handler';

const UserMenu: React.FC = () => {
  const navigation = useNavigation();
  const {signed, signOut, user} = useAuth();

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
  console.log(user);
  return (
    <Container>
      <HeaderMenuContainer>
        <Image></Image>
        <TextHeaderContainer>
          <SimpleTitle>{user.username}</SimpleTitle>
          <BaseButton>
            <HeaderTextLink>Ver Perfil</HeaderTextLink>
          </BaseButton>
        </TextHeaderContainer>
      </HeaderMenuContainer>
      <MenuItensContainer>
        <MenuIten onPress={handleNavigationMyProperties}>
          <MenuItenText>Seus imóveis </MenuItenText>
          <AntDesign name="home" size={24} />
        </MenuIten>
        <MenuIten onPress={handleNavigationCreatePropertie}>
          <MenuItenText>Cadastrar imóvel </MenuItenText>
          <Entypo name="plus" size={24} />
        </MenuIten>
      </MenuItensContainer>

      <PrimaryButtonContainer
        style={{position: 'absolute', bottom: 20, left: 24, right: 24}}
        onPress={signOut}>
        <PrimaryButtonText>Sair do app</PrimaryButtonText>
      </PrimaryButtonContainer>
    </Container>
  );
};

export default UserMenu;
