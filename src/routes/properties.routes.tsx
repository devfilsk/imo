import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import MainProperties from '~/pages/Propertie/Main';
import Header from '~/pages/components/Header';
import NewPropertie from '~/pages/Propertie/NewPropertie';
import MyProperties from '~/pages/Propertie/MyProperties';
import PicturePropertie from '~/pages/Propertie/PicturePropertie';
import DetailsPropertie from '~/pages/Propertie/DetailsPropertie';
import SelectMapPosition from '~/pages/Propertie/NewPropertie/SelectMapPosition';
import DataPropertieForm from '~/pages/Propertie/NewPropertie/DataPropertieForm';
import PropertiesFavoriteds from '~/pages/Propertie/PropertiesFavoriteds';

const PropertieStack = createStackNavigator();

const PropertiesRoutes: React.FC = () => {
  return (
    <PropertieStack.Navigator
      initialRouteName="PropertiesFavoriteds"
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: '#f2f3f5'},
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
        name="SelectMapPosition"
        component={SelectMapPosition}
        options={{
          headerShown: true,
          header: () => <Header title="Localização do Imóvel" />,
        }}
      />
      <PropertieStack.Screen
        name="PropertiesFavoriteds"
        component={PropertiesFavoriteds}
        options={{
          headerShown: true,
          header: () => <Header title="Imóveis curtidos" />,
        }}
      />
      <PropertieStack.Screen
        name="MyProperties"
        component={MyProperties}
        options={{
          headerShown: true,
          header: () => <Header title="Meus Imóveis" />,
        }}
      />
      <PropertieStack.Screen name="MainProperties" component={MainProperties} />

      <PropertieStack.Screen
        name="DetailsPropertie"
        component={DetailsPropertie}
        options={{
          headerShown: true,
          header: () => <Header title="Dados do Imóvel" />,
        }}
      />
      {/* <PropertieStack.Screen
        name="PicturePropertie"
        component={PicturePropertie}
      /> */}
      <PropertieStack.Screen
        name="NewPropertie"
        component={NewPropertie}
        options={{
          headerShown: true,
          header: () => <Header title="Cadastrar Imóvel" />,
        }}
      />

      <PropertieStack.Screen
        name="DataPropertieForm"
        component={DataPropertieForm}
        options={{
          headerShown: true,
          header: () => <Header title="Dados do Imóvel" />,
        }}
      />
    </PropertieStack.Navigator>
  );
};

export default PropertiesRoutes;
