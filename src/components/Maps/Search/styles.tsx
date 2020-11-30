import styled from 'styled-components/native';
import {Platform} from 'react-native';

export const SearchContainer = styled.View`
  position: absolute;
  margin-top: ${Platform.OS === 'ios' ? 40 : 20}px;
  flex-direction: row;
  background-color: #fff;
  width: 90%;
  align-self: center;
  border-radius: 5px;
  padding: 10px;
  shadow-color: #ccc;
  shadow-offset: {width: 0px, height: 3px};
  shadow-opacity: 0.5;
  shadow-radius: 5px;
  elevation: 10;
  /* height: 60px; */
  align-items: center;
`;

export const ScrollView = styled.ScrollView`
  position: absolute;
  top: ${Platform.OS === 'ios' ? 90 : 90}px;
  padding: 0 10px;
`;
export const OptionItem = styled.TouchableOpacity`
  flex-direction: row;
  background-color: #FFF;
  border-radius: 20px;
  padding: 8px 20px;
  margin: 5px 10px;
  height: 35px;
  shadow-color: #ccc;
  shadow-offset: {width: 0px, height: 3px};
  shadow-opacity: 0.5;
  shadow-radius: 5px;
  elevation: 10;
`;
