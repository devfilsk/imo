import React, {useEffect, useState} from 'react';
import {
  Image,
  View,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  Linking,
  TouchableWithoutFeedback,
} from 'react-native';

import {ActionsContainer, ContainerBlank} from './styles';
import MapView, {Marker, LatLng} from 'react-native-maps';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {useAuth} from '~/contexts/auth';

import {useRoute} from '@react-navigation/native';

import mapMarkerImg from '~/assets/mapsicons/marker.png';
import {RectButton, TouchableOpacity} from 'react-native-gesture-handler';
import api from '~/services/api';

interface Propertie {
  title: string;
  description: string;
  sale_price: number;
  latitude: number;
  longitude: number;
  images: Array<{
    id: number;
    url: string;
  }>;
  favorite: Object;
  user_id: number;
}

interface PropertieDetailsRouteParams {
  id: number;
}

export default function DetailsPropertie() {
  const route = useRoute();

  const params = route.params as PropertieDetailsRouteParams;

  const {user} = useAuth();

  const [propertie, setPropertie] = useState<Propertie>();
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    getPropertie();
  }, [params.id]);

  useEffect(() => {
    if (propertie?.favorite) {
      setFavorited(true);
    }
  }, [propertie]);

  if (!propertie) {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>Carregando...</Text>
      </View>
    );
  }

  async function getPropertie() {
    const response = await api.get(`properties/auth/${params.id}`);
    console.log(response.data);
    if (response.status === 200) {
      setPropertie(response.data);
    }
  }

  function handleOpenGoogleMaps() {
    Linking.openURL(
      `https://www.google.com/maps/dir/?api=1&destination=${propertie?.latitude},${propertie?.longitude}`,
    );
  }

  function handleOpenWhastapp() {
    Linking.canOpenURL('whatsapp://send?text=oi').then((supported) => {
      if (supported) {
        return Linking.openURL('whatsapp://send?phone=5562985027057&text=Oi');
      } else {
        return Linking.openURL(
          'https://api.whatsapp.com/send?phone=5562985027057&text=Oi',
        );
      }
    });
  }

  async function toggleFavorite() {
    if (!favorited) {
      await api.post('favorite', {property_id: params.id});
    } else {
      await api.delete(`favorite/${params.id}`);
    }
    setFavorited(!favorited);
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imagesContainer}>
        <ScrollView horizontal pagingEnabled>
          {propertie.images.map((image, index) => {
            return (
              <Image
                key={index}
                style={styles.image}
                source={{
                  uri: image.url,
                }}
                resizeMode="cover"
                resizeMethod="resize"
              />
            );
          })}
        </ScrollView>
      </View>

      <ActionsContainer>
        <ContainerBlank />
        {user?.id !== propertie.user_id ? (
          <TouchableWithoutFeedback onPress={toggleFavorite}>
            <AntDesign
              name={favorited ? 'heart' : 'hearto'}
              size={28}
              color={favorited ? '#e02041' : '#e02041'}
            />
          </TouchableWithoutFeedback>
        ) : (
          <ContainerBlank />
        )}
      </ActionsContainer>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{propertie?.title}</Text>
        <Text style={styles.description}>{propertie.description}</Text>
        <Text style={styles.price}>Preço de venda: {propertie.sale_price}</Text>

        <View style={styles.mapContainer}>
          <MapView
            initialRegion={{
              latitude: propertie.latitude,
              longitude: propertie.longitude,
              latitudeDelta: 0.008,
              longitudeDelta: 0.008,
            }}
            zoomEnabled={false}
            pitchEnabled={false}
            scrollEnabled={false}
            rotateEnabled={false}
            style={styles.mapStyle}>
            <Marker
              icon={mapMarkerImg}
              coordinate={{
                latitude: propertie.latitude,
                longitude: propertie.longitude,
              }}
            />
          </MapView>

          <TouchableOpacity
            style={styles.routesContainer}
            onPress={handleOpenGoogleMaps}>
            <Text style={styles.routesText}>Ver rotas no Google Maps</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.separator} />

        {/* <Text style={styles.title}>Instruções para visita</Text>
        <Text style={styles.description}>
          Venha como se sentir a vontade e traga muito amor e paciência para
          dar.
        </Text> */}

        <View style={styles.scheduleContainer}>
          <View style={[styles.scheduleItem, styles.scheduleItemBlue]}>
            <Feather name="clock" size={40} color="#2AB5D1" />
            <Text style={[styles.scheduleText, styles.scheduleTextBlue]}>
              Segunda à Sexta 8h às 18h
            </Text>
          </View>
          {/* <View style={[styles.scheduleItem, styles.scheduleItemGreen]}>
            <Feather name="info" size={40} color="#39CC83" />
            <Text style={[styles.scheduleText, styles.scheduleTextGreen]}>
              Atendemos fim de semana
            </Text>
          </View> */}
        </View>

        <RectButton style={styles.contactButton} onPress={handleOpenWhastapp}>
          <FontAwesome name="whatsapp" size={24} color="#FFF" />
          <Text style={styles.contactButtonText}>Entrar em contato</Text>
        </RectButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imagesContainer: {
    height: 240,
    width: '100%',
  },

  image: {
    width: Dimensions.get('window').width,
    height: 260,
    resizeMode: 'contain',
  },

  detailsContainer: {
    padding: 24,
  },

  title: {
    color: '#4D6F80',
    fontSize: 30,
    fontFamily: 'Nunito_700Bold',
  },

  description: {
    fontFamily: 'Nunito_600SemiBold',
    color: '#5c8599',
    lineHeight: 24,
    marginTop: 16,
  },

  price: {
    fontFamily: 'Nunito_700Bold',
    color: '#5c8599',
    lineHeight: 24,
    marginTop: 16,
  },

  mapContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1.2,
    borderColor: '#B3DAE2',
    marginTop: 40,
    backgroundColor: '#E6F7FB',
  },

  mapStyle: {
    width: '100%',
    height: 150,
  },

  routesContainer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  routesText: {
    fontFamily: 'Nunito_700Bold',
    color: '#0089a5',
  },

  separator: {
    height: 0.8,
    width: '100%',
    backgroundColor: '#D3E2E6',
    marginVertical: 40,
  },

  scheduleContainer: {
    // marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  scheduleItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    padding: 20,
  },

  scheduleItemBlue: {
    backgroundColor: '#E6F7FB',
    borderWidth: 1,
    borderColor: '#B3DAE2',
    borderRadius: 10,
  },

  scheduleItemGreen: {
    backgroundColor: '#EDFFF6',
    borderWidth: 1,
    borderColor: '#A1E9C5',
    borderRadius: 10,
  },

  scheduleText: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 16,
    lineHeight: 24,
    marginLeft: 20,
  },

  scheduleTextBlue: {
    color: '#5C8599',
  },

  scheduleTextGreen: {
    color: '#37C77F',
  },

  contactButton: {
    backgroundColor: '#3CDC8C',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 40,
  },

  contactButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    color: '#FFF',
    fontSize: 16,
    marginLeft: 16,
  },
});
