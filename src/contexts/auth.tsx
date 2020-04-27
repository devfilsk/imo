import React, { createContext, useState, useEffect, useContext } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { TOKEN, USER } from '~/storage/constants';


// import { useNavigation } from '@react-navigation/native';

import api from '~/services/api';

interface User {
    name: string;
    email: string;
}

interface AuthContextData {
    signed: boolean;
    user: User | null;
    signIn({}): Promise<void>;
    signOut(): void;
    signUp({}): Promise<boolean>;
    loading: boolean;
}
 
const AuthContext = createContext<AuthContextData>({} as AuthContextData );
 
export const AuthProvider: React.FC = ({ children }) => {
    const [ user, setUser ] = useState<User | null>(null);
    const [ loading, setLoading ] = useState(true);
    
    useEffect(() => {
        async function loadStoragedData() {
            const storagedUser = await AsyncStorage.getItem(USER);
            const storagedToken = await AsyncStorage.getItem(TOKEN);

            // await new Promise(resolve => setTimeout(resolve, 1000)) // Rack para aguardar um tempo 

            console.log(storagedUser, storagedToken) 
            if(storagedUser && storagedToken) {
                api.defaults.headers.Authorization = `Bearer ${storagedToken}`

                setUser(JSON.parse(storagedUser));
            }
            setLoading(false);
        }
        loadStoragedData();
    }, [])

    async function signUp(data: object) {
        try{
            const response = await api.post("users", data);

            console.log("RESPONSA", response)

            if(response.status === 201){
                await AsyncStorage.setItem(USER, JSON.stringify(response.data.user));
                await AsyncStorage.setItem(TOKEN, response.data.token);
                Alert.alert("Bem vindo ao Imo!");
                setUser(response.data.user); 
            } else{
                Alert.alert("FALHA NO LOGIN");
            }
        }catch(err) {
            console.log("ERR", err)
        }
    }

    async function signIn(data: object) {
        // const response = await auth.signIn();
        try{
            console.log("YOOOO")
            const response = await api.post('sessions', data);
            console.log("AQUI AGORA", response)
            if(response?.data?.token) {
                await AsyncStorage.setItem(USER, JSON.stringify(response.data.user));
                await AsyncStorage.setItem(TOKEN, response.data.token);
                // await AsyncStorage.setItem(TOKEN, response.data.token);
                setUser(response.data.user); 
            }
            console.log("RESPONSE", response);
          }catch(error) {
            console.log(error.response)
          }

    }

    function signOut() {
        AsyncStorage.clear().then(() => {
            setUser(null);
        })
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut, signUp, loading }}>
            { children }
        </AuthContext.Provider>
    )
};


export function useAuth() {
    const context = useContext(AuthContext);

    return context;
}
