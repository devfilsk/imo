import React, {useEffect, useState} from 'react';
import {Modal} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {RNCamera} from 'react-native-camera';
import api from '~/services/api';
import GallerySwiper from 'react-native-gallery-swiper';

import {Galery as GaleryModal} from '~/components/Modal/Galery';

import {TOKEN} from '~/storage/constants';

import {
  Container,
  List,
  ModalContainer,
  ModalImagesListContainer,
  ModalImagesList,
  ImageContent,
  ModalImageItem,
  ModalButtons,
  CameraButtonContainer,
  CancelButtonText,
  ContinueButtonText,
  TakePictureButtonContainer,
  TakePictureButtonLabel,
  ContainerLinkButton,
  LinkButton,
  LinkButtonText,
} from './styles';

export default function PicturePropertie() {
  const [cameraModalOpen, setCameraModalOpen] = useState(false);
  const [camera, setCamera] = useState(null);
  const [images, setImages] = useState([]);
  const [galeryModal, setGaleryModal] = useState(true);
  let [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    setImages([
      {
        id: 1,
        uri:
          'https://http2.mlstatic.com/sobrado-com-piscina-venda-na-praia-de-peruibe-D_NQ_NP_673641-MLB32429926852_102019-F.webp',
      },
      {
        id: 2,
        uri:
          'https://http2.mlstatic.com/sobrado-com-piscina-venda-na-praia-de-peruibe-D_NQ_NP_673641-MLB32429926852_102019-F.webp',
      },
      {
        id: 3,
        uri:
          'https://http2.mlstatic.com/sobrado-com-piscina-venda-na-praia-de-peruibe-D_NQ_NP_825211-MLB32429941298_102019-F.webp',
      },
      {
        id: 4,
        uri:
          'https://http2.mlstatic.com/sobrado-com-piscina-venda-na-praia-de-peruibe-D_NQ_NP_854821-MLB32429941308_102019-F.webp',
      },
      {
        id: 5,
        uri:
          'https://http2.mlstatic.com/sobrado-com-piscina-venda-na-praia-de-peruibe-D_NQ_NP_623650-MLB32429936839_102019-F.webp',
      },
      {
        id: 6,
        uri:
          'https://http2.mlstatic.com/sobrado-com-piscina-venda-na-praia-de-peruibe-D_NQ_NP_898060-MLB32429977516_102019-F.webp',
      },
      {
        id: 7,
        uri:
          'https://http2.mlstatic.com/sobrado-com-piscina-venda-na-praia-de-peruibe-D_NQ_NP_604967-MLB32429966148_102019-F.webp',
      },
      {
        id: 8,
        uri:
          'https://http2.mlstatic.com/sobrado-com-piscina-venda-na-praia-de-peruibe-D_NQ_NP_918434-MLB32429941380_102019-F.webp',
      },
      {
        id: 9,
        uri:
          'https://http2.mlstatic.com/sobrado-com-piscina-venda-na-praia-de-peruibe-D_NQ_NP_878696-MLB32429951796_102019-F.webp',
      },
      {
        id: 10,
        uri:
          'https://http2.mlstatic.com/sobrado-com-piscina-venda-na-praia-de-peruibe-D_NQ_NP_931777-MLB32429967674_102019-F.webp',
      },
      {
        id: 11,
        uri:
          'https://http2.mlstatic.com/sobrado-com-piscina-venda-na-praia-de-peruibe-D_NQ_NP_701915-MLB32429964183_102019-F.webp',
      },
      {
        id: 12,
        uri:
          'https://http2.mlstatic.com/sobrado-com-piscina-venda-na-praia-de-peruibe-D_NQ_NP_703896-MLB32429941418_102019-F.webp',
      },
    ]);
  }, []);

  async function handleTakePicture() {
    if (camera) {
      const options = {
        quality: 0.5,
        base64: true,
        forceOrientation: true,
        fixOrientation: true,
      };
      const data = await camera.takePictureAsync(options);
      setImages([...images, data]);
    } else {
      console.log('Sem camera');
    }
  }

  function actionOnRow(item: object) {
    console.log('Item', item);
    images.map((v, index) => {
      if (v.id === item.id) {
        setImageIndex(index);
      }
    });

    console.log('IMAGE INDEX: ', imageIndex);
    // toogleGalery();
  }

  function renderImagesList() {
    return (
      <>
        <List
          keyboardShouldPErsistTaps="handled"
          horizontal
          data={images}
          keyExtractor={(item: object, index: number) => index.toString()}
          renderItem={({item, index}) => (
            <ImageContent onPress={() => actionOnRow(item)} key={index}>
              <ModalImageItem source={{uri: item.uri}} resizeMode="stretch" />
            </ImageContent>
          )}
        />
        {/* <ModalImagesList horizontal>
                { images.map((image, i) => (
                    <ModalImageItem key={i} source={{ uri: image.uri }} resizeMode="stretch" />
                ))}
                </ModalImagesList> */}
      </>
    );
  }

  function handleCameraModalClose() {
    setCameraModalOpen(false);
  }

  async function saveImages() {
    try {
      const fData = new FormData();

      images.forEach((image, index) => {
        fData.append('image', {
          uri:
            Platform.OS === 'android'
              ? 'file://' + image.uri
              : image.uri.replace('file://', ''),
          type: 'image/jpeg',
          name: `sdgsdgsdfgsd_$.jpeg`,
        });
      });

      // images.forEach((image, index) => {
      //     fData.append('image', {
      //         uri: Platform.OS === 'android' ? 'file://' + image.uri : image.uri.replace('file://', ''),
      //         type: "image/jpeg",
      //         name: `sdgsdgsdfgsd_$.jpeg`
      //     })
      // });

      // fData.append('image', images[0]);

      const tok = await AsyncStorage.getItem(TOKEN);
      api.defaults.headers.common['Authorization'] = tok;
      // api.defaults.headers.post['Accept'] = 'application/json';
      // api.defaults.headers.post['Content-Type'] = 'multipart/form-data';

      api.defaults.headers.common['Content-Type'] = 'multipart/form-data';
      // const valor = api.post(`properties/${response.data.id}/images`, imagesData,
      const valor = api
        .post(`properties/22/images`, fData)
        .then((response: any) => {
          console.log('SUCESSU', response);
        })
        .catch((error: any) => {
          console.log('Erro catch ============>', error);
        });
      console.log('EV', valor);
    } catch (err) {
      console.log('EERO DE IMAGE', err);
    }
  }

  function toogleGalery() {
    setGaleryModal(!galeryModal);
  }

  function cameraModal() {
    return (
      <Modal
        visible={cameraModalOpen}
        transparent={false}
        animationType="slide"
        onRequestClose={handleCameraModalClose}>
        <ModalContainer>
          <ModalContainer>
            <RNCamera
              ref={setCamera}
              style={{flex: 1}}
              type={RNCamera.Constants.Type.back}
              autoFocus={RNCamera.Constants.AutoFocus.on}
              flashMode={RNCamera.Constants.FlashMode.off}
              // permissionDialogTitle={"Permission to use camera"}
              // permissionDialogMessage={
              // "We need your permission to use your camera phone"
              // }
            />
          </ModalContainer>
          <ModalImagesListContainer>
            <TakePictureButtonContainer onPress={handleTakePicture}>
              <TakePictureButtonLabel />
            </TakePictureButtonContainer>
            {images && renderImagesList()}
          </ModalImagesListContainer>

          <ModalButtons>
            <CameraButtonContainer onPress={handleCameraModalClose}>
              <CancelButtonText>Cancelar</CancelButtonText>
            </CameraButtonContainer>
            <CameraButtonContainer onPress={() => {}}>
              <ContinueButtonText>Continuar</ContinueButtonText>
            </CameraButtonContainer>
          </ModalButtons>
        </ModalContainer>
      </Modal>
    );
  }

  return (
    <Container>
      <GallerySwiper
        images={images}
        initialNumToRender={images.length}
        immediate={true}
        initialPage={imageIndex}
        style={{background: '#FFF'}}
        // Version *1.15.0 update
        // onEndReached={() => {
        //     // add more images when scroll reaches end
        // }}
      />
      <ModalImagesListContainer>
        {images && renderImagesList()}
      </ModalImagesListContainer>
      <ContainerLinkButton>
        <LinkButton onPress={() => setCameraModalOpen(true)}>
          <LinkButtonText>Tirar foto</LinkButtonText>
        </LinkButton>
        <LinkButton onPress={() => {}}>
          <LinkButtonText>Galeria</LinkButtonText>
        </LinkButton>
      </ContainerLinkButton>
      {/* <GaleryModal isOpen={galeryModal} toggle={toogleGalery} index={imageIndex} images={images} /> */}
      {cameraModal()}
    </Container>
  );
}
