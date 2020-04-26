import React, { useState } from 'react';

import Search from '~/components/Maps/Search';

import { Container, NewButtonContainer, ButtonText } from './styles';

import Maps from '~/components/Maps'

export default function Dashboard ({ navigation }) {

  const [ newPropertyRegion, setNewPropertyRegion ] = useState(null);
  const [ isNewProperty, setIsNewProperty ] = useState(false);

  function handleLocationSelected( data, { geometry }) {
    const { location: { lat: latitude, lng: longitude } } = geometry;
    setNewPropertyRegion({
        latitude,
        longitude,
        title: data.structured_formatting.main_text
    })
    // setRegion({
    //     ...region,
    //     latitude,
    //     longitude,
    // })
  }

  function getNewPropertyLocale() {
    navigation.navigate("NewPropertie")
  }

  return (
      <Container>
       <Maps isNewProperty={isNewProperty} customRegion={newPropertyRegion}/>

       <Search 
          onLocationSelected={handleLocationSelected}
        />

       <NewButtonContainer onPress={getNewPropertyLocale}>
        <ButtonText>Novo Imóvel</ButtonText>
      </NewButtonContainer>
      </Container>
  )
}
// latitude: -16.678040,
// longitude: -49.249980,
// latitudeDelta: 0.00922,
// longitudeDelta: 0.00421
