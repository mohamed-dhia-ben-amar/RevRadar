import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import VerifyEmailScreen from '../screens/VerifyEmailScreen';
import MultiStepSplashScreen from "../screens/MultiStepSplashScreen";

const Stack = createStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#121212',
                    shadowOpacity: 0,
                },
                headerTintColor: '#FFFFFF',
                gestureEnabled: false,
            }}
        >
            <Stack.Screen name="Splash" component={MultiStepSplashScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Sign In" component={SignInScreen} options={{
                headerLeft: null,
                ...TransitionPresets.SlideFromRightIOS,
            }}/>
            <Stack.Screen
                name="Sign Up"
                component={SignUpScreen}
                options={{
                    headerLeft: null,
                    ...TransitionPresets.SlideFromRightIOS,
                }}
            />
            <Stack.Screen
                name="Forgot Password"
                component={ForgotPasswordScreen}
                options={{
                    headerLeft: null,
                    ...TransitionPresets.SlideFromRightIOS,
                }}
            />
            <Stack.Screen
                name="Verify Email"
                component={VerifyEmailScreen}
                options={{
                    headerLeft: null,
                    ...TransitionPresets.SlideFromRightIOS,
                }}
            />
            <Stack.Screen
                name="Reset Password"
                component={ResetPasswordScreen}
                options={{
                    headerLeft: null,
                    ...TransitionPresets.SlideFromRightIOS,
                }}
            />
        </Stack.Navigator>
    );
};

export default AuthStack;