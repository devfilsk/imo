import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TOKEN } from '~/storage/constants';

import { signIn } from '~/services/auth';
import { useAuth } from '~/contexts/auth';

import {
    Container,
    Logo,
    Input,
    ErrorMessage,
    Button,
    ButtonText,
    SignUpLink,
    SignUpLinkText,
  } from './styles';

  interface FormData {
    email: string;
    password: string;
  };

const SignIn: React.FC = ({ navigation }) => {
    const { signed, user, signIn } = useAuth();

    const { register, handleSubmit, setValue, errors} = useForm<FormData>();

    useEffect(() => {
        register("email")
        register("password")
    }, [register])

    console.log("EEOR", errors)

    async function handleSignInPress(data: any) {
        signIn(data);
    // try{
    //   const response = await api.post('sessions', data);
    //   if(response?.data?.token) {
    //     await AsyncStorage.setItem(TOKEN, response.data.token);
    //     // navigation.navigate("Main");
    //   }
    //   console.log("RESPONSE", response);
    // }catch(error) {

    // }
    }

    function handleCreateAccountPress() {
        navigation.navigate('SignUp');
    }

    return (
    <Container>
        
        <Input
            placeholder="Endereço de e-mail"
            autoCapitalize="none"
            autoCorrect={false}
            ref={register({ name: 'email'}, { required: true })}
            onChangeText={(text: string) => setValue('email', text)}
        />
        {errors.email && <ErrorMessage>Campo obrigatório</ErrorMessage>}
        <Input
            placeholder="Senha"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
            ref={register({ name: 'password'}, { required: true })}
            onChangeText={(text: string) => setValue('password', text)}
        />
        {errors.password && <ErrorMessage>Campo obrigatório</ErrorMessage>}
        <Button onPress={handleSubmit(handleSignInPress)}>
            <ButtonText>Entrar</ButtonText>
        </Button>
        <SignUpLink onPress={handleCreateAccountPress}>
            <SignUpLinkText>Criar conta grátis</SignUpLinkText>
        </SignUpLink>
    </Container>
    );
}

export default SignIn; 