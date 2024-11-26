import React, { useState } from 'react';
import { View, StyleSheet, Button, Text, Modal, TextInput, FlatList, ScrollView, Image } from 'react-native';
import PhotoPicker from '../Add Post Components/PhotoPicker';
import CarDetailsForm from '../Add Post Components/CarDetailsForm';
import DateSelector from '../Add Post Components/DateSelector';
import LocationSelector from '../Add Post Components/LocationSelector';
import ShareButton from '../Add Post Components/ShareButton';

const AddPostScreen = () => {
    const [step, setStep] = useState(1);
    const [photo, setPhoto] = useState(null);
    const [caption, setCaption] = useState('');
    const [carDetails, setCarDetails] = useState({});
    const [date, setDate] = useState(new Date());
    const [location, setLocation] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const handleNextStep = () => setStep(step + 1);
    const handlePreviousStep = () => setStep(step - 1);

    const handleShare = () => {
        setModalVisible(true);
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return <PhotoPicker photo={photo} setPhoto={setPhoto} />;
            case 2:
                return (
                    <View>
                        <Text style={styles.label}>Caption:</Text>
                        <TextInput
                            style={styles.input}
                            value={caption}
                            onChangeText={setCaption}
                        />
                        <CarDetailsForm carDetails={carDetails} setCarDetails={setCarDetails} photo={photo} />
                    </View>
                );
            case 3:
                return <DateSelector date={date} setDate={setDate} />;
            case 4:
                return <LocationSelector location={location} setLocation={setLocation} />;
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={[{ key: 'form' }]}
                renderItem={renderStep}
                keyExtractor={(item) => item.key}
                ListFooterComponent={
                    <View style={styles.buttonContainer}>
                        {step > 1 && <Button title="Previous" onPress={handlePreviousStep} />}
                        {step < 4 && <Button title="Next" onPress={handleNextStep} />}
                        {step === 4 && <ShareButton onPress={handleShare} />}
                    </View>
                }
            />
            <Modal visible={modalVisible} animationType="slide">
                <ScrollView contentContainerStyle={styles.modalContent}>
                    {photo && <Image source={{ uri: photo }} style={styles.modalImage} />}
                    <Text style={styles.modalText}>Caption: {caption}</Text>
                    <Text style={styles.modalText}>Car Details: {JSON.stringify(carDetails, null, 2)}</Text>
                    <Text style={styles.modalText}>Date: {date.toDateString()}</Text>
                    <Text style={styles.modalText}>Location: {location ? `${location.coords.latitude}, ${location.coords.longitude}` : 'N/A'}</Text>
                    <Button title="Close" onPress={() => setModalVisible(false)} />
                </ScrollView>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#121212',
    },
    label: {
        color: '#FFFFFF',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#333333',
        padding: 8,
        marginVertical: 8,
        color: '#FFFFFF',
        borderRadius: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    modalContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#121212',
    },
    modalText: {
        color: '#FFFFFF',
        marginBottom: 8,
        textAlign: 'center',
    },
    modalImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 16,
    },
});

export default AddPostScreen;