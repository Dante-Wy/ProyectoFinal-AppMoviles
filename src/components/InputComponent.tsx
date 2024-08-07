import React from 'react';
import { TextInput } from 'react-native';
import { INPUT_COLOR } from '../commons/constantsColor';
import { styles } from '../theme/appTheme';

//interface - props
interface Props {
    placeholder: string;
}

export const InputComponent = ({ placeholder }: Props) => {
    return (
        <TextInput
            placeholder={placeholder}
            keyboardType='default'
            style={styles.inputText}
        />
    )
}
