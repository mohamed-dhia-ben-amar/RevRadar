import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Platform, KeyboardAvoidingView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';
import colors from '../colors'; // Import the colors

const ResetPasswordScreen = ({ navigation }) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    return (
        <KeyboardAvoidingView style={styles.background} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Image source={require('../assets/revRadarLogo.webp')} style={styles.logo} />
            <Formik
                initialValues={{ password: '', confirmPassword: '' }}
                validationSchema={Yup.object({
                    password: Yup.string().required('Required'),
                    confirmPassword: Yup.string()
                        .oneOf([Yup.ref('password'), null], 'Passwords must match')
                        .required('Required'),
                })}
                onSubmit={(values) => {
                    // Simulate reset password process
                    if (values.password === 'aaa') {
                        Toast.show({
                            type: 'success',
                            text1: 'Password Reset Successful',
                            text2: 'You can now log in with your new password.',
                        });
                        navigation.navigate('Sign In');
                    } else {
                        Toast.show({
                            type: 'error',
                            text1: 'Password Reset Failed',
                            text2: 'Please try again.',
                        });
                    }
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={styles.formContainer}>
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

                        <TouchableOpacity onPress={handleSubmit} style={styles.resetButton}>
                            <Text style={styles.resetButtonText}>Reset Password</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('Sign In')} style={styles.backToLoginButton}>
                            <Text style={styles.backToLoginButtonText}>Back to Login</Text>
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
    resetButton: {
        backgroundColor: colors.darkGray,
        paddingVertical: 12,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    resetButtonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    backToLoginButton: {
        marginTop: 20,
    },
    backToLoginButtonText: {
        color: colors.lightGray,
        fontSize: 16,
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
        fontSize: 12,
        alignSelf: 'flex-start',
    },
});

export default ResetPasswordScreen;