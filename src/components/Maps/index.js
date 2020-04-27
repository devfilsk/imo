import React, { useEffect, useState } from 'react';
import { Alert, Image } from 'react-native';

import { useApp } from '~/contexts/app';

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import markerImage from '~/assets/marker.png';

import { Container, AnnotationContainer, AnnotationText } from './styles';

export default function Maps({ isNewProperty = false, customRegion=null, getCustomerRegion = () => {} }) {

  const { currentPosition, properties } = useApp();

  function renderProperties() {
      return properties.map(p => (
        
          <Marker 
            key={p.id}
            coordinate={{ latitude: parseFloat(p.latitude), longitude: parseFloat(p.longitude) }}
            anchor={{ x: 0, y: 1 }}
            image={markerImage}
            centerOffset={{ x: -18, y: -60 }}
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
  }

  return (
    <>
        <MapView
            provider={PROVIDER_GOOGLE}
            style={{ flex: 1, position: "relative" }}
            loadingEnabled
            showsUserLocation
            region={ customRegion ? customRegion : currentPosition }
            onRegionChangeComplete={getCustomerRegion}
        >
          {
            customRegion && (
              <Marker 
                coordinate={{ latitude: customRegion.latitude, longitude: customRegion.longitude }}
                // draggable
                // onDragEnd={ (e) => {
                //   console.log("Event", e.nativeEvent)
                // } }
                anchor={{ x: 0, y: 1 }}
                // image={markerImage}
                centerOffset={{ x: -18, y: -60 }}
              >
              </Marker>
            )
          }
        
            { renderProperties() }
        </MapView>
        {/* { customRegion && <ImageMarker source={markerImage}/> } */}

    </>
  );
}
