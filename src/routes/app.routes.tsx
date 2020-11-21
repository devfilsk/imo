import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Dashboard from '~/pages/Dashboard';
import PropertiesRoutes from './properties.routes';
import HomeRoutes from './home.routes';
import UserRoutes from './user.routes';
import SignUp from '~/pages/Auth/SignUp';

import {createStackNavigator} from '@react-navigation/stack';
import {AppProvider} from '~/contexts/app';

// import { createStackNavigator } from '@react-navigation/stack';

// const AppStack = createStackNavigator();
const AppStack = createStackNavigator();

function AppRoutes() {
  const [logged, setLogged] = useState(false);

  return (
    <AppProvider>
      <AppStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <AppStack.Screen name="Dashboard" component={HomeRoutes} />

        <AppStack.Screen name="PropertiesRoutes" component={PropertiesRoutes} />

        <AppStack.Screen name="UserRoutes" component={UserRoutes} />
      </AppStack.Navigator>
    </AppProvider>
  );
}

export default AppRoutes;
