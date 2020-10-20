import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

import Dashboard from '~/pages/Dashboard';
import PropertiesRoutes from './properties.routes';
import Profile from '~/pages/Profile';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {AppProvider} from '~/contexts/app';
// import { createStackNavigator } from '@react-navigation/stack';

// const AppStack = createStackNavigator();
const AppBottomNav = createMaterialBottomTabNavigator();

function AppRoutes() {
  const [logged, setLogged] = useState(false);

  return (
    <AppProvider>
      <AppBottomNav.Navigator barStyle={{backgroundColor: '#FFF'}}>
        <AppBottomNav.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            tabBarLabel: 'Buscar',
            tabBarIcon: ({color}) => (
              <Icon name="search1" color={color} size={26} />
            ),
          }}
        />
        <AppBottomNav.Screen
          name="PropertiesRoutes"
          component={PropertiesRoutes}
          options={{
            tabBarLabel: 'Imóveis',
            tabBarIcon: ({color}) => (
              <Icon name="home" color={color} size={26} />
            ),
          }}
        />
        {logged && (
          <AppBottomNav.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarLabel: 'Perfil',
              tabBarIcon: ({color}) => (
                <Icon name="user" color={color} size={26} />
              ),
            }}
          />
        )}
      </AppBottomNav.Navigator>
    </AppProvider>
  );
}

export default AppRoutes;
