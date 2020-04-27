import React from 'react';

import { useNavigation } from '@react-navigation/native';

import { useApp } from '~/contexts/app';

import CloseModal from '~/components/Modal/CloseModal';

import { Container, CloseContent, TypeTitle, TypeDesciption, TypeDesciptionLabel, TypeImage, RequestButton, RequestButtonText } from './styles';

export default function PrevPropertie() {

    const { handleSetPropertie, propertie } = useApp();

    const navigation = useNavigation();


    function closeModal() {
        handleSetPropertie(null);
    }

  return (
    <Container>
        <CloseContent>
            <CloseModal closeModal={closeModal} />
        </CloseContent>
        <TypeTitle>Imóvel: {propertie?.title}</TypeTitle>
        <TypeDesciption>
            <TypeDesciptionLabel>Descrição: </TypeDesciptionLabel> 
            Casa de esquina com 4 quartos, duas salas, área de lazer, garagem para dois carros
        </TypeDesciption>
        <TypeDesciption>
            <TypeDesciptionLabel>Endereço: </TypeDesciptionLabel>
            {propertie?.address}
        </TypeDesciption>
        {/* <TypeImage
            source={uberx}
        /> */}
        <TypeDesciption>{ propertie?.images.length } imagens disponíveis</TypeDesciption>
        {/* <TypeTitle>R$ 6,00</TypeTitle> */}
        <RequestButton onPress={() => navigation.navigate("DetailsPropertie")}>
            <RequestButtonText>VER MAIS DETALHES</RequestButtonText>
        </RequestButton>
    </Container>
  );
}
