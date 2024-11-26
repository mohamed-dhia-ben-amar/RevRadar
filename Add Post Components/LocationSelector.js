import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

const LocationSelector = ({ location, setLocation }) => {
    const selectLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
    };

    return (
        <View style={styles.container}>
            <Button mode="contained" onPress={selectLocation} style={styles.button}>
                Select Location
            </Button>
            {location && (
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        }}
                    />
                </MapView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 16,
        padding: 16,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        alignItems: 'center',
    },
    button: {
        marginBottom: 16,
    },
    map: {
        width: '100%',
        height: 200,
        borderRadius: 8,
    },
});

export default LocationSelector;