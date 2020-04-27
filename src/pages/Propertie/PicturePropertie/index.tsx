import React, { useState } from 'react';
import { Modal } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { RNCamera } from 'react-native-camera';
import api from '~/services/api';

import { TOKEN } from '~/storage/constants';

import { 
    Container,
    ModalContainer,
    ModalImagesListContainer,
    ModalImagesList,
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

    const [ cameraModalOpen, setCameraModalOpen ] = useState(false);
    const [ camera, setCamera ] = useState(null);
    const [ images, setImages ] = useState([]);


    async function handleTakePicture() {
        if(camera) {
            const options = { quality: 0.5, base64: true, forceOrientation: true, fixOrientation: true };
            const data = await camera.takePictureAsync(options);
            setImages([
                ...images,
                data
            ]);
        }
    }

    function renderImagesList() {
        return (
            <ModalImagesList horizontal>
            { images.map((image, i) => (
                <ModalImageItem key={i} source={{ uri: image.uri }} resizeMode="stretch" />
            ))}
            </ModalImagesList>
            
        )
    }


    function handleCameraModalClose() {
        setCameraModalOpen(false);
    }

    async function saveImages() {
        try{
            const fData = new FormData();

            images.forEach((image, index) => {
                fData.append('image', {
                    uri: Platform.OS === 'android' ? 'file://' + image.uri : image.uri.replace('file://', ''),
                    type: "image/jpeg",
                    name: `sdgsdgsdfgsd_$.jpeg`
                })
            });

            console.log("HEADEREERERERERERR ", fData)
            
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
            const valor = api.post(`properties/22/images`, fData)
            .then((response: any) => {
                console.log("SUCESSU", response)
            }).catch((error: any) => {
                console.log("Erro catch ============>",error )
            });
                console.log("EV", valor)
        }catch(err) {
            console.log("EERO DE IMAGE", err)
        }
    }

    function cameraModal() {
        return (
            <Modal
                visible={cameraModalOpen}
                transparent={false}
                animationType="slide"
                onRequestClose={handleCameraModalClose}
            >
                <ModalContainer>
                    <ModalContainer>
                        <RNCamera
                            ref={setCamera}
                            style={{ flex: 1 }}
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
                        {
                            images && renderImagesList()
                        }
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
        )
    }
       

    return (
        <Container>
            <ContainerLinkButton>
                <LinkButton onPress={() => setCameraModalOpen(true)}>
                    <LinkButtonText>Tirar foto</LinkButtonText>
                </LinkButton>
                <LinkButton onPress={() => {}}>
                    <LinkButtonText>Galeria</LinkButtonText>
                </LinkButton>
            </ContainerLinkButton>
        </Container>
    );
      
}
