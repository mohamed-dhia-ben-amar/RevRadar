import React, { useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Platform, KeyboardAvoidingView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import colors from '../colors'; // Import the colors

const ForgotPasswordScreen = ({ navigation }) => {
    const formikRef = useRef();

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
            <Text style={styles.title}>Forgot Password</Text>
            <Text style={styles.subtitle}>Please enter your email to reset your password</Text>

            <Formik
                innerRef={formikRef}
                initialValues={{ email: '' }}
                validationSchema={Yup.object({
                    email: Yup.string().email('Invalid email address').required('Required'),
                })}
                onSubmit={(values) => {
                    // Simulate a forgot password process
                    if (values.email === 'test@example.com') {
                        Toast.show({
                            type: 'error',
                            text1: 'Reset Failed',
                            text2: 'Email not found.',
                        });
                    } else {
                        Toast.show({
                            type: 'success',
                            text1: 'Reset Email Sent',
                            text2: 'Check your email to reset your password.',
                        });
                        navigation.navigate('Verify Email');
                    }
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={styles.formContainer}>
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor={colors.gray}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            style={styles.input}
                        />
                        {touched.email && errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}

                        <TouchableOpacity onPress={handleSubmit} style={styles.resetButton}>
                            <Text style={styles.resetButtonText}>Reset Password</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('Sign In')}>
                            <Text style={styles.signInText}>
                                Remembered your password? <Text style={styles.signInLink}>Sign In</Text>
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
        width: '100%',
        height: 48,
        borderColor: colors.darkGray,
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 15,
        marginBottom: 10,
        color: colors.white,
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

export default ForgotPasswordScreen;