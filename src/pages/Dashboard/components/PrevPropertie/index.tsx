import React from 'react';

import {useNavigation} from '@react-navigation/native';

import {useApp} from '~/contexts/app';

import Icon from 'react-native-vector-icons/AntDesign';

import {
  Container,
  TypeTitle,
  TypeDesciption,
  TypeDesciptionLabel,
  CloseIcon,
  RequestButton,
  RequestButtonText,
} from './styles';

export default function PrevPropertie() {
  const {handleSetPropertie, propertie} = useApp();

  const navigation = useNavigation();

  function closeModal() {
    handleSetPropertie(null);
  }

  function navigateToPropertieDetail() {
    navigation.navigate('PropertiesRoutes', {
      screen: 'DetailsPropertie',
      params: {id: propertie?.id},
    });
  }

  return (
    <Container>
      <CloseIcon onPress={closeModal}>
        <Icon name="close" size={30} color={'#444'} />
      </CloseIcon>
      <TypeTitle>{propertie?.title}</TypeTitle>
      <TypeDesciption numberOfLines={3}>
        <TypeDesciptionLabel>Descrição: </TypeDesciptionLabel>
        {propertie.description}
      </TypeDesciption>
      <TypeDesciption>
        <TypeDesciptionLabel>Endereço: </TypeDesciptionLabel>
        {propertie?.address}
      </TypeDesciption>
      {/* <TypeImage
            source={uberx}
        /> */}
      <TypeDesciption>
        {propertie?.images.length} imagens disponíveis
      </TypeDesciption>
      {/* <TypeTitle>R$ 6,00</TypeTitle> */}
      <RequestButton onPress={navigateToPropertieDetail}>
        <RequestButtonText>VER MAIS DETALHES</RequestButtonText>
      </RequestButton>
    </Container>
  );
}
