import React, { useState } from 'react';
import { FlatList, StatusBar, Text, View } from 'react-native';
import { PRIMARY_COLOR, SECUNDARY_COLOR } from '../../commons/constantsColor';
import { TitleComponent } from '../../components/TitleComponent';
import { BodyComponent } from '../../components/BodyComponent';
import { CardProduct } from './components/CardProduct';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from '../../theme/appTheme';
import { ModalCar } from './components/ModalCar';

//interface - arreglo productos
export interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    pathImage: string;
}

//interface - arreglo carrito de compras
export interface Car {
    id: number;
    name: string;
    price: number;
    totalQuantity: number;
}

export const HomeScreen = () => {
    //arreglo con la lista de productos
    const products: Product[] = [
        { id: 1, name: 'Funda de arroz', price: 1.80, stock: 5, pathImage: 'https://www.megaprimavera.com/wp-content/uploads/arroz-blanco-gustadina-2-kg.png' },
        { id: 2, name: 'Funda de azucar', price: 1.30, stock: 7, pathImage: 'https://tienda.propieta.ec/wp-content/uploads/2021/03/azucar-blanca.jpg' },
        { id: 3, name: 'Funda de papas', price: 2.00, stock: 0, pathImage: 'https://www.supermercadosantamaria.com/documents/10180/10504/65700_G.jpg' },
        { id: 4, name: 'Funda de fideos', price: 0.80, stock: 4, pathImage: 'https://www.supermercadosantamaria.com/documents/10180/10504/133101593_M.jpg' },
        { id: 5, name: 'Funda de sal', price: 0.60, stock: 8, pathImage: 'https://www.supermercadosantamaria.com/documents/10180/10504/87990_M.jpg' },
        { id: 6, name: 'Funda de sal', price: 0.60, stock: 8, pathImage: 'https://www.supermercadosantamaria.com/documents/10180/10504/87990_M.jpg' },
        { id: 7, name: 'Funda de sal', price: 0.60, stock: 8, pathImage: 'https://www.supermercadosantamaria.com/documents/10180/10504/87990_M.jpg' },
        { id: 8, name: 'Funda de sal', price: 0.60, stock: 8, pathImage: 'https://www.supermercadosantamaria.com/documents/10180/10504/87990_M.jpg' },
    ];

    //hook useState: manipular el arreglo de productos
    const [productsState, setProductsState] = useState(products);

    //hook useState: manipular el arreglo de carrito de compras
    const [car, setCar] = useState<Car[]>([]);

    //hook useState: manipular la visibilidad del modal
    const [showModal, setShowModal] = useState<boolean>(false);

    //función para actualizar la información del arreglo producto
    const changeStockProduct = (idProduct: number, quantity: number) => {
        //Nuevo arreglo con el stock actualizado
        const updateStock = productsState.map(product => product.id === idProduct
            ? { ...product, stock: product.stock - quantity }
            : product);
        //Actualizar productState
        setProductsState(updateStock);

        //llamar función agregar carrito
        addProduct(idProduct, quantity);
    }

    //función agregar los productos al carrito
    const addProduct = (idProduct: number, quantity: number) => {
        const product = productsState.find(product => product.id === idProduct);

        //Controlar si el producto no ha sido encontrado
        if (!product) {
            return;
        }

        //Si el producto fue encontrado - genero objeto car|producto
        const newProductCar: Car = {
            id: product.id,
            name: product.name,
            price: product.price,
            totalQuantity: quantity
        }

        //Agregar en el arreglo del carrito de compras
        setCar([...car, newProductCar]);
        //console.log(car);
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
