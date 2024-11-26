import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../colors'; // Import the colors

const PostCard = ({ image, user, location, description, likes, comments, timeSpotted, byMe }) => {
    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Avatar.Image size={40} source={{ uri: user.avatar }} />
                <View style={styles.userDetails}>
                    <Text style={styles.userName}>{user.name}</Text>
                    <Text style={styles.location}>{location}</Text>
                </View>
                {!byMe && (
                    <TouchableOpacity style={styles.followButton}>
                        <Text style={styles.followText}>Follow</Text>
                    </TouchableOpacity>
                )}
            </View>
            <Image
                source={{ uri: image }}
                style={styles.image}
            />
            <View style={styles.postDetails}>
                <Text style={styles.description}>{description}</Text>
                <Text style={styles.timeSpotted}>Spotted {timeSpotted} ago</Text>
            </View>
            <View style={styles.interactionRow}>
                <TouchableOpacity style={styles.iconButton}>
                    <Icon name="thumbs-up" size={20} color={colors.gray} />
                    <Text style={styles.iconText}>{likes}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                    <Icon name="comment" size={20} color={colors.gray} />
                    <Text style={styles.iconText}>{comments}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                    <Icon name="share" size={20} color={colors.gray} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.darkGray,
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 16,
        elevation: 5,
        width: '100%', // Make the card occupy the full width of the modal
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        paddingBottom: 0,
    },
    userDetails: {
        flex: 1,
        marginLeft: 10,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.white,
    },
    location: {
        fontSize: 13,
        color: colors.lightGray,
    },
    followButton: {
        backgroundColor: colors.gray,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
    },
    followText: {
        color: colors.white,
        fontSize: 13,
        fontWeight: '500',
    },
    image: {
        width: '100%',
        height: 200,
    },
    postDetails: {
        padding: 12,
        paddingBottom: 0,
    },
    description: {
        fontSize: 15,
        color: colors.white,
        marginBottom: 4,
    },
    timeSpotted: {
        fontSize: 12,
        color: colors.gray,
    },
    interactionRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: colors.gray,
    },
    iconButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconText: {
        color: colors.gray,
        marginLeft: 6,
        fontSize: 14,
    },
});

export default PostCard;