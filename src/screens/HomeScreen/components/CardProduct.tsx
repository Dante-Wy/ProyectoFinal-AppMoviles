import React from 'react';
import { Image, Text, View } from 'react-native';
import { Product } from '../HomeScreen';
import { styles } from '../../../theme/appTheme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { PRIMARY_COLOR } from '../../../commons/constantsColor';

//interface - Props
interface Props {
    product: Product;
}

export const CardProduct = ({ product }: Props) => {
    return (
        <View style={styles.contentCard}>
            <Image
                source={{
                    uri: product.pathImage
                }}
                style={styles.imageCard} />
            <View>
                <Text style={styles.titleCard}>{product.name}</Text>
                <Text>Precio: ${product.price.toFixed(2)}</Text>
            </View>
            <View style={styles.iconCard}>
                <Icon name='add-shopping-cart' size={33} color={PRIMARY_COLOR} />
            </View>
        </View>
    )
}
