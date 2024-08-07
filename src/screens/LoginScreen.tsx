import React from 'react';
import { StatusBar, Text, View } from 'react-native';
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

export const LoginScreen = () => {
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
                    <InputComponent placeholder='Correo' />
                    <InputComponent placeholder='Contraseña' />
                </View>
                <ButtonComponent textButton='Iniciar' />
            </BodyComponent>
        </View>
    )
}
