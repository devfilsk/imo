import React, { createContext, useEffect, useState, useContext } from 'react';
import { Alert } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

import api from '~/services/api';

interface AppContextData {
    propertie: PropertieData | null;
    handleSetPropertie(event: object | null): void;
    properties: [] | null;
    currentPosition: PositionData | null;
    customerPosition: PositionData | null;
    handleSetCustomerPosition(position: PositionData | null) : void;
}

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

const AppContext = createContext<AppContextData>({} as AppContextData)

export const AppProvider: React.FC = ({ children }) => {

    const [ propertie, setPropertie ] = useState<PropertieData | null>(null);
    const [ properties, setProperties ] = useState<[] | null>([]);
    const [ currentPosition, setCurrentPosition ] = useState<PositionData | null>(null);
    const [ customerPosition, setCustomerPosition ] = useState<PositionData | null>(null);

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
          const response = await api.get(`properties?latitude=${customerPosition?.latitude}&longitude=${customerPosition?.longitude}`);
          if(response.status === 200) {
            setProperties(response.data);        
          }else{
            Alert.alert("Não foi possível carregar as propriedades no mapa")
          }
    
        }
    
        getPropertioes();
    
    }, [customerPosition]); // Só é chamado quando o curentPosition é alterado

    function handleSetPropertie(event: any | null) {
      if(event) {
        // find propertie on properties array and get the clicked one
        const { id } =  event.nativeEvent;
        let prop = properties && properties.filter((v: any) => v.id === parseInt(id) );
        if(prop.length) {
          setPropertie(prop[0]);
        }

      }else{
        setPropertie(null);
      }
    }

    function handleSetCustomerPosition(position: PositionData | null) {
      setCustomerPosition(position)
    }

    return (
        <AppContext.Provider 
          value={{ 
            propertie, 
            handleSetPropertie, 
            properties, 
            currentPosition, 
            customerPosition, 
            handleSetCustomerPosition 
          }}>
            { children }
        </AppContext.Provider>
    )
}

export function useApp() {
    const context = useContext(AppContext);
    return context;
}