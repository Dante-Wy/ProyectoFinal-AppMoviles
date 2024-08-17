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

interface Props {
    users: User[];
}

interface FormLogin {
    email: string;
    password: string;
}

export const LoginScreen = ({ users }: Props) => {
    const [formLogin, setFormLogin] = useState<FormLogin>({
        email: '',
        password: ''
    });

    const [hiddenPassword, setHiddenPassword] = useState<boolean>(true);

    const navigation = useNavigation();

    const handleSetValues = (name: string, value: string) => {
        setFormLogin({ ...formLogin, [name]: value });
    }

    const handleSignIn = () => {
        if (!formLogin.email || !formLogin.password) {
            Alert.alert(
                "Error",
                "Por favor, completar todos los campos!"
            );
            return;
        }
        if (!verifyUser()) {
            Alert.alert(
                "Error",
                "Correo y/o contraseña incorrecta!"
            );
            return;
        }

        navigation.dispatch(CommonActions.navigate({ name: 'Home' }))
    }

    const verifyUser = (): User => {
        const existUser = users.filter(user => user.email === formLogin.email && user.password === formLogin.password)[0];
        return existUser;
    }

    return (
        <View>
            <StatusBar backgroundColor={PRIMARY_COLOR} />
            <TitleComponent title='Iniciar Sesión' />
            <BodyComponent>
                <View>
                    <Text
                        style={styles.titleBody}>
                        ¡Bienvenido de nuevo!
                    </Text>
                    <Text
                        style={styles.descriptionBody}>
                        Realiza tus compras de manera rápida y segura de los mejores cuentos acerca de nuestro mundo.
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
                <ButtonComponent textButton='Iniciar' actionButton={handleSignIn} />
                <TouchableOpacity
                    onPress={() => navigation.dispatch(CommonActions.navigate({ name: 'Register' }))}>
                    <Text style={styles.textRedirection}>
                        ¿No tienes cuenta? ¡Regístrate ahora!
                    </Text>
                </TouchableOpacity>
            </BodyComponent>
        </View>
    )
}
