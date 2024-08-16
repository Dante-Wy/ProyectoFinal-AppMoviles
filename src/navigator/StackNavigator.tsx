import { createStackNavigator } from '@react-navigation/stack';
import { useState } from 'react';
import { PRIMARY_COLOR } from '../commons/constantsColor';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';

export interface User {
    id: number;
    email: string;
    password: string;
}

const Stack = createStackNavigator();

export const StackNavigator = () => {
    const users: User[] = [
        { id: 1, email: 'wyepez@gmail.com', password: '123456' },
        { id: 2, email: 'willian@gmail.com', password: '654321' }
    ];

    const [listUsers, setListUsers] = useState<User[]>(users);

    const handleAddUser = (user: User) => {
        setListUsers([...listUsers, user]);
    }

    return (
        <Stack.Navigator
            screenOptions={{
                cardStyle: {
                    backgroundColor: PRIMARY_COLOR
                }
            }}>
            <Stack.Screen
                name="Login"
                options={{ headerShown: false }}
                children={() => <LoginScreen users={listUsers} />} />
            <Stack.Screen
                name="Register"
                options={{ headerShown: false }}
                children={() => <RegisterScreen users={listUsers} handleAddUser={handleAddUser} />} />
            <Stack.Screen
                name='Home'
                options={{ headerShown: false }}
                component={HomeScreen}
            />
        </Stack.Navigator>
    );
}
