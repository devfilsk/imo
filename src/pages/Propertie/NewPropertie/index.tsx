import React, { useState } from 'react';
import { Modal, Platform, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
// import FormData from 'form-data';
import Maps from '~/components/Maps';

import Search from '~/components/Maps/Search';


import api from '~/services/api';

import CloseModal from '~/components/Modal/CloseModal';
import MapsModal from '~/components/Modal/MapsModal';

import markerImage from '~/assets/marker.png';

import { 
    Container, 
    FieldsContainer,
    Input, 
    ButtonNext, 
    ButtonNextText,
    Title,
    ImageMarker,
    ModalAddressContainer,
} from './styles';

// import imgteste from '~/assets/marker.png';

export default function NewPropertie({ navigation }) {

    const { register, handleSubmit, setValue, errors, control } = useForm();

    const [ address, setAddress ] = useState("");
    const [ addressRef, setAddressRef ] = useState(null);
    const [ cameraModalOpen, setCameraModalOpen ] = useState(false);
    const [ addressModalOpen, setAdressModalOpen ] = useState(false);
    const [ mapsModalOpened, setMapsModalOpened ] = useState(false);
    const [ region, setRegion ] = useState(null);

    function getCustomerRegion(event: any) {
        console.log("EVENT ---> ", event)
        setRegion(event);
    }

    function handleCloseAddressModal() {
        setAdressModalOpen(!addressModalOpen);
    }
    
      /*** MODAL ADDRESS */
    function renderAddressModal() {

        return (
            <Modal
                visible={addressModalOpen}
                transparent={false}
                animationType="slide"
                onRequestClose={() => {}}
            >

                <Maps 
                    customRegion={region}
                    getCustomerRegion={getCustomerRegion}
                />
                <ImageMarker source={markerImage}/>
                <ModalAddressContainer>
                    <CloseModal closeModal={handleCloseAddressModal} />
                    <Search 
                        isMapsField={false} 
                        onLocationSelected={handleLocationSelected} 
                        autoFocus={true}
                    />
                </ModalAddressContainer>
            </Modal>
        );
      }

    
    async function handleSubmitPropertie(data: object) {
        try{
            const request = {
                ...data,
                address,
                latitude: Number(region.latitude.toFixed(6)),
                longitude: Number(region.longitude.toFixed(6))
            };
            console.log("FORM ==>", request)
            const response = await api.post("properties", request)


        }catch(error) {
            console.log("ERROR  -->", error)
        }
    }

    function nextPage() {
        navigation.navigate("PicturePropertie");
        // setMapsModalOpened(!mapsModalOpened);
    }

    function handleLocationSelected( data, { geometry }) {
        const { location: { lat: latitude, lng: longitude } } = geometry;
        setAddress(data.description);
        console.log("DADOOOS --> ", data)
        console.log("geometry --> ", geometry)
        setRegion({
            latitude,
            longitude, 
            latitudeDelta: 0.0143,
            longitudeDelta: 0.0134
            // title: data.structured_formatting.main_text
        })
    }

    function toggleMapsModal() {
        console.log("-->", "aqui")
        setMapsModalOpened(false);
    }

    return (
        <>
            <Container>
                <FieldsContainer>
                    <Title>Nos dê algumas informações do seu imóvel</Title>
                    <Controller
                        as={Input}
                        control={control}
                        placeholder="Nome do Imóvel"
                        name="title"
                        onChange={args => args[0].nativeEvent.text}
                        rules={{ required: true }}
                        autoCapitalize="none"
                        defaultValue=""
                        autoCorrect={false}
                    />

                    <Input
                        placeholder="Endereço"
                        autoCapitalize="none"
                        value={address}
                        autoCorrect={false}
                        // ref={register({ name: "address" }, {required: true })}
                        // onChangeText={text => setValue('address', text, true)}
                        onFocus={() => setAdressModalOpen(!addressModalOpen)}
                    />
                    <Controller
                        as={Input}
                        control={control}
                        placeholder="Valor"
                        name="price"
                        onChange={args => args[0].nativeEvent.text}
                        rules={{ required: true }}
                        autoCapitalize="none"
                        defaultValue=""
                        autoCorrect={false}
                    />
                    {/* <Input
                        placeholder="Nome do Imóvel"
                        autoCapitalize="none"
                        autoCorrect={false}
                        ref={register({ name: "title"}, { required: true })}
                        onChangeText={text => setValue('title', text, true)}
                        />
                    <Input
                        placeholder="Endereço"
                        autoCapitalize="none"
                        value={address}
                        autoCorrect={false}
                        ref={register({ name: "address" }, {required: true })}
                        onChangeText={text => setValue('address', text, true)}
                        onFocus={() => setAdressModalOpen(!addressModalOpen)}
                    /> */}

                    {/* <Input
                        placeholder="Valor"
                        autoCapitalize="none"
                        autoCorrect={false}
                        ref={register({ name: "price" }, { required: true })}
                        onChangeText={text => setValue('price', text, true)}
                    /> */}
                   
                </FieldsContainer>
                
              
                    <ButtonNext onPress={nextPage}>
                        <ButtonNextText>Avançar</ButtonNextText>
                    </ButtonNext>
            </Container>
           
            {
                 renderAddressModal()
            }

            {/* <MapsModal 
                isOpen={mapsModalOpened} 
                toggleModal={toggleMapsModal} 
                region={region} 
                getCustomerRegion={getCustomerRegion}
                finish={handleSubmit(handleSubmitPropertie)}
            /> */}

        </>
    );
}
