import React from 'react';
import { Button, StyleSheet } from 'react-native';

const ShareButton = ({ onPress }) => {
    return (
        <Button
            title="Share"
            onPress={onPress}
            color="#1E90FF"
            disabled={false} // Add validation logic here
        />
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#1E90FF',
        borderRadius: 8,
        padding: 10,
    },
});

export default ShareButton;