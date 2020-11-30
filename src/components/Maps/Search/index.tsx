import React, {useEffect, useState} from 'react';
import {Platform, Text, TouchableOpacity} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
// import PlacesInput from 'react-native-places-input';

import {useApp} from '~/contexts/app';

import {SearchContainer, ScrollView, OptionItem} from './styles';

export default function Search({onLocationSelected, isMapsField = true}) {
  const {
    currentLocation,
    customerPosition,
    handleSetCustomerPosition,
  } = useApp();

  const [searchFocused, setSearchFocused] = useState(false);
  const [styles, setStyles] = useState({});

  const categories = [
    {
      name: 'Lista',
      icon: (
        <Feather
          name={'list'}
          size={18}
          style={{
            marginRight: 5,
          }}
        />
      ),
      action: () => {},
    },
    {
      name: 'Filtrar',
      icon: (
        <MaterialIcons
          name="filter-list"
          style={{
            marginRight: 5,
          }}
          size={18}
        />
      ),
      action: () => {},
    },
    // {
    //   name: 'Dineouts',
    //   icon: (
    //     <Ionicons name="md-restaurant" style={styles.chipsIcon} size={18} />
    //   ),
    // },
    // {
    //   name: 'Snacks Corner',
    //   icon: (
    //     <MaterialCommunityIcons
    //       name="food"
    //       style={styles.chipsIcon}
    //       size={18}
    //     />
    //   ),
    // },
    // {
    //   name: 'Hotel',
    //   icon: <Fontisto name="hotel" style={styles.chipsIcon} size={15} />,
    // },
  ];

  useEffect(() => {}, [customerPosition]);

  function handleLocationSelected(data, {geometry}) {
    const {
      location: {lat: latitude, lng: longitude},
    } = geometry;
    // const {lat: latitude, lng: longitude} = geometry.viewport.northeast;
    // setNewPropertyRegion({
    //     latitude,
    //     longitude,
    //     title: data.structured_formatting.main_text
    // })

    let newPosition = {
      // ...currentLocation,
      latitude,
      longitude,
      latitudeDelta: 0.00922,
      longitudeDelta: 0.00421,
    };

    handleSetCustomerPosition(newPosition);
  }

  return (
    <>
      <SearchContainer>
        <GooglePlacesAutocomplete
          placeholder="Onde deseja estar?"
          placeholderTextColor="#333"
          filterReverseGeocodingByTypes={[
            'locality',
            'administrative_area_level_3',
          ]}
          onPress={(data, details) => {
            // console.log(data, details)
            handleLocationSelected(data, details);
          }}
          query={{
            key: 'AIzaSyAWhNuaOwLRvormxx8EtPp9i47ZJhgPXA8',
            language: 'pt',
          }}
          listViewDisplayed="auto"
          textInputProps={{
            onFocus: () => {
              setSearchFocused(true);
            }, // Seta variável para mostrar ou não a lista da busca
            onBlur: () => {
              setSearchFocused(false);
            }, // Seta variável para mostrar ou não a lista da busca
            autoCapitalize: 'none',
            autoCorrect: false,
          }}
          fetchDetails
          enablePoweredByContainer={false}
          styles={styles}
        />
        <Ionicons name="ios-search" size={24} />
      </SearchContainer>
      <ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        height={50}
        // style={styles.chipsScrollView}
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
          <OptionItem key={index} onPress={category.action}>
            {category.icon}
            <Text>{category.name}</Text>
          </OptionItem>
        ))}
      </ScrollView>
    </>
  );
}
