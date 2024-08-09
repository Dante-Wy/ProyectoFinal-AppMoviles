import React, { useState } from 'react';
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { PRIMARY_COLOR } from '../commons/constantsColor';
import { TitleComponent } from '../components/TitleComponent';
import { BodyComponent } from '../components/BodyComponent';
import { styles } from '../theme/appTheme';
import { InputComponent } from '../components/InputComponent';
import { ButtonComponent } from '../components/ButtonComponent';
import { CommonActions, useNavigation } from '@react-navigation/native';

//interface - formulario Registro
interface FormRegister {
  email: string;
  password: string;
}

export const RegisterScreen = () => {

  //hook useState: Manipular el estado del formulario
  const [formRegister, setFormRegister] = useState<FormRegister>({
    email: '',
    password: ''
  });

  //hook useState: permitir que la contraseña sea visible o no
  const [hiddenPassword, setHiddenPassword] = useState<boolean>(true);

  //hook useNavigation: permitir navegar de una pantalla a otra
  const navigation = useNavigation();

  //función que actualice el estado del formulario
  const handleSetValues = (name: string, value: string) => {
    setFormRegister({ ...formRegister, [name]: value });
  }

  //función que permita registrar usuario
  const handleSignUp = () => {
    console.log(formRegister);
  }

  return (
    <View>
      <StatusBar backgroundColor={PRIMARY_COLOR} />
      <TitleComponent title='Regístrate' />
      <BodyComponent>
        <View>
          <Text
            style={styles.titleBody}>
            Estás muy cerca!
          </Text>
          <Text
            style={styles.descriptionBody}>
            Realiza tus compras de manera rápida y segura
          </Text>
        </View>
        <View style={styles.contentInput}>
          <InputComponent
            placeholder='Correo'
            handleSetValues={handleSetValues}
            name='email' />
          <InputComponent
            placeholder='Contraseña'
            handleSetValues={handleSetValues}
            name='password'
            isPassword={hiddenPassword}
            hasIcon={true}
            actionIcon={() => setHiddenPassword(!hiddenPassword)} />
        </View>
        <ButtonComponent textButton='Registrar' actionButton={handleSignUp} />
        <TouchableOpacity
          onPress={() => navigation.dispatch(CommonActions.navigate({ name: 'Login' }))}>
          <Text style={styles.textRedirection}>
            Ya tienes una cuenta? Iniciar sesión ahora
          </Text>
        </TouchableOpacity>
      </BodyComponent>
    </View>
  )
}
