import React from 'react';
import {useNavigation} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/AntDesign';
import Search from '~/components/Maps/Search';

import {Container, Title, BlankSpace} from './styles';
import {RectButton} from 'react-native-gesture-handler';

interface HeaderProps {
  //   title: string;
  showCancel?: boolean;
  showBack?: boolean;
}

const SearchHeader: React.FC<HeaderProps> = ({
  //   title,
  showCancel = true,
  showBack = true,
}) => {
  const navigation = useNavigation();
  function backToHomePage() {
    navigation.navigate('Dashboard');
  }

  function handleLocationSelected(data, {geometry}) {
    // const {
    //   location: {lat: latitude, lng: longitude},
    // } = geometry;
    // // setNewPropertyRegion({
    // //     latitude,
    // //     longitude,
    // //     title: data.structured_formatting.main_text
    // // })
    // let newPosition = {
    //   ...customerPosition,
    //   latitude,
    //   longitude,
    // };
    // console.log('PEGOU', newPosition);
    // handleSetCustomerPosition(newPosition);
  }

  return (
    <Container>
      <Search onLocationSelected={handleLocationSelected} />
    </Container>
  );
};

export default SearchHeader;
