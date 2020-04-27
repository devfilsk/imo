import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MainProperties from '~/pages/Propertie/Main';
import NewPropertie from '~/pages/Propertie/NewPropertie';
import PicturePropertie from '~/pages/Propertie/PicturePropertie';
import DetailsPropertie from '~/pages/Propertie/DetailsPropertie';

const PropertieStack = createStackNavigator();

const PropertiesRoutes: React.FC = () => {
    return (
        <PropertieStack.Navigator initialRouteName="MainProperties"
            screenOptions={{
                title: '',
                headerStyle: {
                    backgroundColor: 'rgba(255,255,255, 0)',
                    elevation: 0
                },
                headerTintColor: '#668',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <PropertieStack.Screen name="MainProperties" component={MainProperties} />
            <PropertieStack.Screen name="DetailsPropertie" component={DetailsPropertie} />
            <PropertieStack.Screen name="PicturePropertie" component={PicturePropertie} />
            <PropertieStack.Screen name="NewPropertie" component={NewPropertie}/>
        </PropertieStack.Navigator>
    );
}

export default PropertiesRoutes;