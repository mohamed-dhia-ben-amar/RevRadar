import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../colors'; // Import the colors

const { width } = Dimensions.get('window');

const splashData = [
    { text: 'Welcome to RevRadar App!' },
    { text: 'Share and spot fancy cars!' },
    { text: 'Earn points and badges!' },
    { text: 'Win prizes and more!' },
];

const MultiStepSplashScreen = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [imagesPreloaded, setImagesPreloaded] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        // Simulate image preloading
        setTimeout(() => {
            setImagesPreloaded(true);
        }, 1000);
    }, []);

    useEffect(() => {
        if (currentStep >= splashData.length) {
            navigation.navigate('Sign In');
        }
    }, [currentStep]);

    const handleSwipe = ({ nativeEvent }) => {
        if (nativeEvent.state === State.END) {
            if (nativeEvent.translationX < -50 && currentStep < splashData.length - 1) {
                setCurrentStep((prevStep) => prevStep + 1);
            } else if (nativeEvent.translationX > 50 && currentStep === splashData.length - 1) {
                navigation.navigate('Sign In');
            }
        }
    };

    if (!imagesPreloaded) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.darkGray} />
            </View>
        );
    }

    return (
        <PanGestureHandler onHandlerStateChange={handleSwipe}>
            <Animated.View style={styles.container}>
                <LinearGradient
                    colors={[colors.lightGray, colors.darkGray]} // Define your gradient colors here
                    style={styles.background}
                >
                    <Text style={styles.text}>{splashData[currentStep].text}</Text>
                    <View style={styles.indicatorContainer}>
                        {splashData.map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.indicator,
                                    currentStep === index && styles.activeIndicator,
                                ]}
                            />
                        ))}
                    </View>
                    {currentStep === splashData.length - 1 && (
                        <TouchableOpacity
                            style={styles.getStartedButton}
                            onPress={() => navigation.navigate('Sign In')}
                        >
                            <Text style={styles.getStartedButtonText}>Get Started</Text>
                        </TouchableOpacity>
                    )}
                </LinearGradient>
            </Animated.View>
        </PanGestureHandler>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width,
    },
    text: {
        fontSize: 18,
        color: colors.white,
        marginVertical: 20,
        textAlign: 'center',
    },
    indicatorContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 100,
    },
    indicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: colors.gray,
        marginHorizontal: 5,
    },
    activeIndicator: {
        backgroundColor: colors.white,
    },
    getStartedButton: {
        position: 'absolute',
        bottom: 50,
        borderColor: colors.white,
        borderWidth: 2,
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 30,
    },
    getStartedButtonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default MultiStepSplashScreen;