import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Dashboard from '~/pages/Dashboard';
import PropertiesRoutes from './properties.routes';
import UserRoutes from './user.routes';
import SignUp from '~/pages/Auth/SignUp';

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
            tabBarLabel: 'Favoritos',
            tabBarIcon: ({color}) => (
              <Icon name="heart" color={color} size={24} />
            ),
          }}
        />

        <AppBottomNav.Screen
          name="UserRoutes"
          component={UserRoutes}
          options={{
            tabBarLabel: 'Perfil',
            tabBarIcon: ({color}) => (
              <Icon name="user" color={color} size={26} />
            ),
          }}
        />
      </AppBottomNav.Navigator>
    </AppProvider>
  );
}

export default AppRoutes;
