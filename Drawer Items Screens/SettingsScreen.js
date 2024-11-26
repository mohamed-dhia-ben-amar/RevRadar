import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SettingsScreen = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(previousState => !previousState);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Account Information</Text>
                <View style={styles.item}>
                    <Icon name="envelope" size={20} color="#888" />
                    <Text style={styles.itemText}>Email: user@example.com</Text>
                </View>
                <View style={styles.item}>
                    <Icon name="calendar" size={20} color="#888" />
                    <Text style={styles.itemText}>Member Since: January 2021</Text>
                </View>
                <View style={styles.item}>
                    <Icon name="star" size={20} color="#888" />
                    <Text style={styles.itemText}>Current Plan: Free</Text>
                </View>
                <TouchableOpacity style={styles.item}>
                    <Icon name="refresh" size={20} color="#888" />
                    <Text style={styles.itemText}>Reset Password</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}>
                    <Icon name="sign-out" size={20} color="#888" />
                    <Text style={styles.itemText}>Sign Out</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>App Information</Text>
                <TouchableOpacity style={styles.item}>
                    <Icon name="file-text" size={20} color="#888" />
                    <Text style={styles.itemText}>Release Notes</Text>
                </TouchableOpacity>
                <View style={styles.item}>
                    <Icon name="info-circle" size={20} color="#888" />
                    <Text style={styles.itemText}>Version: 1.0.0</Text>
                </View>
                <TouchableOpacity style={styles.item}>
                    <Icon name="question-circle" size={20} color="#888" />
                    <Text style={styles.itemText}>FAQ</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Tools</Text>
                <View style={styles.item}>
                    <Icon name="moon-o" size={20} color="#888" />
                    <Text style={styles.itemText}>Dark Mode</Text>
                    <Switch
                        value={isDarkMode}
                        onValueChange={toggleDarkMode}
                        style={styles.switch}
                    />
                </View>
                <TouchableOpacity style={styles.proButton}>
                    <Icon name="star" size={20} color="gold" />
                    <Text style={styles.proButtonText}>Go Pro</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000', // Black background
        padding: 16,
        paddingVertical: 30,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 12,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    itemText: {
        fontSize: 16,
        color: '#fff',
        marginLeft: 10,
        flex: 1,
    },
    switch: {
        marginLeft: 'auto',
    },
    proButton: {
        backgroundColor: '#1e90ff',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 20,
        alignItems: 'center',
        alignSelf: 'center',
        elevation: 2,
        display: 'flex',
        flexDirection: 'row',
        gap: 10
    },
    proButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default SettingsScreen;