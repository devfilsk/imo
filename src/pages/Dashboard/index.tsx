import React, {useEffect, useState} from 'react';

import {useNavigation, useFocusEffect} from '@react-navigation/native';

import {
  StyleSheet,
  ScrollView,
  Platform,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  Animated,
  Image,
  Dimensions,
} from 'react-native';
import {useApp} from '~/contexts/app';

const {width, height} = Dimensions.get('window');
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

import Search from '~/components/Maps/Search';

import {Container, NewButtonContainer, ButtonText, FloatButton} from './styles';

import Maps from '~/components/Maps';
import ListScreen from './components/ListScreen';
import PrevPropertie from './components/PrevPropertie';

export default function Dashboard() {
  const navigation = useNavigation();

  const {
    propertie,
    getPropertioes,
    properties,
    customerPosition,
    currentPosition,
    handleSetCustomerPosition,
  } = useApp();

  const [newPropertyRegion, setNewPropertyRegion] = useState(null);
  const [isNewProperty, setIsNewProperty] = useState<boolean>(false);
  const [isMaps, setIsMaps] = useState<boolean>(true);

  // region: {
  //   latitude: 22.62938671242907,
  //   longitude: 88.4354486029795,
  //   latitudeDelta: 0.04864195044303443,
  //   longitudeDelta: 0.040142817690068,
  // },

  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  useFocusEffect(
    React.useCallback(() => {
      getPropertioes();
    }, []),
  );

  useEffect(() => {
    properties;
  }, [properties]);

  useEffect(() => {
    animateToItem();
  });

  function animateToItem() {
    mapAnimation.addListener(({value}) => {
      console.log('map index ====: ', mapIndex);
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= properties.length) {
        index = properties.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const {latitude, longitude} = properties[index];

          _map.current.animateToRegion(
            {
              latitude,
              longitude,
              latitudeDelta: customerPosition.latitudeDelta,
              longitudeDelta: customerPosition.longitudeDelta,
            },
            350,
          );
        }
      }, 10);
    });
  }

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

  const interpolations = properties?.map((marker, index) => {
    console.log('INDEX ---> ', index);
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: 'clamp',
    });

    return {scale};
  });

  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;

    let x = markerID * CARD_WIDTH + markerID * 20;
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({x: x, y: 0, animated: true});
  };

  function navigateToPropertieDetail(id: number) {
    navigation.navigate('PropertiesRoutes', {
      screen: 'DetailsPropertie',
      params: {id: id},
    });
  }
  console.log('=-=-=-=-=-=->', properties);
  return (
    <>
      {isMaps ? (
        <Container>
          <Maps
            isNewProperty={isNewProperty}
            customRegion={newPropertyRegion}
            ref={_map}
            interpolations={interpolations}
            onMarkerPress={onMarkerPress}
          />

          <Search onLocationSelected={handleLocationSelected} />

          <Animated.ScrollView
            ref={_scrollView}
            horizontal
            pagingEnabled
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH + 20}
            snapToAlignment="center"
            style={styles.scrollView}
            contentInset={{
              top: 0,
              left: SPACING_FOR_CARD_INSET,
              bottom: 0,
              right: SPACING_FOR_CARD_INSET,
            }}
            contentContainerStyle={{
              paddingHorizontal:
                Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0,
            }}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      x: mapAnimation,
                    },
                  },
                },
              ],
              {useNativeDriver: true},
            )}>
            {properties &&
              properties?.map((marker, index) => (
                <View style={styles.card} key={index}>
                  <Image
                    source={{uri: marker.images[0].url}}
                    style={styles.cardImage}
                    resizeMode="cover"
                  />
                  <View style={styles.textContent}>
                    <Text numberOfLines={1} style={styles.cardtitle}>
                      {marker.title}
                    </Text>
                    {/* <StarRating
                    ratings={marker.rating}
                    reviews={marker.reviews}
                  /> */}
                    <Text numberOfLines={1} style={styles.cardDescription}>
                      {marker.description}
                    </Text>
                    <View style={styles.button}>
                      <TouchableOpacity
                        onPress={() => navigateToPropertieDetail(marker.id)}
                        style={[
                          styles.signIn,
                          {
                            borderColor: '#FF6347',
                            borderWidth: 1,
                          },
                        ]}>
                        <Text
                          style={[
                            styles.textSign,
                            {
                              color: '#FF6347',
                            },
                          ]}>
                          Ver Detalhes
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
          </Animated.ScrollView>
        </Container>
      ) : (
        <ListScreen handleSearch={handleLocationSelected} />
      )}

      {/* <FloatButton onPress={changeVisualization}> */}
      {/* <ButtonText>Novo Imóvel</ButtonText> */}
      {/* <Icon
          name={`${isMaps ? 'nav-icon-list-a' : 'map'}`}
          size={26}
          color="#667"
        /> */}
      {/* </FloatButton> */}
      {/* {propertie && <PrevPropertie />} */}
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: {x: 2, y: -2},
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: 'hidden',
  },
  cardImage: {
    flex: 3,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 12,
    color: '#444',
  },
  signIn: {
    width: '100%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
  textSign: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
// latitude: -16.678040,
// longitude: -49.249980,
// latitudeDelta: 0.00922,
// longitudeDelta: 0.00421
