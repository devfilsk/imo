import React from 'react';

import { useApp } from '~/contexts/app';

import CloseModal from '~/components/Modal/CloseModal';

import { Container, TypeTitle, TypeDesciption, TypeImage, RequestButton, RequestButtonText } from './styles';

export default function PrevPropertie() {

    const { getPropertie, propertie } = useApp();

    function closeModal() {
        getPropertie(null);
    }

  return (
    <Container>
        <CloseModal closeModal={closeModal} />
        <TypeTitle>{propertie?.title}</TypeTitle>
        <TypeDesciption>{propertie?.address}</TypeDesciption>
        {/* <TypeImage
            source={uberx}
        /> */}
        <TypeTitle>UberX</TypeTitle>
        <TypeTitle>R$ 6,00</TypeTitle>
        <RequestButton>
            <RequestButtonText>VER MAIS DETALHES</RequestButtonText>
        </RequestButton>
    </Container>
  );
}
