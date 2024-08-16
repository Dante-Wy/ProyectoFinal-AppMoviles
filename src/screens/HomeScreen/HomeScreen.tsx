import React, { useState } from 'react';
import { FlatList, StatusBar, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { PRIMARY_COLOR, SECUNDARY_COLOR } from '../../commons/constantsColor';
import { BodyComponent } from '../../components/BodyComponent';
import { TitleComponent } from '../../components/TitleComponent';
import { styles } from '../../theme/appTheme';
import { CardProduct } from './components/CardProduct';
import { ModalCar } from './components/ModalCar';

export interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    pathImage: string;
}

export interface Car {
    id: number;
    name: string;
    price: number;
    totalQuantity: number;
}

export const HomeScreen = () => {
    const products: Product[] = [
        { id: 1, name: 'Funda de arroz', price: 1.80, stock: 5, pathImage: require('../../../assets/Bryce Canyon.jpeg') },
        { id: 2, name: 'Funda de azucar', price: 1.30, stock: 7, pathImage: require('../../../assets/El Chupacabras.jpeg') },
        { id: 3, name: 'Funda de papas', price: 2.00, stock: 0, pathImage: require('../../../assets/El Experimento Filadelfia.jpeg') },
        { id: 4, name: 'Funda de fideos', price: 0.80, stock: 4, pathImage: require('../../../assets/El Lago Vostok.jpeg') },
        { id: 5, name: 'Funda de sal', price: 0.60, stock: 8, pathImage: require('../../../assets/El Misterio de las Marismas de Hockomock.jpeg') },
        { id: 6, name: 'Funda de sal', price: 0.60, stock: 8, pathImage: require('../../../assets/El Monstruo del Lago Ness.jpeg') },
        { id: 7, name: 'Funda de sal', price: 0.60, stock: 8, pathImage: require('../../../assets/El Sonido de la Tierra.jpeg') },
        { id: 8, name: 'Funda de sal', price: 0.60, stock: 8, pathImage: require('../../../assets/El Triángulo de Bridgewater.jpeg') },
    ];

    const [productsState, setProductsState] = useState(products);

    const [car, setCar] = useState<Car[]>([]);

    const [showModal, setShowModal] = useState<boolean>(false);

    const changeStockProduct = (idProduct: number, quantity: number) => {
        const updateStock = productsState.map(product => product.id === idProduct
            ? { ...product, stock: product.stock - quantity }
            : product);
        setProductsState(updateStock);

        addProduct(idProduct, quantity);
    }

    const addProduct = (idProduct: number, quantity: number) => {
        const product = productsState.find(product => product.id === idProduct);

        if (!product) {
            return;
        }

        const newProductCar: Car = {
            id: product.id,
            name: product.name,
            price: product.price,
            totalQuantity: quantity
        }

        setCar([...car, newProductCar]);
    }

    return (
        <View>
            <StatusBar backgroundColor={PRIMARY_COLOR} />
            <View style={styles.contentHeaderHome}>
                <TitleComponent title='Productos' />
                <View style={{
                    ...styles.iconCard,
                    paddingHorizontal: 33
                }}>
                    <Text style={styles.textIconCar}>{car.length}</Text>
                    <Icon
                        name='shopping-cart'
                        size={33}
                        color={SECUNDARY_COLOR}
                        onPress={() => setShowModal(!showModal)} />
                </View>
            </View>
            <BodyComponent>
                <FlatList
                    data={productsState}
                    renderItem={({ item }) => <CardProduct product={item} changeStockProduct={changeStockProduct} />}
                    keyExtractor={item => item.id.toString()} />
            </BodyComponent>
            <ModalCar
                isVisible={showModal}
                car={car}
                setShowModal={() => setShowModal(!showModal)} />
        </View>
    )
}
