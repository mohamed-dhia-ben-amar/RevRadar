import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    Button as NativeButton,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
    KeyboardAvoidingView, Platform
} from 'react-native';
import CheckBox from "expo-checkbox";
import Svg, { Path } from 'react-native-svg';
import { Button } from 'react-native-paper';

const DownArrowIcon = () => (
    <Svg height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
        <Path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
    </Svg>
);

const UpArrowIcon = () => (
    <Svg height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
        <Path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z" />
    </Svg>
);

const FillOutIcon = () => (
    <Svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
        <Path
            d="m490-527 37 37 217-217-37-37-217 217ZM200-200h37l233-233-37-37-233 233v37Zm355-205L405-555l167-167-29-29-219 219-56-56 218-219q24-24 56.5-24t56.5 24l29 29 50-50q12-12 28.5-12t28.5 12l93 93q12 12 12 28.5T828-678L555-405ZM270-120H120v-150l285-285 150 150-285 285Z" />
    </Svg>
);

const CarDetailsForm = ({ carDetails, setCarDetails, photo }) => {
    const [plateNumber, setPlateNumber] = useState(carDetails.plateNumber || '');
    const [unknownPlate, setUnknownPlate] = useState(carDetails.unknownPlate || false);
    const [carColor, setCarColor] = useState(carDetails.carColor || '');
    const [carMake, setCarMake] = useState(carDetails.carMake || '');
    const [carMakeResults, setCarMakeResults] = useState([]);
    const [carMakeDropdownVisible, setCarMakeDropdownVisible] = useState(false);
    const [carColorDropdownVisible, setCarColorDropdownVisible] = useState(false);

    useEffect(() => {
        setCarDetails({
            plateNumber,
            unknownPlate,
            carColor,
            carMake
        });
    }, [plateNumber, unknownPlate, carColor, carMake]);

    const handleSearch = () => {
        // Implement search functionality
    };

    const fetchCarMakes = async (make) => {
        try {
            const response = await fetch(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/all-vehicles-model/records?select=*&where=make="${make}"&limit=15`);
            const data = await response.json();
            if (data.results) {
                setCarMakeResults(data.results.map(record => ({
                    make: record.make,
                    model: record.model,
                    year: record.year
                })));
            } else {
                setCarMakeResults([]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleCarMakeChange = (text) => {
        setCarMake(text);
        if (text.length > 2) {
            fetchCarMakes(text);
            setCarMakeDropdownVisible(true);
        } else {
            setCarMakeDropdownVisible(false);
        }
    };

    const colors = ['Red', 'Blue', 'Green', 'Black', 'White', 'Gray', 'Yellow'];

    const handleCarMakeSelect = (item) => {
        setCarMake(`${item.make} ${item.model} (${item.year})`);
        setCarMakeDropdownVisible(false);
    };

    const handleCarColorSelect = (color) => {
        setCarColor(color);
        setCarColorDropdownVisible(false);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            {photo && <Image source={{ uri: photo }} style={styles.image} />}
            <Button
                icon={FillOutIcon}
                mode="contained"
                onPress={() => console.log('Fill Automatically pressed')}
                style={styles.fillButton}
            >
                Fill Automatically
            </Button>
            <Text style={styles.label}>Car Details</Text>
            <View style={styles.row}>
                <TextInput
                    style={styles.input}
                    placeholder="Car Plate Number"
                    placeholderTextColor="#888888"
                    value={plateNumber}
                    onChangeText={setPlateNumber}
                    editable={!unknownPlate}
                />
                <NativeButton title="Search" onPress={handleSearch} />
            </View>
            <View style={styles.checkboxContainer}>
                <CheckBox
                    disabled={false}
                    value={unknownPlate}
                    onValueChange={(newValue) => setUnknownPlate(newValue)}
                    style={styles.checkbox}
                />
                <Text style={styles.checkboxLabel}>I don't know the plate number</Text>
            </View>
            {unknownPlate && (
                <View>
                    <TouchableOpacity style={styles.dropdown}
                                      onPress={() => setCarMakeDropdownVisible(!carMakeDropdownVisible)}>
                        <TextInput
                            style={styles.input}
                            placeholder="Car Make"
                            placeholderTextColor="#888888"
                            value={carMake}
                            onChangeText={handleCarMakeChange}
                        />
                        {carMakeDropdownVisible ? <UpArrowIcon /> : <DownArrowIcon />}
                    </TouchableOpacity>
                    {carMakeDropdownVisible && (
                        <FlatList
                            data={carMakeResults}
                            keyExtractor={(item) => `${item.make}-${item.model}-${item.year}`}
                            renderItem={({ item }) => (
                                <Text style={styles.dropdownItem} onPress={() => handleCarMakeSelect(item)}>
                                    {item.make} {item.model} ({item.year})
                                </Text>
                            )}
                            style={styles.dropdownList}
                        />
                    )}
                    <TouchableOpacity style={styles.dropdown}
                                      onPress={() => setCarColorDropdownVisible(!carColorDropdownVisible)}>
                        <TextInput
                            style={styles.input}
                            placeholder="Car Color"
                            placeholderTextColor="#888888"
                            value={carColor}
                            onChangeText={setCarColor}
                        />
                        {carColorDropdownVisible ? <UpArrowIcon /> : <DownArrowIcon />}
                    </TouchableOpacity>
                    {carColorDropdownVisible && (
                        <FlatList
                            data={colors}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <Text style={styles.dropdownItem} onPress={() => handleCarColorSelect(item)}>
                                    {item}
                                </Text>
                            )}
                            style={styles.dropdownList}
                        />
                    )}
                </View>
            )}
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 16,
        paddingVertical: 24,
        gap: 16,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 16,
    },
    fillButton: {
        marginBottom: 16,
    },
    label: {
        color: '#FFFFFF',
        marginBottom: 8,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#333333',
        padding: 8,
        marginVertical: 8,
        color: '#FFFFFF',
        borderRadius: 8,
        flex: 1,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    checkbox: {
        marginRight: 8,
    },
    checkboxLabel: {
        color: '#FFFFFF',
    },
    dropdown: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        position: 'absolute',
        right: 10,
    },
    dropdownList: {
        backgroundColor: '#333333',
        borderRadius: 8,
        marginTop: 8,
    },
    dropdownItem: {
        padding: 8,
        color: '#FFFFFF',
    },
});

export default CarDetailsForm;