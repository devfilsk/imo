import React from 'react';
import {useNavigation} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/AntDesign';

import {Container, Title, BlankSpace} from './styles';
import {RectButton} from 'react-native-gesture-handler';

interface HeaderProps {
  title: string;
  showCancel?: boolean;
  showBack?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showCancel = true,
  showBack = true,
}) => {
  const navigation = useNavigation();
  function backToHomePage() {
    navigation.navigate('Dashboard');
  }

  return (
    <Container>
      {showBack ? (
        <RectButton onPress={navigation.goBack}>
          <Icon name={'arrowleft'} size={24} color="#667" />
        </RectButton>
      ) : (
        <BlankSpace />
      )}

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
