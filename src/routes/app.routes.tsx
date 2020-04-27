import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

import Dashboard from '~/pages/Dashboard';
import PropertiesRoutes from './properties.routes';
import Profile from '~/pages/Profile';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

// import { createStackNavigator } from '@react-navigation/stack';

// const AppStack = createStackNavigator();
const AppBottomNav = createMaterialBottomTabNavigator();

const AppRoutes: React.FC = () => (
    <AppBottomNav.Navigator 
        barStyle={{ backgroundColor: '#FFF' }}
    >
        <AppBottomNav.Screen name="Dashboard" component={Dashboard}
            options={{
                tabBarLabel: 'Buscar',
                tabBarIcon: ({ color }) => (
                <Icon name="search1" color={color} size={26} />
                ),
            }}
         />
         <AppBottomNav.Screen name="PropertiesRoutes" component={PropertiesRoutes}
            options={{
                tabBarLabel: 'Imóveis',
                tabBarIcon: ({ color }) => (
                <Icon name="home" color={color} size={26} />
                ),
            }}
         />
        <AppBottomNav.Screen name="Profile" component={Profile}  
            options={{
            tabBarLabel: 'Perfil',
            tabBarIcon: ({ color }) => (
                <Icon name="user" color={color} size={26} />
            ),
            }}
        />
    </AppBottomNav.Navigator>
)

export default AppRoutes;
