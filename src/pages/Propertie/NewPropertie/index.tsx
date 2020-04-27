import React, { useState } from 'react';
import { Modal, Platform, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
// import FormData from 'form-data';
import Maps from '~/components/Maps';

import { useApp } from '~/contexts/app';

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
    ErrorLabel,
} from './styles';

// import imgteste from '~/assets/marker.png';

export default function NewPropertie({ navigation }) {

    const { register, handleSubmit, setValue, errors, control } = useForm();
    const { customerPosition, handleSetCustomerPosition } = useApp();

    const [ address, setAddress ] = useState("");
    const [ addressModalOpen, setAdressModalOpen ] = useState(false);

    function handleCloseAddressModal() {
        setAdressModalOpen(!addressModalOpen);
    }

    console.log("ERROS", errors)

    async function handleSubmitPropertie(data: object) {
        try{
            if(customerPosition) {
                const request = {
                    ...data,
                    address,
                    latitude: Number(customerPosition?.latitude.toFixed(6)),
                    longitude: Number(customerPosition?.longitude.toFixed(6))
                };
                console.log("FORM ==>", request)
                const response = await api.post("properties", request)
            }


        }catch(error) {
            console.log("ERROR  -->", error)
        }
    }

    function nextPage(data: object) {
        handleSubmitPropertie(data);
        console.log("Passou!", data)
        handleSetCustomerPosition(null);
        navigation.navigate("PicturePropertie");
        // setMapsModalOpened(!mapsModalOpened);
    }

    function handleLocationSelected( data, { geometry }) {
        const { location: { lat: latitude, lng: longitude } } = geometry;
        setAddress(data.description);
        console.log("DADOOOS --> ", data)
        console.log("geometry --> ", geometry)
        handleSetCustomerPosition({
            ...customerPosition,
            latitude,
            longitude,
            // title: data.structured_formatting.main_text
        })
    }

    function openAddressModal() {
        handleSetCustomerPosition(null);
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
                    customRegion={customerPosition}
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

    return (
        <>
            <Container>
                <FieldsContainer>
                    <Title>Nos dê algumas informações do seu imóvel</Title>
                    <Input
                        placeholder="Nome do Imóvel"
                        autoCapitalize="none"
                        autoCorrect={false}
                        ref={register({ name: "title" }, { required: true })}
                        onChangeText={(text: string) => setValue('title', text, true)}
                        />
                    { errors.title && (<ErrorLabel>O nome do imóvel é obrigatório!</ErrorLabel>)}
                    <Input
                        placeholder="Endereço"
                        autoCapitalize="none"
                        value={address}
                        autoCorrect={false}
                        // ref={register({ name: "address" }, {required: true })}
                        // onChangeText={(text: string) => setValue('address', text)}
                        onFocus={openAddressModal}
                    />
                    
                     <Input
                        placeholder="Valor"
                        autoCapitalize="none"
                        autoCorrect={false}
                        ref={register({ name: "price" }, { required: true })}
                        onChangeText={(text: string) => setValue('price', text, true)}
                    />
                    { errors.price && (<ErrorLabel>Preencha o valor!</ErrorLabel>)}
                   
                </FieldsContainer>
                
                <ButtonNext onPress={handleSubmit(nextPage)}>
                    <ButtonNextText>Avançar</ButtonNextText>
                </ButtonNext>
                   
            </Container>
           
            {
                 renderAddressModal()
            }

        </>
    );
}
