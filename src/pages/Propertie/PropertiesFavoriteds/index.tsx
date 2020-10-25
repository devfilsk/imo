import React from 'react';
import {View} from 'react-native';

import {Container} from './styles';

import {Title} from '~/components/Elements/Texts';
import SignIn from '~/pages/Auth/SignIn';

import {useAuth} from '~/contexts/auth';

const PropertiesFavoriteds: React.FC = () => {
  const {signed} = useAuth();

  // if (!signed) {
  //   return <SignIn />;
  // }

  return (
    <View>
      <Title>Seus imóveis favoritos</Title>
    </View>
  );
};

export default PropertiesFavoriteds;
