import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button } from 'react-native-paper';

const PhotoPicker = ({ photo, setPhoto }) => {
    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            setPhoto(result.assets[0].uri); // Use the URI from the first asset
        }
    };

    return (
        <View style={styles.container}>
            <Button
                icon="plus"
                mode="outlined"
                onPress={pickImage}
                style={styles.iconButton}
            >
                Choose Picture
            </Button>
            <View style={styles.imageContainer}>
                {photo ? (
                    <Image source={{ uri: photo }} style={styles.image} />
                ) : (
                    <Text style={styles.noImageText}>No image selected</Text>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: 16,
        width: '100%',
    },
    iconButton: {
        borderColor: '#1E90FF',
        borderWidth: 1,
        borderRadius: 8,
        padding: 2,
    },
    imageContainer: {
        width: 400,
        height: 400,
        borderWidth: 1,
        borderColor: '#333333',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    noImageText: {
        color: '#888888',
    },
});

export default PhotoPicker;
