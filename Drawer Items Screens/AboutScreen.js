import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";

const AboutScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <Image source={require('../assets/revRadarLogo.webp')} style={styles.logo} />
            <Text style={styles.title}>Welcome to RevRadar</Text>

            <Text style={styles.sectionTitle}>Our Mission</Text>
            <Text style={styles.paragraph}>
                RevRadar is a community-driven platform for car enthusiasts, designed to help you discover and share amazing cars spotted in your city and beyond.
                Whether you're passionate about exotic supercars, classic collectibles, or unique street finds, RevRadar is the place to connect with other enthusiasts.
            </Text>

            <Text style={styles.sectionTitle}>Key Features</Text>
            <View style={styles.feature}>
                <Text style={styles.featureBullet}>•</Text>
                <Text style={styles.featureText}>Capture and post photos of unique cars you've spotted.</Text>
            </View>
            <View style={styles.feature}>
                <Text style={styles.featureBullet}>•</Text>
                <Text style={styles.featureText}>Pin car locations on the map to share the exact spot.</Text>
            </View>
            <View style={styles.feature}>
                <Text style={styles.featureBullet}>•</Text>
                <Text style={styles.featureText}>Engage with other users through likes and comments.</Text>
            </View>
            <View style={styles.feature}>
                <Text style={styles.featureBullet}>•</Text>
                <Text style={styles.featureText}>Follow other car spotters and build your own network.</Text>
            </View>

            <Text style={styles.sectionTitle}>Go Pro</Text>
            <Text style={styles.paragraph}>
                Upgrade to RevRadar Pro to unlock exclusive features:
            </Text>
            <View style={styles.feature}>
                <Text style={styles.featureBullet}>•</Text>
                <Text style={styles.featureText}>View car sightings in real-time and get notified instantly.</Text>
            </View>
            <View style={styles.feature}>
                <Text style={styles.featureBullet}>•</Text>
                <Text style={styles.featureText}>Access advanced filters and sorting for car search.</Text>
            </View>
            <View style={styles.feature}>
                <Text style={styles.featureBullet}>•</Text>
                <Text style={styles.featureText}>Get priority support and early access to new features.</Text>
            </View>

            <TouchableOpacity style={styles.proButton}>
                <Icon name="star" size={16} color="gold" style={styles.proIcon} />
                <Text style={styles.proButtonText}>Upgrade to Pro</Text>
            </TouchableOpacity>

            <Text style={styles.footer}>
                Thank you for being part of the RevRadar community. We’re excited to see what you discover!
            </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#000', // Black background
        paddingHorizontal: 20,
        gap: 10,
    },
    logo: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        marginBottom: 20,
        borderRadius: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        textAlign: 'center',
        color: '#fff', // White text
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#fff', // White text
        marginBottom: 10,
        marginTop: 20,
    },
    paragraph: {
        fontSize: 16,
        color: '#fff', // White text
        lineHeight: 22,
        marginBottom: 10,
    },
    feature: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    featureBullet: {
        fontSize: 18,
        color: '#fff', // White text
        marginRight: 8,
    },
    featureText: {
        fontSize: 16,
        color: '#fff', // White text
        flex: 1,
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
        gap: 10,
    },
    proButtonText: {
        color: '#fff', // White text
        fontSize: 16,
        fontWeight: '600',
    },
    footer: {
        fontSize: 14,
        color: '#fff', // White text
        textAlign: 'center',
        marginVertical: 30,
    },
});

export default AboutScreen;
