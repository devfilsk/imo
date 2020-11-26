import React, {useState} from 'react';
import {Alert, Image} from 'react-native';

import {useApp} from '~/contexts/app';

import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

import markerImage from '~/assets/mapsicons/marker.png';

import {Container, AnnotationContainer, AnnotationText} from './styles';

export default function Maps({
  isNewProperty = false,
  customRegion = null,
  getCustomerRegion = () => {},
}) {
  const {
    currentPosition,
    properties,
    handleSetPropertie,
    customerPosition,
    handleSetCustomerPosition,
  } = useApp();

  function handleSelectedPropertie(event) {
    // selected propertie or null
    handleSetPropertie(event);

    // Set customer position to map centered to the
    let {latitude, longitude} = event.nativeEvent.coordinate;
    let data = {
      ...customerPosition,
      latitude,
      longitude,
    };

    handleSetCustomerPosition({...customerPosition, latitude, longitude});
  }

  function renderProperties() {
    return (
      properties &&
      properties.map((p) => (
        <Marker
          key={p.id}
          coordinate={{
            latitude: parseFloat(p.latitude),
            longitude: parseFloat(p.longitude),
          }}
          style={{width: 30, height: 32}}
          anchor={{x: 0, y: 1}}
          image={markerImage}
          centerOffset={{x: -18, y: -60}}
          onPress={handleSelectedPropertie}
          identifier={p.id.toString()}
          // id={p.id}
        >
          {/* <Marker 
                    coordinate={{ latitude: parseFloat(p.latitude), longitude: parseFloat(p.longitude) }}
                    anchor={{ x: 0, y: 0 }}
                    // image={markerImage}
                />
                <AnnotationContainer>
                    <AnnotationText>{p.title}</AnnotationText>
                </AnnotationContainer> */}
          {/* <Image source={markerImage} style={{height: 28, width: 28 }} /> */}
        </Marker>
      ))
    );
  }

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={{flex: 1, position: 'relative'}}
      loadingEnabled
      showsUserLocation
      region={customerPosition ? customerPosition : currentPosition}
      // initialRegion={currentPosition}
      onRegionChangeComplete={handleSetCustomerPosition}>
      {/* {customerPosition && (
          <Marker
            coordinate={{
              latitude: customerPosition.latitude,
              longitude: customerPosition.longitude,
            }}
            // draggable
            // onDragEnd={ (e) => {
            //   console.log("Event", e.nativeEvent)
            // } }
            anchor={{x: 0, y: 1}}
            // image={markerImage}
            centerOffset={{x: -18, y: -60}}></Marker>
        )} */}

      {renderProperties()}
    </MapView>
  );
}
