import React, {useEffect, useState} from 'react';
import {Platform, View, Text} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
// import PlacesInput from 'react-native-places-input';

import {useApp} from '~/contexts/app';

// import { Container } from './styles';

export default function Search({onLocationSelected, isMapsField = true}) {
  const {
    currentLocation,
    customerPosition,
    handleSetCustomerPosition,
  } = useApp();

  const [searchFocused, setSearchFocused] = useState(false);
  const [styles, setStyles] = useState({});

  useEffect(() => {
    isMapsField
      ? setStyles({
          container: {
            flex: 1,
            padding: 0,
          },
          textInputContainer: {
            flex: 1,
            backgroundColor: 'transparent',
            height: 45,
            borderTopWidth: 0,
            borderBottomWidth: 0,

            //   position: 'absolute',
            //   top: Platform.select({ios: 60, android: 40}),
            //   width: '100%',
            // },
            // textInputContainer: {
            //   flex: 1,
            //   backgroundColor: 'transparent',
            //   height: 54,
            //   marginHorizontal: 20,
            //   borderTopWidth: 0,
            //   borderBottomWidth: 0,
            // },
            // textInput: {
            //   height: 54,
            //   margin: 0,
            //   borderRadius: 0,
            //   paddingTop: 0,
            //   paddingBottom: 0,
            //   paddingLeft: 20,
            //   paddingRight: 20,
            //   marginTop: 0,
            //   marginLeft: 0,
            //   marginRight: 0,
            //   elevation: 5,
            //   shadowColor: '#000',
            //   shadowOpacity: 0.1,
            //   shadowOffset: {x: 0, y: 0},
            //   shadowRadius: 15,
            //   borderWidth: 1,
            //   borderColor: '#DDD',
            //   fontSize: 18,
            // },
            // listView: {
            //   borderWidth: 1,
            //   borderColor: '#DDD',
            //   backgroundColor: '#FFF',
            //   marginHorizontal: 20,
            //   elevation: 5,
            //   shadowColor: '#000',
            //   shadowOpacity: 0.1,
            //   shadowOffset: {x: 0, y: 0},
            //   shadowRadius: 15,
            //   marginTop: 10,
            // },
            // description: {
            //   fontSize: 16,
            // },
            // row: {
            //   padding: 20,
            //   height: 58,
          },
        })
      : setStyles({
          container: {
            // position: "absolute",
            // top: Platform.select({ ios: 60, android: 30 }),
            width: '100%',
          },
          textInputContainer: {
            flex: 1,
            backgroundColor: 'transparent',
            height: 54,
            borderTopWidth: 0,
            borderBottomWidth: 0,
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 0,
            paddingRight: 0,
            marginRight: 0,
            marginLeft: 0,
          },
          textInput: {
            height: 60,
            // margin: 0,
            borderBottomWidth: 1,
            borderColor: '#DDD',
            // paddingTop: 0,
            // paddingBottom: 5,
            paddingLeft: 20,
            paddingRight: 20,
            // marginTop: 0,
            // // marginLeft: 20,
            // // marginRight: 20,
            // elevation: 5,
            // shadowColor: "#000",
            // shadowOpacity: 0.1,
            // shadowOffset: { x: 0, y: 0 },
            shadowRadius: 15,
            // // borderWidth: 1,
            // borderColor: "#DDD",
            fontSize: 16,
          },
          listView: {
            // borderWidth: 1,
            borderColor: '#DDD',
            backgroundColor: '#FFF',
            elevation: 5,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowOffset: {x: 0, y: 0},
            shadowRadius: 15,
            marginTop: 5,
          },
          description: {
            fontSize: 16,
          },
          row: {
            padding: 20,
            height: 58,
          },
        });
  }, []);

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
      {/* <PlacesInput 
            googleApiKey="AIzaSyClu896XcykZGa7KYW1BJOIMKPnH1FGpaU"
            onSelect={place => console.log(place)}
            placeholder="Para onde?"
            language='pt'
            stylesContainer={{
                position: "absolute",
                top: Platform.select({ ios: 60, android: 40 }),
                width: "100%",
                paddingLeft: 0
            }}
            stylesInput={{
                flex: 1,
                // backgroundColor: "transparent",
                height: 54,
                marginHorizontal: 20,
                borderTopWidth: 0,
                borderBottomWidth: 0
            }}
        /> */}

      <GooglePlacesAutocomplete
        placeholder="Onde deseja estar?"
        placeholderTextColor="#333"
        // renderRow={(rowData) => {
        //   const title = rowData.structured_formatting.main_text;
        //   const address = rowData.structured_formatting.secondary_text;
        //   return (
        //     <View style>
        //       <Text style={{fontSize: 14}}>{title}</Text>
        //       <Text style={{fontSize: 14}}>{address}</Text>
        //     </View>
        //   );
        // }}
        // currentLocation={true}
        // currentLocationLabel="Localização Atual"
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
    </>
  );
}
