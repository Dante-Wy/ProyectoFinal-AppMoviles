import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { PRIMARY_COLOR } from '../commons/constantsColor';
import { BodyComponent } from '../components/BodyComponent';
import { ButtonComponent } from '../components/ButtonComponent';
import { InputComponent } from '../components/InputComponent';
import { TitleComponent } from '../components/TitleComponent';
import { User } from '../navigator/StackNavigator';
import { styles } from '../theme/appTheme';

import CheckBox from '@react-native-community/checkbox';
import RNPickerSelect from 'react-native-picker-select';

interface Props {
  users: User[];
  handleAddUser: (user: User) => void;
}

interface FormRegister {
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterScreen = ({ users, handleAddUser }: Props) => {

  const [formRegister, setFormRegister] = useState<FormRegister>({
    email: '',
    password: '',
    confirmPassword: '' /*No implemente la logica. Quise poner contraseña 1 igual a contraseña 2 y no funciona asi. :(*/
  });

  const [hiddenPassword, setHiddenPassword] = useState<boolean>(true);

  const navigation = useNavigation();

  const handleSetValues = (name: string, value: string) => {
    setFormRegister({ ...formRegister, [name]: value });
  }

  const handleSignUp = () => {
    if (!formRegister.email || !formRegister.password /* || !confirmPassword.confirmPassword*/ ) {
      Alert.alert(
        "Error",
        "¡Por favor, completar todos los campos!"
      );
      return;
    }

    /*if (password !== confirmPassword) {
      Alert.alert(
        "Error",
        'Las contrase;as no coinciden!'
      );
      return;
    }; El error dice que no encuentra el nombre, solo Dios sabra donde se pone el nombre*/

    if (verifyUser() != null) {
      Alert.alert(
        "Error",
        "El correo ya se encuentra registrado!"
      );
      return;
    }

    const getIdUsers = users.map(user => user.id);
    const getNewId = Math.max(...getIdUsers) + 1;
    const newUser: User = {
      id: getNewId,
      email: formRegister.email,
      password: formRegister.password
    }
    handleAddUser(newUser);
    Alert.alert(
      "Felicitaciones",
      "Registro exitoso!"
    );
    navigation.goBack();
  }

  const verifyUser = (): User => {
    const existUser = users.filter(user => user.email === formRegister.email)[0];
    return existUser;
  }

  return (
    <View>
      <StatusBar backgroundColor={PRIMARY_COLOR} />
      <TitleComponent title='Regístrate' />
      <BodyComponent>
        <View>
          <Text
            style={styles.titleBody}>
              StoryBook´s
          </Text>
          <Text
            style={styles.descriptionBody}>
            Registrate y compra los mejores cuentos e historias acerca de nuestro mundo.
          </Text>
        </View>
        <View style={styles.contentInput}>
          <InputComponent
            placeholder='Nombre'
            handleSetValues={handleSetValues}
            name='name' />
          <InputComponent
            placeholder='Apellido'
            handleSetValues={handleSetValues}
            name='last name' />
          <RNPickerSelect
              onValueChange={(value) => ({ name: 'check', value })}
              items={[
                  { label: 'Masculino', value: 'Masculino' },
                  { label: 'Femenino', value: 'Femenino' }, ]}
              placeholder={{ label: 'Seleccione su género', value: null }}/>
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
          <InputComponent
            placeholder='Confirmar Contraseña'
            handleSetValues={handleSetValues}
            name='confirmPassword'
            isPassword={hiddenPassword}
            hasIcon={true}
            actionIcon={() => setHiddenPassword(!hiddenPassword)} />
          <CheckBox
              onValueChange={(newValue) => ({ name: 'acceptTerms', value: newValue })}/>
        </View>
        <ButtonComponent textButton='Registrar' actionButton={handleSignUp} />
        <TouchableOpacity
          onPress={() => navigation.dispatch(CommonActions.navigate({ name: 'Login' }))}>
          <Text style={styles.textRedirection}>
            ¿Ya tienes una cuenta? ¡Inicia sesión ahora!
          </Text>
        </TouchableOpacity>
      </BodyComponent>
    </View>
  )
}
