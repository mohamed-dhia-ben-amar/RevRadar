import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { Text, View, StyleSheet } from 'react-native';
import MapScreen from "../Bottom Nav Screens/MapScreen";
import AddPostScreen from "../Bottom Nav Screens/AddPostScreen";
import FeedScreen from "../Bottom Nav Screens/FeedScreen";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => (
    <Tab.Navigator
        screenOptions={{
            tabBarStyle: styles.tabBar,
            tabBarActiveTintColor: '#1E90FF',
            tabBarInactiveTintColor: '#888888',
        }}
    >
        <Tab.Screen
            name="Map"
            component={MapScreen}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <FontAwesome name="map" color={color} size={size} />
                ),
                headerShown: false,
            }}
        />
        <Tab.Screen
            name="Add Post"
            component={AddPostScreen}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <FontAwesome name="plus" color={color} size={size} />
                ),
                headerShown: false,
            }}
        />
        <Tab.Screen
            name="Feed"
            component={FeedScreen}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <FontAwesome name="rss" color={color} size={size} />
                ),
                headerShown: false,
            }}
        />
    </Tab.Navigator>
);

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212', // Match dark background
    },
    screenText: {
        color: '#FFFFFF',
        fontSize: 18,
    },
    tabBar: {
        backgroundColor: '#222222', // Dark theme tab bar
        borderTopColor: '#333333',  // Border for the tab bar
    },
});

export default BottomTabNavigator;
