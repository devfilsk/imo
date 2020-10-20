import React from 'react';
import {useNavigation} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/AntDesign';

import {Container, Title, BlankSpace} from './styles';
import {RectButton} from 'react-native-gesture-handler';

interface HeaderProps {
  title: string;
  showCancel?: boolean;
}

const Header: React.FC<HeaderProps> = ({title, showCancel = true}) => {
  const navigation = useNavigation();
  function backToHomePage() {
    navigation.navigate('Dashboard');
  }

  return (
    <Container>
      <RectButton onPress={navigation.goBack}>
        <Icon name={'arrowleft'} size={24} color="#667" />
      </RectButton>

      <Title>{title}</Title>

      {showCancel ? (
        <RectButton onPress={backToHomePage}>
          <Icon name="close" size={24} color="#667" />
        </RectButton>
      ) : (
        <BlankSpace />
      )}
    </Container>
  );
};

export default Header;
