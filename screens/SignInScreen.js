import React, { useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Platform, KeyboardAvoidingView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import colors from '../colors'; // Import the colors

const SignInScreen = ({ navigation }) => {
    const formikRef = useRef();
    const [passwordVisible, setPasswordVisible] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            if (formikRef.current) {
                formikRef.current.resetForm();
            }
        }, [])
    );

    return (
        <KeyboardAvoidingView style={styles.background} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Image source={require('../assets/revRadarLogo.webp')} style={styles.logo} />
            <Text style={styles.title}>Log In Now</Text>
            <Text style={styles.subtitle}>Please log in to continue using our app</Text>

            <Formik
                innerRef={formikRef}
                initialValues={{ email: '', password: '' }}
                validationSchema={Yup.object({
                    email: Yup.string().email('Invalid email address').required('Required'),
                    password: Yup.string().required('Required'),
                })}
                onSubmit={(values) => {
                    if (values.email === 'A@a' && values.password === 'aaa') {
                        Toast.show({
                            type: 'success',
                            text1: 'Login Successful',
                            text2: 'Welcome back!',
                        });
                        navigation.navigate('Home'); // Redirect to homepage
                    } else {
                        Toast.show({
                            type: 'error',
                            text1: 'Login Failed',
                            text2: 'Invalid email or password.',
                        });
                    }
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={styles.formContainer}>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                placeholder="Email"
                                placeholderTextColor={colors.gray}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                style={styles.input}
                            />
                        </View>
                        {touched.email && errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}

                        <View style={styles.passwordContainer}>
                            <TextInput
                                placeholder="Password"
                                placeholderTextColor={colors.gray}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                secureTextEntry={!passwordVisible}
                                style={styles.input}
                            />
                            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={styles.toggleButton}>
                                <Icon name={passwordVisible ? 'eye' : 'eye-slash'} size={20} color={colors.gray} />
                            </TouchableOpacity>
                        </View>
                        {touched.password && errors.password ? <Text style={styles.error}>{errors.password}</Text> : null}

                        <TouchableOpacity onPress={() => navigation.navigate('Forgot Password')} style={styles.forgotPasswordContainer}>
                            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleSubmit} style={styles.signInButton}>
                            <Text style={styles.signInButtonText}>Log In</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('Sign Up')}>
                            <Text style={styles.signUpText}>
                                Don't have an account? <Text style={styles.signUpLink}>Sign Up</Text>
                            </Text>
                        </TouchableOpacity>

                        <Text style={styles.connectWithText}>Or connect with</Text>
                        <View style={styles.socialButtonsContainer}>
                            <TouchableOpacity style={[styles.socialButton, styles.googleButton]}>
                                <Icon name="google" size={20} color={colors.white} />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.socialButton, styles.facebookButton]}>
                                <Icon name="facebook" size={20} color={colors.white} />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.socialButton, styles.appleButton]}>
                                <Icon name="apple" size={20} color={colors.white} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </Formik>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.black,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        gap: 10,
    },
    logo: {
        width: 150,
        height: 150,
        marginVertical: 30,
        borderRadius: 75,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.white,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: colors.lightGray,
        marginBottom: 20,
    },
    formContainer: {
        width: '100%',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        height: 48,
        borderColor: colors.darkGray,
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 15,
        color: colors.white,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,
    },
    toggleButton: {
        padding: 10,
    },
    forgotPasswordContainer: {
        alignSelf: 'flex-end',
        marginBottom: 10,
    },
    forgotPasswordText: {
        color: colors.lightGray,
        fontSize: 12,
    },
    signInButton: {
        backgroundColor: colors.darkGray,
        paddingVertical: 12,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    signInButtonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    signUpText: {
        color: colors.lightGray,
        marginTop: 10,
    },
    signUpLink: {
        color: colors.white,
        fontWeight: 'bold',
    },
    connectWithText: {
        color: colors.lightGray,
        marginTop: 20,
    },
    socialButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    socialButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    googleButton: {
        backgroundColor: '#DB4437',
    },
    facebookButton: {
        backgroundColor: '#3B5998',
    },
    appleButton: {
        backgroundColor: colors.black,
    },
    error: {
        color: 'red',
        fontSize: 12,
        alignSelf: 'flex-start',
    },
});

export default SignInScreen;