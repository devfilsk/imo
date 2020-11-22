import React, {useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import GallerySwiper from 'react-native-gallery-swiper';
import {useForm, Controller} from 'react-hook-form';
import {useNavigation, useRoute, StackActions} from '@react-navigation/native';

import {
  UploadedImagesContainer,
  UploadedImages,
  SmallAlertText,
} from './styles';
import {
  ScrollView,
  View,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {RectButton} from 'react-native-gesture-handler';
import api from '~/services/api';

import {useApp} from '~/contexts/app';

export default function DataPropertieForm() {
  const route = useRoute();
  const navigation = useNavigation();

  const {currencyFromat} = useApp();

  const {position} = route.params;

  const {control, handleSubmit, errors, watch} = useForm({
    defaultValues: {
      title: '',
      description: '',
      address: '',
      price: '',
    },
  });

  const [galery, setGalery] = useState(false);
  const [imagesGalery, setImagesGalery] = useState([]);

  const [sent, setSent] = useState(false);
  const [sale, setSale] = useState(false);

  const [images, setImages] = useState<string[]>([]);

  function selectPhotoFromGalery() {
    ImagePicker.openPicker({
      // width: 400,
      // height: 300,
      // cropping: true,
      multiple: true,
    })
      .then((img) => {
        let array = [];
        img.map((image) => {
          array = [...array, image.path];
        });

        setImages([...images, ...array]);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function prepareImagesGalery() {
    let img = [];
    images.map((image, i) => {
      img.push({uri: image, id: i});
    });
    setImagesGalery(img);
    toggle();
  }

  function toggle() {
    setGalery(!galery);
  }

  async function createPropertie(data: Object) {
    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append('images', {
        name: `image_${index}.jpg`,
        type: 'image/jpeg',
        uri: image,
      } as any);
    });

    // const response = await api.post('properties', {title: 'titulo'});
    const response = await api
      .post('properties', {
        ...data,
        latitude: position.latitude,
        longitude: position.longitude,
      })
      .then((res) => res)
      .then(async (res: any) => {
        if (res.status === 201) {
          await api.post(`properties/${res.data.id}/images`, formData);

          navigation.dispatch(StackActions.popToTop());
          navigation.navigate('DetailsPropertie', {id: res.data.id});
        }
      })
      .catch((e) => {
        console.log('=====>', e);
      });
    console.log('---------->', response);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{padding: 24}}>
      <Text style={styles.title}>Dados</Text>

      {/* <Text style={styles.label}>Nome</Text> */}

      <Controller
        control={control}
        name="title"
        defaultValue=""
        rules={{
          required: 'Digite o título do imóvel!',
          minLength: {
            value: 6,
            message: 'Pelo menos 6 caracteres são obrigatórios!',
          },
        }}
        render={({onChange, onBlur, value}) => (
          <TextInput
            style={styles.input}
            placeholder="Dê um nome ao imóvel"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
      />
      {errors.title && <SmallAlertText>{errors.title?.message}</SmallAlertText>}
      {/* <TextInput placeholder="Dê um nome ao imóvel" style={styles.input} /> */}

      <Controller
        control={control}
        name="description"
        defaultValue=""
        rules={{
          required: 'Uma descrição é obrigatória!',
          minLength: {
            value: 20,
            message: 'A descrição deve conter pelo menos 20 caracteres',
          },
        }}
        render={({onChange, onBlur, value}) => (
          <TextInput
            style={[styles.input, {height: 110}]}
            placeholder="Descrição do imóvel"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            multiline
          />
        )}
      />
      {errors.description && (
        <SmallAlertText>{errors.description?.message}</SmallAlertText>
      )}

      <Controller
        control={control}
        name="address"
        defaultValue=""
        rules={{
          required: 'Digite o endereço do imóvel!',
        }}
        render={({onChange, onBlur, value}) => (
          <TextInput
            style={styles.input}
            placeholder="Endereço"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
      />
      {errors.address && (
        <SmallAlertText>{errors.address?.message}</SmallAlertText>
      )}

      <Controller
        control={control}
        name="sale_price"
        defaultValue=""
        rules={{
          required: 'O valor de venda é obrigatório!',
        }}
        render={({onChange, onBlur, value}) => (
          <TextInput
            style={styles.input}
            placeholder="Preço"
            keyboardType="numeric"
            onBlur={onBlur}
            onChangeText={(value) => {
              console.log(currencyFromat(value));
              return onChange(currencyFromat(value));
            }}
            value={value}
          />
        )}
      />
      {errors.price && <SmallAlertText>{errors.price?.message}</SmallAlertText>}

      <Text style={styles.label}>Fotos</Text>

      {galery && (
        <GallerySwiper
          images={imagesGalery}
          initialNumToRender={images.length}
          immediate={true}
          initialPage={0}
          style={{background: '#FFF'}}
          // Version *1.15.0 update
          // onEndReached={() => {
          //     // add more images when scroll reaches end
          // }}
        />
      )}

      {/* <Galery isOpen={galery} toggle images index={0} /> */}

      <UploadedImagesContainer>
        {images.map((image) => {
          return (
            <TouchableOpacity onPress={prepareImagesGalery}>
              <UploadedImages key={image} source={{uri: image}} />
            </TouchableOpacity>
          );
        })}
      </UploadedImagesContainer>

      <TouchableOpacity
        style={styles.imagesInput}
        onPress={selectPhotoFromGalery}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </TouchableOpacity>

      <Text style={styles.title}>Disponível para</Text>

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Valor de venda: </Text>
        {/* <Switch
          thumbColor="#fff"
          trackColor={{false: '#ccc', true: '#39CC83'}}
          value={sale}
          onValueChange={(value) => setSale(value)}
        /> */}
        <Controller
          control={control}
          name="sale_price"
          defaultValue=""
          rules={{
            required: 'O valor de venda é obrigatório!',
          }}
          render={({onChange, onBlur, value}) => (
            <TextInput
              style={{...styles.input, width: '50%'}}
              placeholder="R$ 0,00"
              keyboardType="numeric"
              onBlur={onBlur}
              onChangeText={(value) => {
                console.log(currencyFromat(value));
                return onChange(currencyFromat(value));
              }}
              value={value}
              // underlineColorAndroid="transparent"
              // editable={false}
            />
          )}
        />
        {errors.price && (
          <SmallAlertText>{errors.price?.message}</SmallAlertText>
        )}
      </View>
      <View style={styles.switchContainer}>
        <Text style={styles.label}>Valor do aluguel:</Text>
        {/* <Switch
          thumbColor="#fff"
          trackColor={{false: '#ccc', true: '#39CC83'}}
          value={sent}
          onValueChange={(value) => setSent(value)}
        /> */}
        <Controller
          control={control}
          name="sale_price"
          defaultValue=""
          rules={{
            required: 'O valor de venda é obrigatório!',
          }}
          render={({onChange, onBlur, value}) => (
            <TextInput
              style={{...styles.input, width: '50%'}}
              placeholder="R$ 0,00"
              keyboardType="numeric"
              onBlur={onBlur}
              onChangeText={(value) => {
                console.log(currencyFromat(value));
                return onChange(currencyFromat(value));
              }}
              value={value}
              // underlineColorAndroid="transparent"
              // editable={false}
            />
          )}
        />
        {errors.price && (
          <SmallAlertText>{errors.price?.message}</SmallAlertText>
        )}
      </View>
      {/* <View style={styles.switchContainer}>
        <Text style={styles.label}>Temporada</Text>
        <Switch
          thumbColor="#fff"
          trackColor={{false: '#ccc', true: '#39CC83'}}
        />
      </View> */}

      <RectButton
        style={styles.nextButton}
        onPress={handleSubmit(createPropertie)}>
        <Text style={styles.nextButtonText}>Cadastrar</Text>
      </RectButton>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    color: '#5c8599',
    fontSize: 24,
    fontFamily: 'Nunito_700Bold',
    marginBottom: 24,
    paddingBottom: 24,
    borderBottomWidth: 0.8,
    borderBottomColor: '#D3E2E6',
  },

  label: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_600SemiBold',
    marginTop: 8,
  },

  comment: {
    fontSize: 11,
    color: '#8fa7b3',
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderColor: '#d3e2e6',
    borderRadius: 10,
    height: 54,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginTop: 16,
    textAlignVertical: 'top',
  },

  imagesInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
    borderColor: '#96D2F0',
    borderWidth: 1.4,
    borderRadius: 10,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  nextButton: {
    backgroundColor: '#6D7BF3',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  },
});
