import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Search from '~/components/Maps/Search';
import Icon from 'react-native-vector-icons/AntDesign';

import {useApp} from '~/contexts/app';

import {
  Container,
  Header,
  Title,
  Description,
  PropertyList,
  Property,
  PropertyTitle,
  PropertyDescription,
  PropertyMetters,
  PropertyValue,
  PropertyButton,
  PropertyButtonText,
} from './styles';

interface Propertie {
  title: string;
  description: string;
  sale_price: number;
  latitude: number;
  longitude: number;
  images: Array<{
    id: number;
    url: string;
  }>;
}

export default function ListScreen({handleSearch}) {
  const navigation = useNavigation();

  const {properties} = useApp();

  function handleNavigateToPropertie(id: number) {
    navigation.navigate('PropertiesRoutes', {
      screen: 'DetailsPropertie',
      params: {id},
    });
  }

  return (
    <>
      <Header>
        <Search onLocationSelected={handleSearch} />
      </Header>

      <Container>
        <Title>Imóveis Disponíveis</Title>
        <Description>Busque facilmente pelo imóvel que deseja</Description>

        <PropertyList
          data={properties}
          showsVerticalScrollIndicator={false}
          keyExtractor={(property: any) => String(property.id)}
          renderItem={({item: property}) => (
            <Property>
              <PropertyTitle>{property.title}</PropertyTitle>
              <PropertyDescription>
                Casa com 3 quartos, bem localizada, 2 banheiros, 1 suíte. Com
                garagem para 3 carros.
              </PropertyDescription>

              <PropertyMetters></PropertyMetters>
              <PropertyValue>R$ 150.000,00</PropertyValue>

              <PropertyButton
                onPress={() => handleNavigateToPropertie(property.id)}>
                <PropertyButtonText>Ver Imóvel</PropertyButtonText>
                <Icon name="arrowright" size={26} color="#667" />
              </PropertyButton>
            </Property>
          )}
        />
      </Container>
    </>
  );
}
