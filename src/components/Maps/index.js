import React, { useEffect, useState } from 'react';
import { Alert, Image } from 'react-native';

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

import api from '~/services/api';

import markerImage from '~/assets/marker.png';

import { Container, AnnotationContainer, AnnotationText } from './styles';

export default function Maps({ isNewProperty = false, customRegion=null, getCustomerRegion = () => {} }) {

    const [ properties, setProperties ] = useState([]);
    const [ region, setRegion ] = useState(null);

  useEffect(() => {
    console.log("API KEY", PROVIDER_GOOGLE)
    async function handleCurrentPosition() {
      Geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude }}) => { // success
          
          setRegion({ // get location
            latitude, 
            longitude, 
            latitudeDelta: 0.0143,
            longitudeDelta: 0.0134
          })

        },
        (error) => { // error
          console.log("ERROR --> ", error)
        },
        {
            timeout: 2000, // 2 segundos tentando pegar a localização do usuário
            enableHighAccuracy: true, // pega localização pelo GPS e não pelo wifi
            maximumAge: 1000,
        }
      )
    }

    handleCurrentPosition();

  }, [])

  
  useEffect(() => { // cicle to get properties
    async function getPropertioes() {
      console.log("REGION: ", region)

      const response = await api.get(`properties?latitude=${region.latitude}&longitude=${region.longitude}`);
      
      if(response.status === 200) {
        setProperties(response.data);        
      }else{
        Alert.alert("Não foi possível carregar as propriedades no mapa")
      }
      console.log("PRoperties: ", response.data)

    }

    getPropertioes();

  }, [region]);

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
            region={ customRegion ? customRegion : region }
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
