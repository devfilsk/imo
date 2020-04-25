import React from 'react';
import { useForm } from 'react-hook-form';

import { Container, Input, Button, ButtonText, LinkGoBack, LinkGoBackText } from './styles';
import { useAuth } from '~/contexts/auth';

const SignUp: React.FC = ({ navigation }) => {

  const { signUp } = useAuth();

  const { register, handleSubmit, setValue, errors} = useForm();
  
  function handleSignUpPress(data: object) {
    signUp(data);
  }

  function handleGoBackToLogin() {
    navigation.navigate("SignIn")
  }

  return (
    <Container>
        <Input
          placeholder="Qual o seu nome?"
          autoCapitalize="none"
          autoCorrect={false}
          ref={register({ name: 'username'}, { required: true })}
          onChangeText={(text: any) => setValue('username', text)}
        />
        <Input
          placeholder="Seu melhor endereço de email?"
          autoCapitalize="none"
          autoCorrect={false}
          ref={register({ name: 'email'}, { required: true })}
          onChangeText={(text: any) => setValue('email', text)}
        />
        <Input
          placeholder="Escolha uma senha"
          autoCapitalize="none"
          autoCorrect={false}
          ref={register({ name: 'password'}, { required: true })}
          onChangeText={(text: any) => setValue('password', text)}
          secureTextEntry
        />
        <Input
          placeholder="Digite novamente a senha"
          autoCapitalize="none"
          autoCorrect={false}
          ref={register({ name: 'confirm_password'}, { required: true })}
          onChangeText={(text: any) => setValue('confirm_password', text)}
          secureTextEntry
        />

        <Button onPress={handleSubmit(handleSignUpPress)}>
          <ButtonText>Criar Conta</ButtonText>
        </Button>
        <LinkGoBack onPress={handleGoBackToLogin}>
          <LinkGoBackText>Voltar ao login</LinkGoBackText>
        </LinkGoBack>
    </Container>
  );
}

export default SignUp;