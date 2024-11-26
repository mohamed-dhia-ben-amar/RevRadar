import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Keyboard, Platform, KeyboardAvoidingView } from 'react-native';
import { Formik } from 'formik';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import colors from '../colors'; // Import the colors

const VerifyEmailScreen = ({ navigation }) => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([]);

    useFocusEffect(
        React.useCallback(() => {
            setOtp(['', '', '', '', '', '']);
        }, [])
    );

    const handleChange = (text, index) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        if (text && index < otp.length - 1) {
            inputRefs.current[index + 1].focus();
        } else if (index === otp.length - 1) {
            Keyboard.dismiss();
        }
    };

    const handleSubmit = () => {
        const otpString = otp.join('');
        if (otpString.length === 6) {
            // Simulate verify email process
            if (otpString === '123456') {
                Toast.show({
                    type: 'success',
                    text1: 'Verification Successful',
                    text2: 'Your email has been verified.',
                });
                navigation.navigate('Reset Password');
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Verification Failed',
                    text2: 'Invalid OTP.',
                });
            }
        } else {
            Toast.show({
                type: 'info',
                text1: 'Incomplete OTP',
                text2: 'Please enter the complete OTP.',
            });
        }
    };

    return (
        <KeyboardAvoidingView style={styles.background} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Image source={require('../assets/revRadarLogo.webp')} style={styles.logo} />
            <Text style={styles.title}>Verify Email</Text>
            <Text style={styles.subtitle}>Please enter the OTP sent to your email</Text>

            <Formik
                initialValues={{ otp: '' }}
                onSubmit={handleSubmit}
            >
                {({ handleSubmit }) => (
                    <View style={styles.formContainer}>
                        <View style={styles.otpContainer}>
                            {otp.map((digit, index) => (
                                <TextInput
                                    key={index}
                                    style={styles.otpInput}
                                    keyboardType="numeric"
                                    maxLength={1}
                                    onChangeText={(text) => handleChange(text, index)}
                                    value={digit}
                                    ref={(ref) => (inputRefs.current[index] = ref)}
                                    onSubmitEditing={() => {
                                        if (index < otp.length - 1) {
                                            inputRefs.current[index + 1].focus();
                                        } else {
                                            Keyboard.dismiss();
                                        }
                                    }}
                                />
                            ))}
                        </View>
                        {otp.join('').length !== 6 && <Text style={styles.error}>OTP is incomplete</Text>}

                        <TouchableOpacity onPress={handleSubmit} style={styles.verifyButton}>
                            <Text style={styles.verifyButtonText}>Verify Email</Text>
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
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginBottom: 20,
    },
    otpInput: {
        width: 40,
        height: 48,
        borderColor: colors.darkGray,
        borderWidth: 1,
        borderRadius: 8,
        textAlign: 'center',
        color: colors.white,
        backgroundColor: colors.black,
    },
    verifyButton: {
        backgroundColor: colors.darkGray,
        paddingVertical: 12,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    verifyButtonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
        fontSize: 12,
        alignSelf: 'flex-start',
    },
});

export default VerifyEmailScreen;