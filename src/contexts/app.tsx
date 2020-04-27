import React, { createContext, useEffect, useState, useContext } from 'react';
import Geolocation from 'react-native-geolocation-service';

import api from '~/services/api';

interface PositionData {
    latitude: number | null;
    longitude: number | null;
    latitudeDelta: number | null;
    longitudeDelta: number | null;
}

interface AppContextData {
    properties: {} | null;
    currentPosition: {} | null;
}

const AppContext = createContext<AppContextData>({} as AppContextData)

export const AppProvider: React.FC = ({ children }) => {

    const [ properties, setProperties ] = useState(null);
    const [ currentPosition, setCurrentPosition ] = useState<PositionData | null>(null);


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


    useEffect(() => { // cicle to get properties
        async function getPropertioes() {
          console.log("currentPosition: ", currentPosition)
    
          const response = await api.get(`properties?latitude=${currentPosition?.latitude}&longitude=${currentPosition?.longitude}`);
          
          if(response.status === 200) {
            setProperties(response.data);        
          }else{
            // Alert.alert("Não foi possível carregar as propriedades no mapa")
          }
          console.log("PRoperties: ", response.data)
    
        }
    
        getPropertioes();
    
      }, [currentPosition]);

    return (
        <AppContext.Provider value={{ properties, currentPosition }}>
            { children }
        </AppContext.Provider>
    )
}

export function useApp() {
    const context = useContext(AppContext);
    return context;
}