import React from 'react';
import { View, Modal } from 'react-native';

import Maps from '~/components/Maps';

import { HeaderContainer, ImageMarker, TextHeader, NextButton, NextButtonText } from './styles';

import CloseModal from '~/components/Modal/CloseModal';

import markerImage from '~/assets/marker.png';

export default function MapsModal({ region, setRegion, isOpen, toggleModal, getCustomerRegion = () => {}, finish }) {

  return (
    <Modal
        visible={isOpen}
        transparent={false}
        animationType="slide"
        onRequestClose={toggleModal}
        presentationStyle={"pageSheet"}
    >
        <HeaderContainer>
            <CloseModal closeModal={toggleModal} />
            <TextHeader>
                O marcador se encontra no local correto?
            </TextHeader>
        </HeaderContainer>
        <Maps customRegion={region} getCustomerRegion={getCustomerRegion}/>
        <ImageMarker source={markerImage}/>
        <NextButton onPress={finish}>
            <NextButtonText>Concluir</NextButtonText>
        </NextButton>
    </Modal>
  );
}
