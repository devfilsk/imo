import React from 'react';

import { useAuth } from '~/contexts/auth';

import { Container, Title, ButtonSignOut, ButtonSignOutText } from './styles';

const Profile: React.FC = () => {

    const { user, signOut } = useAuth();
    
    

  return (
    <Container >
        <Title>
            { user.username }
        </Title>
        <ButtonSignOut onPress={signOut}>
            <ButtonSignOutText>
                Sair do Imo
            </ButtonSignOutText>
        </ButtonSignOut>
    </Container>
  );
}

export default Profile;