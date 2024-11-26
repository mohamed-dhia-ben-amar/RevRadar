import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Text, Modal } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../colors'; // Import the colors
import FeedScreen from './FeedScreen';
import RankingPage from "../pages/RankingPage";
import MenuPage from "../pages/MenuPage"; // Import the FeedScreen

const MapScreen = () => {
    const [location, setLocation] = useState(null);
    const [expandedButton, setExpandedButton] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [buttons, setButtons] = useState([
        { id: 'ranking', icon: 'star', text: 'Ranking' },
        { id: 'menu', icon: 'menu', text: 'Menu' },
        { id: 'feed', icon: 'rss-feed', text: 'Feed' },
    ]);

    const [markers, setMarkers] = useState([
        {
            coordinate: { latitude: 33.8869, longitude: 9.5375 },
            title: 'Marker 1',
            description: 'This is marker 1 in Tunisia',
        },
        {
            coordinate: { latitude: 36.8065, longitude: 10.1815 },
            title: 'Marker 2',
            description: 'This is marker 2 in Tunisia',
        },
    ]);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    const centerMapOnUserLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
    };

    const handleButtonPress = (buttonId) => {
        const clickedButton = buttons.find((btn) => btn.id === buttonId);
        const reorderedButtons = [
            clickedButton,
            ...buttons.filter((btn) => btn.id !== buttonId),
        ];

        setButtons(reorderedButtons);
        setModalContent(clickedButton.text);
        setExpandedButton(buttonId);
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 33.8869,
                    longitude: 9.5375,
                    latitudeDelta: 5,
                    longitudeDelta: 5,
                }}
                region={
                    location
                        ? {
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }
                        : null
                }
            >
                {markers.map((marker, index) => (
                    <Marker
                        key={index}
                        coordinate={marker.coordinate}
                        title={marker.title}
                        description={marker.description}
                    />
                ))}
            </MapView>
            <View style={styles.topLeftButtonContainer}>
                {buttons.map((button, index) => (
                    <TouchableOpacity
                        key={button.id}
                        style={[
                            styles.circularButton,
                            expandedButton === button.id && styles.expandedButton,
                        ]}
                        onPress={() => handleButtonPress(button.id)}
                    >
                        <Icon name={button.icon} size={24} color={colors.white} />
                        {expandedButton === button.id && (
                            <Text style={styles.buttonText}>{button.text}</Text>
                        )}
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={centerMapOnUserLocation} style={styles.iconButton}>
                    <Icon name="my-location" size={30} color={colors.white} />
                </TouchableOpacity>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                    setExpandedButton(null);
                }}
            >
                <View style={styles.modalView}>

                    {modalContent === 'Ranking' && <RankingPage />}
                    {modalContent === 'Menu' && <MenuPage />}
                    {modalContent === 'Feed' && <FeedScreen />}

                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => {
                            setModalVisible(!modalVisible);
                            setExpandedButton(null);
                        }}
                    >
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    topLeftButtonContainer: {
        position: 'absolute',
        top: 20,
        left: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    circularButton: {
        backgroundColor: colors.darkGray,
        borderRadius: 25,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    expandedButton: {
        width: 120,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 10,
    },
    buttonText: {
        color: colors.white,
        fontSize: 16,
        marginLeft: 5,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: colors.white,
        borderRadius: 50,
        padding: 10,
        elevation: 5,
    },
    iconButton: {
        backgroundColor: colors.darkGray,
        borderRadius: 50,
        padding: 10,
    },
    modalView: {
        position: 'absolute',
        top: 170, // Adjust this value to position the modal below the menu button
        bottom: 100, // Adjust this value to position the modal above the positioning button
        left: 25,
        right: 20,
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    closeButton: {
        marginTop: 10,
        backgroundColor: colors.darkGray,
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
    },
    closeButtonText: {
        color: colors.white,
        fontWeight: 'bold',
    },
});

export default MapScreen;