import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { FontAwesome } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';
import BottomTabNavigator from './BottomTabNavigator';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AboutScreen from "../Drawer Items Screens/AboutScreen";
import ProfileScreen from "../Drawer Items Screens/ProfileScreen";
import SettingsScreen from "../Drawer Items Screens/SettingsScreen";
import MapScreen from "../Bottom Nav Screens/MapScreen";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContent}>
        <View style={styles.drawerItemsContainer}>
            <DrawerItem
                label="Home"
                onPress={() => props.navigation.navigate('Home')}
                icon={({ size }) => <FontAwesome name="home" color="white" size={size} />}
                labelStyle={styles.drawerLabel}
            />
            <DrawerItem
                label="Settings"
                onPress={() => props.navigation.navigate('Settings')}
                icon={({ size }) => <FontAwesome name="cog" color="white" size={size} />}
                labelStyle={styles.drawerLabel}
            />
            <DrawerItem
                label="Profile"
                onPress={() => props.navigation.navigate('Profile')}
                icon={({ size }) => <FontAwesome name="user" color="white" size={size} />}
                labelStyle={styles.drawerLabel}
            />
            <DrawerItem
                label="About Us"
                onPress={() => props.navigation.navigate('About Us')}
                icon={({ size }) => <FontAwesome name="info-circle" color="white" size={size} />}
                labelStyle={styles.drawerLabel}
            />
            <View style={styles.divider} />
            <View style={styles.socialContainer}>
                <FontAwesome name="instagram" size={24} color="white" />
                <FontAwesome name="facebook" size={24} color="white" />
                <FontAwesome5 name="tiktok" size={24} color="white" />
            </View>
            <View style={styles.divider} />
            <DrawerItem
                label="Terms of Use"
                onPress={() => {}}
                icon={({ size }) => <FontAwesome name="file-text" color="white" size={size} />}
                labelStyle={styles.drawerLabel}
            />
            <DrawerItem
                label="Privacy Policy"
                onPress={() => {}}
                icon={({ size }) => <FontAwesome name="lock" color="white" size={size} />}
                labelStyle={styles.drawerLabel}
            />
            <DrawerItem
                label="Go Pro"
                onPress={() => {}}
                icon={({ size }) => <FontAwesome name="star" color="white" size={size} />}
                labelStyle={styles.drawerLabel}
            />
        </View>
        <View style={styles.copyrightContainer}>
            <Text style={styles.copyrightText}>© 2024 RevRadar All Rights Reserved</Text>
        </View>
    </DrawerContentScrollView>
);

const DrawerNavigator = () => (
    <Drawer.Navigator
        screenOptions={{
            drawerStyle: styles.drawerStyle,
            drawerActiveTintColor: '#1E90FF',
            drawerInactiveTintColor: '#CCCCCC',
            headerStyle: styles.headerStyle,
            headerTitleStyle: styles.headerTitleStyle,
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
        <Drawer.Screen name="Home" component={MapScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="About Us" component={AboutScreen} />
    </Drawer.Navigator>
);

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212', // Match dark background
    },
    screenText: {
        color: 'white',
        fontSize: 18,
    },
    drawerContent: {
        flex: 1,
        paddingVertical: 10,
    },
    drawerItemsContainer: {
        flex: 1,
    },
    headerText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    drawerLabel: {
        color: 'white',  // Drawer label color to match dark theme
        fontSize: 16,
        paddingLeft: 10,
    },
    drawerStyle: {
        backgroundColor: '#222222', // Dark drawer background
        borderRadius: 15,
        paddingTop: 5,
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
        paddingHorizontal: 10,
    },
    divider: {
        height: 1,
        backgroundColor: '#444444',
        marginVertical: 10,
    },
    headerStyle: {
        backgroundColor: '#333333', // Darker background for header
        elevation: 4, // Adds shadow to the header for better contrast
    },
    headerTitleStyle: {
        color: 'white', // White text for header
        fontSize: 18,
    },
    copyrightContainer: {
        paddingBottom: 60,
        alignItems: 'center',
    },
    copyrightText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'monospace',
    },
});

export default DrawerNavigator;