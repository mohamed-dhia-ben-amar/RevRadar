import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Platform, KeyboardAvoidingView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';
import colors from '../colors'; // Import the colors

const SignUpScreen = ({ navigation }) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    return (
        <KeyboardAvoidingView style={styles.background} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Image source={require('../assets/revRadarLogo.webp')} style={styles.logo} />
            <Text style={styles.title}>Sign Up Now</Text>
            <Text style={styles.subtitle}>Please sign up to create an account</Text>

            <Formik
                initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
                validationSchema={Yup.object({
                    username: Yup.string().required('Required'),
                    email: Yup.string().email('Invalid email address').required('Required'),
                    password: Yup.string().required('Required'),
                    confirmPassword: Yup.string()
                        .oneOf([Yup.ref('password'), null], 'Passwords must match')
                        .required('Required'),
                })}
                onSubmit={(values) => {
                    if (values.email === 'test@example.com') {
                        Toast.show({
                            type: 'error',
                            text1: 'Sign Up Failed',
                            text2: 'Email already in use.',
                        });
                    } else {
                        Toast.show({
                            type: 'success',
                            text1: 'Sign Up Successful',
                            text2: 'Welcome!',
                        });
                        navigation.navigate('Sign In');
                    }
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={styles.formContainer}>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                placeholder="Username"
                                placeholderTextColor={colors.gray}
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                value={values.username}
                                style={styles.input}
                            />
                            {touched.username && errors.username ? <Text style={styles.error}>{errors.username}</Text> : null}
                        </View>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                placeholder="Email"
                                placeholderTextColor={colors.gray}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                style={styles.input}
                            />
                            {touched.email && errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}

                        </View>
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

                        <View style={styles.passwordContainer}>
                            <TextInput
                                placeholder="Confirm Password"
                                placeholderTextColor={colors.gray}
                                onChangeText={handleChange('confirmPassword')}
                                onBlur={handleBlur('confirmPassword')}
                                value={values.confirmPassword}
                                secureTextEntry={!confirmPasswordVisible}
                                style={styles.input}
                            />
                            <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)} style={styles.toggleButton}>
                                <Icon name={confirmPasswordVisible ? 'eye' : 'eye-slash'} size={20} color={colors.gray} />
                            </TouchableOpacity>
                        </View>
                        {touched.confirmPassword && errors.confirmPassword ? <Text style={styles.error}>{errors.confirmPassword}</Text> : null}

                        <TouchableOpacity onPress={handleSubmit} style={styles.signUpButton}>
                            <Text style={styles.signUpButtonText}>Sign Up</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('Sign In')}>
                            <Text style={styles.signInText}>
                                Already have an account? <Text style={styles.signInLink}>Sign In</Text>
                            </Text>
                        </TouchableOpacity>
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
    signUpButton: {
        backgroundColor: colors.darkGray,
        paddingVertical: 12,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    signUpButtonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    signInText: {
        color: colors.lightGray,
        marginTop: 10,
    },
    signInLink: {
        color: colors.white,
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
        fontSize: 12,
        alignSelf: 'flex-start',
    },
});

export default SignUpScreen;