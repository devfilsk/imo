import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {RectButton} from 'react-native-gesture-handler';
import MapView, {Marker, MapEvent} from 'react-native-maps';

import {useApp} from '~/contexts/app';

import mapMarkerImg from '~/assets/mapsicons/marker.png';

import Search from '~/components/Maps/Search';

export default function SelectMapPosition() {
  const {
    customerPosition,
    currentPosition,
    handleSetCustomerPosition,
  } = useApp();
  const [position, setPosition] = useState({latitude: 0, longitude: 0});

  const navigation = useNavigation();

  // useEffect(() => {
  //   console.log('---->', customerPosition);
  //   // setPosition(customerPosition);
  // }, [customerPosition]);
  function handleNextStep() {
    navigation.navigate('DataPropertieForm', {position});
  }

  function handleSelectMapPosition(event: MapEvent) {
    setPosition(event.nativeEvent.coordinate);
  }

  function handleLocationSelected(data, {geometry}) {
    const {
      location: {lat: latitude, lng: longitude},
    } = geometry;

    let newPosition = {
      ...customerPosition,
      latitude,
      longitude,
    };
    setPosition(newPosition);
    handleSetCustomerPosition(newPosition);
  }

  console.log('=======>', customerPosition);

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          ...currentPosition,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        style={styles.mapStyle}
        onPress={handleSelectMapPosition}>
        {position.latitude !== 0 && (
          <Marker
            icon={mapMarkerImg}
            coordinate={{
              latitude: position.latitude,
              longitude: position.longitude,
            }}
          />
        )}
      </MapView>
      <Search onLocationSelected={handleLocationSelected} />
      {position.latitude !== 0 && (
        <RectButton style={styles.nextButton} onPress={handleNextStep}>
          <Text style={styles.nextButtonText}>Próximo</Text>
        </RectButton>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },

  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  nextButton: {
    backgroundColor: '#6D7BF3',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,

    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 40,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  },
});
