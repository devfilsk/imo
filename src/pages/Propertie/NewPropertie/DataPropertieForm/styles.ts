import styled from 'styled-components/native';

export const UploadedImagesContainer = styled.ScrollView`
  flex-direction: row;
`;

export const UploadedImages = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 10px;
  margin-bottom: 32px;
  margin-right: 8px;
`;

export const SmallAlertText = styled.Text`
  /* margin-top: 5px; */
  font-size: 14px;
  color: #ff669d;
`;
