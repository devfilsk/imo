import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

import {
  StyleSheet,
  ScrollView,
  Platform,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useApp} from '~/contexts/app';

import Search from '~/components/Maps/Search';

import {
  Container,
  SearchContainer,
  NewButtonContainer,
  ButtonText,
  FloatButton,
} from './styles';

import Maps from '~/components/Maps';
import ListScreen from './components/ListScreen';
import PrevPropertie from './components/PrevPropertie';

export default function Dashboard({navigation}) {
  const {propertie, customerPosition, handleSetCustomerPosition} = useApp();

  const [newPropertyRegion, setNewPropertyRegion] = useState(null);
  const [isNewProperty, setIsNewProperty] = useState<boolean>(false);
  const [isMaps, setIsMaps] = useState<boolean>(true);

  function handleLocationSelected(data, {geometry}) {
    const {
      location: {lat: latitude, lng: longitude},
    } = geometry;

    let newPosition = {
      ...customerPosition,
      latitude,
      longitude,
    };

    console.log('PEGOU', newPosition);
    handleSetCustomerPosition(newPosition);
  }

  function getNewPropertyLocale() {
    navigation.navigate('NewPropertie');
  }

  function changeVisualization() {
    setIsMaps(!isMaps);
  }

  const categories = [
    {
      name: 'Fastfood Center',
      icon: (
        <MaterialCommunityIcons
          style={styles.chipsIcon}
          name="food-fork-drink"
          size={18}
        />
      ),
    },
    {
      name: 'Restaurant',
      icon: (
        <Ionicons name="ios-restaurant" style={styles.chipsIcon} size={18} />
      ),
    },
    {
      name: 'Dineouts',
      icon: (
        <Ionicons name="md-restaurant" style={styles.chipsIcon} size={18} />
      ),
    },
    {
      name: 'Snacks Corner',
      icon: (
        <MaterialCommunityIcons
          name="food"
          style={styles.chipsIcon}
          size={18}
        />
      ),
    },
    {
      name: 'Hotel',
      icon: <Fontisto name="hotel" style={styles.chipsIcon} size={15} />,
    },
  ];

  return (
    <>
      {isMaps ? (
        <Container>
          <Maps
            isNewProperty={isNewProperty}
            customRegion={newPropertyRegion}
          />
          <SearchContainer>
            <Search onLocationSelected={handleLocationSelected} />
            <Ionicons name="ios-search" size={24} />
          </SearchContainer>
          {/* <ScrollView
            horizontal
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
            height={50}
            style={styles.chipsScrollView}
            contentInset={{
              // iOS only
              top: 0,
              left: 0,
              bottom: 0,
              right: 20,
            }}
            contentContainerStyle={{
              paddingRight: Platform.OS === 'android' ? 20 : 0,
            }}>
            {categories.map((category, index) => (
              <TouchableOpacity key={index} style={styles.chipsItem}>
                {category.icon}
                <Text>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView> */}
        </Container>
      ) : (
        <ListScreen handleSearch={handleLocationSelected} />
      )}

      <FloatButton onPress={changeVisualization}>
        {/* <ButtonText>Novo Imóvel</ButtonText> */}
        <Icon
          name={`${isMaps ? 'nav-icon-list-a' : 'map'}`}
          size={26}
          color="#667"
        />
      </FloatButton>
      {propertie && <PrevPropertie />}
    </>
  );
}

const styles = StyleSheet.create({
  chipsScrollView: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 90 : 90,
    paddingHorizontal: 10,
  },
  chipsItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 35,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  chipsIcon: {
    marginRight: 5,
  },
});
// latitude: -16.678040,
// longitude: -49.249980,
// latitudeDelta: 0.00922,
// longitudeDelta: 0.00421
