import styled from 'styled-components/native';

export const CloseIcon = styled.TouchableOpacity`
    /* background: transparent;
    z-index: 10; */
    /* padding: 20px; */
    /* font-size: 25px; */
    align-self: flex-end;
`;

export const Container = styled.View`
  background: #FFF;
  height: 300px;
  width: 100%;
  position: absolute;
  bottom: 0;
  shadow-color: #000;
  shadow-offset: 0 0 ;
  shadow-opacity: 0.2;
  shadow-radius: 10px;
  elevation: 3;
  border: 1px solid #DDD;
  /* align-items: center; */
  padding: 20px;
`;
export const TypeTitle = styled.Text`
    font-size: 25px;
    color: #222;
`;
export const TypeDesciptionLabel = styled.Text`
    font-weight: bold;
`;
export const TypeDesciption = styled.Text`
    color: #666;
    font-size: 14px;
    padding-left: 5px;
    margin-top: 5px;
`;
export const TypeImage = styled.Image`
    height: 80px;
    margin: 10px 0;
`;
export const RequestButton = styled.TouchableOpacity`
    background: #222;
    justify-content: center;
    align-items: center;
    height: 44px;
    align-self: stretch;
    margin-top: 20px;
`;
export const RequestButtonText = styled.Text`
    color: #FFF;
    font-weight: bold;
    font-size: 18px;
`;
