import React, { createContext, useEffect, useState, useContext } from 'react';
import { Alert } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

import api from '~/services/api';

interface PositionData {
    latitude: number | null;
    longitude: number | null;
    latitudeDelta: number | null;
    longitudeDelta: number | null;
}

interface PropertieData {
  title: string;
  images: [];
  latitude: number;
  longitude: number;
  id: number;
  address: string;
}

interface AppContextData {
    propertie: PropertieData | null;
    getPropertie(event: object | null): void;
    properties: [] | null;
    currentPosition: {} | null;
}

const AppContext = createContext<AppContextData>({} as AppContextData)

export const AppProvider: React.FC = ({ children }) => {

    const [ propertie, setPropertie ] = useState<PropertieData | null>(null);
    const [ properties, setProperties ] = useState<[] | null>([]);
    const [ currentPosition, setCurrentPosition ] = useState<PositionData | null>(null);

    // Pega a posição atual
    useEffect(() => {
        
        async function handleCurrentPosition() {
          Geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude }}) => { // success
              
              setCurrentPosition({ // get location
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

    // Pega todos os imóveis no raio da localização atual
    useEffect(() => { // cicle to get properties
        async function getPropertioes() {    
          const response = await api.get(`properties?latitude=${currentPosition?.latitude}&longitude=${currentPosition?.longitude}`);
          
          if(response.status === 200) {
            setProperties(response.data);        
          }else{
            Alert.alert("Não foi possível carregar as propriedades no mapa")
          }
    
        }
    
        getPropertioes();
    
    }, [currentPosition]); // Só é chamado quando o curentPosition é alterado

    function getPropertie(event: any | null) {
      if(event) {
        const { id } =  event.nativeEvent;
        let prop = properties && properties.filter((v: any) => v.id === parseInt(id) );
        if(prop.length) {
          setPropertie(prop[0]);
        }
        console.log("SELECTED PROPERTIE: ", propertie);
      }else{
        setPropertie(null);
      }
    }

    return (
        <AppContext.Provider value={{ propertie, getPropertie, properties, currentPosition }}>
            { children }
        </AppContext.Provider>
    )
}

export function useApp() {
    const context = useContext(AppContext);
    return context;
}