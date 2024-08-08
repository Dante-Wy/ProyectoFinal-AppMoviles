import React, { useState } from 'react';
import { Alert, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { TitleComponent } from '../components/TitleComponent';
import { PRIMARY_COLOR } from '../commons/constantsColor';
import { BodyComponent } from '../components/BodyComponent';
import { styles } from '../theme/appTheme';
import { InputComponent } from '../components/InputComponent';
import { ButtonComponent } from '../components/ButtonComponent';

//interface - objeto
interface FormLogin {
    email: string;
    password: string;
}

//interface - vector objetos
interface User {
    id: number;
    email: string;
    password: string;
}

export const LoginScreen = () => {

    //arreglo de usuarios: permitir inicio de sesión
    const users: User[] = [
        { id: 1, email: 'vflores@gmail.com', password: '123456' },
        { id: 2, email: 'caguas@gmail.com', password: '1234567' }
    ];

    //hook useState: manipular el estado del formulario
    const [formLogin, setFormLogin] = useState<FormLogin>({
        email: '',
        password: ''
    });

    //hook useState: permitir que la contraseña sea visible o no
    const [hiddenPassword, setHiddenPassword] = useState<boolean>(true);

    //función que permita actualizar el estado del formulario
    const handleSetValues = (name: string, value: string) => {
        //Cambiar le estado del formLogin
        //...operador de propagación | spread: sacar una copia de las propiedades del objeto
        setFormLogin({ ...formLogin, [name]: value });
    }

    //función que permita iniciar sesión
    const handleSignIn = () => {
        //Validando si los campos están vacíos
        if (!formLogin.email || !formLogin.password) {
            //Mensajes de alerta
            Alert.alert(
                "Error",
                "Por favor, completar todos los campos!"
            );
            return;
        }
        //Validar si el correo y contraseña existe
        if (!verifyUser()) {  //valor null 
            Alert.alert(
                "Error",
                "Correo y/o contraseña incorrecta!"
            );
            return;
        }

        console.log(formLogin);
    }

    //función verificar si existe el correo y contraseña
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
                        Bienvenido de nuevo!
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
                <ButtonComponent textButton='Iniciar' actionButton={handleSignIn} />
                <TouchableOpacity>
                    <Text style={styles.textRedirection}>No tienes cuenta? Regístrate ahora</Text>
                </TouchableOpacity>
            </BodyComponent>
        </View>
    )
}
