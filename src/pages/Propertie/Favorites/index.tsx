import React, {useEffect, useState} from 'react';

import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';

import {
  Container,
  ContainerCardText,
  Image,
  ScrollView,
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
import api from '~/services/api';

import Propertie from '~/core/interfaces/Propertie';
import {PanResponder} from 'react-native';

const Favorites: React.FC = () => {
  const navigation = useNavigation();
  const [properties, setProperties] = useState<Propertie>([]);

  useFocusEffect(
    React.useCallback(() => {
      getMyProperties();
    }, []),
  );

  async function getMyProperties() {
    const response = await api.get('favorite/properties');

    if (response.status === 200) {
      setProperties(response.data);
    }
  }

  function handleNavigateToPropertie(id: number) {
    navigation.navigate('PropertiesRoutes', {
      screen: 'DetailsPropertie',
      params: {id},
    });
  }

  return (
    <Container>
      <PropertyList
        data={properties}
        showsVerticalScrollIndicator={false}
        keyExtractor={(property: Propertie) => String(property.id)}
        renderItem={({item: property}: {item: Emotion}) => (
          <Property>
            {/* <ScrollView horizontal pagingEnabled> */}
            {/* {property.images.map((image: Object, index: number) => { */}
            {/* console.log(image); return ( */}
            <Image
              key={property.id}
              source={{
                uri: property.images[0].url,
              }}
              resizeMode="contain"
              resizeMethod="resize"
            />
            {/* ); */}
            {/* })} */}
            {/* </ScrollView> */}
            <ContainerCardText>
              <PropertyTitle numberOfLines={1}>{property.title}</PropertyTitle>
              {/* <PropertyDescription numberOfLines={3}>
              {property.description}
            </PropertyDescription> */}

              <PropertyMetters></PropertyMetters>
              <PropertyValue>R$ {property.sale_price}</PropertyValue>

              <PropertyButton
                onPress={() => handleNavigateToPropertie(property.id)}>
                <PropertyButtonText>Ver Imóvel</PropertyButtonText>
                <Icon name="arrowright" size={26} color="#667" />
              </PropertyButton>
            </ContainerCardText>
          </Property>
        )}
      />
    </Container>
  );
};

export default Favorites;
