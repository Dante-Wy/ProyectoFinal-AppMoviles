import React from 'react';
import { FlatList, StatusBar, Text, View } from 'react-native';
import { PRIMARY_COLOR } from '../../commons/constantsColor';
import { TitleComponent } from '../../components/TitleComponent';
import { BodyComponent } from '../../components/BodyComponent';
import { CardProduct } from './components/CardProduct';

//interface - arreglo productos
export interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    pathImage: string;
}

export const HomeScreen = () => {
    //arreglo con la lista de productos
    const products: Product[] = [
        { id: 1, name: 'Funda de arroz', price: 1.80, stock: 5, pathImage: 'https://www.megaprimavera.com/wp-content/uploads/arroz-blanco-gustadina-2-kg.png' },
        { id: 2, name: 'Funda de azucar', price: 1.30, stock: 7, pathImage: 'https://tienda.propieta.ec/wp-content/uploads/2021/03/azucar-blanca.jpg' },
        { id: 3, name: 'Funda de papas', price: 2.00, stock: 3, pathImage: 'https://www.supermercadosantamaria.com/documents/10180/10504/65700_G.jpg' },
        { id: 4, name: 'Funda de fideos', price: 0.80, stock: 4, pathImage: 'https://www.supermercadosantamaria.com/documents/10180/10504/133101593_M.jpg' },
        { id: 5, name: 'Funda de sal', price: 0.60, stock: 8, pathImage: 'https://www.supermercadosantamaria.com/documents/10180/10504/87990_M.jpg' },
        { id: 6, name: 'Funda de sal', price: 0.60, stock: 8, pathImage: 'https://www.supermercadosantamaria.com/documents/10180/10504/87990_M.jpg' },
        { id: 7, name: 'Funda de sal', price: 0.60, stock: 8, pathImage: 'https://www.supermercadosantamaria.com/documents/10180/10504/87990_M.jpg' },
        { id: 8, name: 'Funda de sal', price: 0.60, stock: 8, pathImage: 'https://www.supermercadosantamaria.com/documents/10180/10504/87990_M.jpg' },
    ];

    return (
        <View>
            <StatusBar backgroundColor={PRIMARY_COLOR} />
            <TitleComponent title='Productos' />
            <BodyComponent>
                <FlatList
                    data={products}
                    renderItem={({ item }) => <CardProduct product={item} />}
                    keyExtractor={item => item.id.toString()} />
            </BodyComponent>
        </View>
    )
}
