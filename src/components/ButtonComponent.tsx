import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from '../theme/appTheme';

//interface - props
interface Props {
    textButton: string;
}

export const ButtonComponent = ({ textButton }: Props) => {
    return (
        <TouchableOpacity
            style={styles.button}>
            <Text style={styles.buttonText}>{textButton}</Text>
        </TouchableOpacity>
    )
}
