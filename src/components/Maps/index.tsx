import React, {useState} from 'react';
import {Alert, Animated, StyleSheet} from 'react-native';

import {useApp} from '~/contexts/app';

import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

import markerImage from '~/assets/mapsicons/marker.png';

import {Container, AnnotationContainer, AnnotationText} from './styles';

export default Maps = React.forwardRef(
  ({interpolations, onMarkerPress}, ref) => {
    const {
      currentPosition,
      properties,
      handleSetPropertie,
      customerPosition,
      handleSetCustomerPosition,
    } = useApp();

    function handleSelectedPropertie(event) {
      // selected propertie or null
      onMarkerPress(event);
      // handleSetPropertie(event);

      // // Set customer position to map centered to the
      // let {latitude, longitude} = event.nativeEvent.coordinate;
      // let data = {
      //   ...customerPosition,
      //   latitude,
      //   longitude,
      // };

      // handleSetCustomerPosition({...customerPosition, latitude, longitude});
    }

    function renderProperties() {
      return (
        properties &&
        properties.map((p, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          };
          return (
            <Marker
              key={index}
              coordinate={{
                latitude: parseFloat(p.latitude),
                longitude: parseFloat(p.longitude),
              }}
              // style={{width: 30, height: 32}}
              anchor={{x: 0, y: 1}}
              // image={markerImage}
              centerOffset={{x: -18, y: -60}}
              onPress={handleSelectedPropertie}
              identifier={p.id.toString()}
              // id={p.id}
            >
              <Animated.View style={[styles.markerWrap]}>
                <Animated.Image
                  source={markerImage}
                  style={[styles.marker, scaleStyle]}
                  resizeMode="cover"
                />
              </Animated.View>
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
          );
        })
      );
    }

    return (
      <MapView
        ref={ref}
        provider={PROVIDER_GOOGLE}
        style={{flex: 1, position: 'relative'}}
        loadingEnabled
        showsUserLocation
        // region={customerPosition ? customerPosition : currentPosition}
        region={customerPosition}
        // initialRegion={currentPosition}
        // onRegionChangeComplete={handleSetCustomerPosition}
      >
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
  },
);

const styles = StyleSheet.create({
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
});
