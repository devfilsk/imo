import React, {useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import GallerySwiper from 'react-native-gallery-swiper';
import {UploadedImagesContainer, UploadedImages} from './styles';
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

export default function DataPropertieForm() {
  const [galery, setGalery] = useState(false);
  const [imagesGalery, setImagesGalery] = useState([]);

  const [images, setImages] = useState<string[]>([]);

  function selectPhotoFromGalery() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      console.log(image);
      setImages([...images, image.path]);
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

  async function createPropertie() {
    const data = new FormData();

    images.forEach((image, index) => {
      data.append('images', {
        name: `image_${index}`,
        type: 'image/jpeg',
        uri: image,
      } as any);
    });

    // const response = await api.post('properties', {title: 'titulo'});
    const response = await api
      .post('properties', data)
      .then((res) => res)
      .then((res) => console.log('---->', res))
      .catch((e) => {
        console.log('=====>', e);
      });
    console.log('---------->', response);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{padding: 24}}>
      <Text style={styles.title}>Dados</Text>

      {/* <Text style={styles.label}>Nome</Text> */}
      <TextInput placeholder="Dê um nome ao imóvel" style={styles.input} />

      {/* <Text style={styles.label}>Sobre</Text> */}
      <TextInput
        placeholder="Breve descrição do imóvel"
        style={[styles.input, {height: 110}]}
        multiline
      />

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
        <Text style={styles.label}>Alugar</Text>
        <Switch
          thumbColor="#fff"
          trackColor={{false: '#ccc', true: '#39CC83'}}
        />
      </View>
      <View style={styles.switchContainer}>
        <Text style={styles.label}>Venda</Text>
        <Switch
          thumbColor="#fff"
          trackColor={{false: '#ccc', true: '#39CC83'}}
        />
      </View>
      <View style={styles.switchContainer}>
        <Text style={styles.label}>Temporada</Text>
        <Switch
          thumbColor="#fff"
          trackColor={{false: '#ccc', true: '#39CC83'}}
        />
      </View>

      <RectButton style={styles.nextButton} onPress={createPropertie}>
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
    marginBottom: 8,
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
    marginBottom: 16,
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
