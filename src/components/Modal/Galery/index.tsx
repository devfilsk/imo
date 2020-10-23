import React from 'react';
import GallerySwiper from 'react-native-gallery-swiper';

import CloseModal from '~/components/Modal/CloseModal';
import {Container} from './styles';

interface ImagesData {
  images: [] | null;
  index: number | null;
  isOpen: boolean;
  toggle(): void;
}

export function Galery<ImagesData>({isOpen, toggle, images, index}) {
  console.log('INNNDEX', index);
  return (
    <Container
      visible={isOpen}
      transparent={false}
      animationType="slide"
      onRequestClose={toggle}
      presentationStyle={'pageSheet'}>
      <CloseModal closeModal={toggle} color="#999" />
      <GallerySwiper
        images={images}
        initialNumToRender={images.length}
        immediate={true}
        initialPage={index}
        scrollViewStyle={{background: '#FFF'}}
        // Version *1.15.0 update
        // onEndReached={() => {
        //     // add more images when scroll reaches end
        // }}
      />
    </Container>
  );
}
