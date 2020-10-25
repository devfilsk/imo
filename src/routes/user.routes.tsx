import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Header from '~/pages/components/Header';

import SignUp from '~/pages/Auth/SignUp';
import SignIn from '~/pages/Auth/SignIn';
import UserProfile from '~/pages/User/UserProfile';
import UserMenu from '~/pages/User/UserMenu';

const PropertieStack = createStackNavigator();

const UserRoutes: React.FC = () => {
  return (
    <PropertieStack.Navigator
      initialRouteName="PropertiesFavoriteds"
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: '#FFF'},
        title: '',
        headerStyle: {
          backgroundColor: 'rgba(255,255,255, 0)',
          elevation: 0,
        },
        headerTintColor: '#668',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <PropertieStack.Screen
        name="UserMenu"
        component={UserMenu}
        // options={{
        //   headerShown: true,
        //   header: () => <Header title="Acessar sua conta" showBack={false} />,
        // }}
      />
      <PropertieStack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          headerShown: true,
          header: () => <Header title="Acessar sua conta" />,
        }}
      />
      <PropertieStack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerShown: true,
          header: () => <Header title="Cadastro de usuário" />,
        }}
      />
      <PropertieStack.Screen name="UserProfile" component={UserProfile} />
    </PropertieStack.Navigator>
  );
};

export default UserRoutes;
