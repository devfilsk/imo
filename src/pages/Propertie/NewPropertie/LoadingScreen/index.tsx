import React from 'react';

import LottieView from 'lottie-react-native';

import {Container, Text} from './styles';

interface LoadingScreenProps {
  message: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({message}) => {
  return (
    <Container>
      <LottieView
        source={require('~/assets/animations/house-loading.json')}
        loop={true}
        autoPlay={true}
        progress={0}
        style={{width: 150, height: 150}}
      />
      <Text>{message}</Text>
    </Container>
  );
};

export default LoadingScreen;
