import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CustomToast from './CustomToast';
import AuthStack from './navigation/AuthStack';
import MainNavigator from './components/MainNavigator';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Auth" component={AuthStack} />
                <Stack.Screen name="Home" component={MainNavigator} />
            </Stack.Navigator>
            <CustomToast />
        </NavigationContainer>
    );
};

export default App;