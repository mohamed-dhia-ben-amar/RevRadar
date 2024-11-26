import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../colors';

const MenuPage = () => {
    const menuItems = [
        { id: '1', name: 'Garage', icon: 'car' },
        { id: '2', name: 'Events', icon: 'calendar' },
        { id: '3', name: 'Friends', icon: 'account-group' },
        { id: '4', name: 'Settings', icon: 'cog' },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Menu</Text>
            <View style={styles.menuList}>
                {menuItems.map((item, index) => (
                    <View key={item.id}>
                        <TouchableOpacity style={styles.menuItem}>
                            <Icon name={item.icon} size={32} color={colors.lightGray} style={styles.icon} />
                            <Text style={styles.menuText}>{item.name}</Text>
                        </TouchableOpacity>
                        {index < menuItems.length - 1 && <View style={styles.divider} />}
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        padding: 16,
        borderColor: colors.darkGray,
        borderWidth: 1,
        borderRadius: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.darkGray,
        textAlign: 'center',
        marginBottom: 20,
    },
    menuList: {
        flex: 1,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    icon: {
        marginRight: 16,
    },
    menuText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.darkGray,
    },
    divider: {
        height: 1,
        backgroundColor: colors.black,
        marginHorizontal: 16,
    },
});

export default MenuPage;