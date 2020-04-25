// import React, { useContext } from 'react';
// import { View, Button, StyleSheet, Text } from 'react-native';

// import { useAuth } from '~/contexts/auth';

// const styles = StyleSheet.create({
//     container: { flex: 1, justifyContent: 'center'}
// })

// const Dashboard: React.FC = () => {
//     const { signOut, user } = useAuth();

//     function handleSignOut() {
//         signOut();
//     }
//     return (
//         <View style={styles.container}> 
//             <Text>{user?.name}</Text>
//             <Button title="Sign Out" onPress={ handleSignOut }/>
//         </View>
//     )
// }

// export default Dashboard;

import React, { useState } from 'react';

import Search from '~/components/Maps/Search';

import { Container, ModalImageContainer, NewButtonContainer, ButtonText } from './styles';

import Maps from '~/components/Maps'

export default function Dashboard ({ navigation }) {

  const [ newPropertyRegion, setNewPropertyRegion ] = useState(null);
  const [ isNewProperty, setIsNewProperty ] = useState(false);

  function handleLocationSelected( data, { geometry }) {
    const { location: { lat: latitude, lng: longitude } } = geometry;
    setNewPropertyRegion({
        latitude,
        longitude,
        title: data.structured_formatting.main_text
    })
    // setRegion({
    //     ...region,
    //     latitude,
    //     longitude,
    // })
  }

  function getNewPropertyLocale() {
    navigation.navigate("NewPropertie")
  }

  return (
      <Container>
       <Maps isNewProperty={isNewProperty} customRegion={newPropertyRegion}/>

       <Search 
          onLocationSelected={handleLocationSelected}
        />

       <NewButtonContainer onPress={getNewPropertyLocale}>
        <ButtonText>Novo Imóvel</ButtonText>
      </NewButtonContainer>
      </Container>
  )
}
// latitude: -16.678040,
// longitude: -49.249980,
// latitudeDelta: 0.00922,
// longitudeDelta: 0.00421
