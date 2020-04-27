import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Fontisto';

import { useApp } from '~/contexts/app';

import Search from '~/components/Maps/Search';

import { Container, NewButtonContainer, ButtonText, FloatButton } from './styles';

import Maps from '~/components/Maps'
import ListScreen from './components/ListScreen';
import PrevPropertie from './components/PrevPropertie';

export default function Dashboard ({ navigation }) {

  const { propertie } = useApp();

  const [ newPropertyRegion, setNewPropertyRegion ] = useState(null);
  const [ isNewProperty, setIsNewProperty ] = useState<boolean>(false);
  const [ isMaps, setIsMaps ] = useState<boolean>(true);

  function handleLocationSelected( data, { geometry }) {
    const { location: { lat: latitude, lng: longitude } } = geometry;
    setNewPropertyRegion({
        latitude,
        longitude,
        title: data.structured_formatting.main_text
    })
  
  }

  function getNewPropertyLocale() {
    navigation.navigate("NewPropertie")
  }

  function changeVisualization() {
    setIsMaps(!isMaps);
  }

  return (
      <>
        { isMaps ? 
          (
            <Container>
              <Maps isNewProperty={isNewProperty} customRegion={newPropertyRegion}/>

              <Search 
                onLocationSelected={handleLocationSelected}
              />

            </Container>
          ): (
            <ListScreen />
          )}
        
        <FloatButton onPress={changeVisualization}>
          {/* <ButtonText>Novo Imóvel</ButtonText> */}
          <Icon name={`${ isMaps ? "nav-icon-list-a" : "map" }`} size={30} color="#667" />
        </FloatButton>
        { 
          propertie && <PrevPropertie />
        }
      </>
  )
}
// latitude: -16.678040,
// longitude: -49.249980,
// latitudeDelta: 0.00922,
// longitudeDelta: 0.00421
