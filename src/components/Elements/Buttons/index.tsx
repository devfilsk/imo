import React from 'react';
import {View} from 'react-native';

import {PrimaryButtonContainer, PrimaryButtonText} from './styles';
interface PrimaryButtonProps {
  customStyle?: {};
  text: string;
  action: () => {};
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  customStyle,
  text,
  action,
}) => {
  return (
    <PrimaryButtonContainer style={customStyle} onPress={action}>
      <PrimaryButtonText>{text}</PrimaryButtonText>
    </PrimaryButtonContainer>
  );
};
