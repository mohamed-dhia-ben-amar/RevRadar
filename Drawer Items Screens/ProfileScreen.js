import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import PostCard from '../components/cards/PostCard';

const user = {
    avatar: 'https://avatar.iran.liara.run/public/5',
    username: 'John Doe',
    followers: 1200,
    following: 300,
    posts: 50,
};

const userSpots = [
    {
        id: '1',
        image: 'https://placehold.co/600x400/png?text=Sample+Image',
        user: {
            avatar: 'https://avatar.iran.liara.run/public/5',
            name: 'John Doe',
        },
        location: 'New York, NY',
        description: 'Spotted this amazing car!',
        likes: 120,
        comments: 30,
        timeSpotted: '2 hours',
    },
    {
        id: '2',
        image: 'https://placehold.co/600x400/png?text=Sample+Image',
        user: {
            avatar: 'https://avatar.iran.liara.run/public/5',
            name: 'John Doe',
        },
        location: 'Los Angeles, CA',
        description: 'Check out this beauty!',
        likes: 200,
        comments: 50,
        timeSpotted: '1 day',
    },
    // Add more spots as needed
];

const ProfileScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.userDetails}>
                <Image source={{ uri: user.avatar }} style={styles.avatar} />
                <Text style={styles.username}>{user.username}</Text>
                <View style={styles.statsContainer}>
                    <View style={styles.stat}>
                        <Text style={styles.statNumber}>{user.followers}</Text>
                        <Text style={styles.statLabel}>Followers</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text style={styles.statNumber}>{user.following}</Text>
                        <Text style={styles.statLabel}>Following</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text style={styles.statNumber}>{user.posts}</Text>
                        <Text style={styles.statLabel}>Posts</Text>
                    </View>
                </View>
            </View>
            <FlatList
                data={userSpots}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <PostCard
                        image={item.image}
                        user={item.user}
                        location={item.location}
                        description={item.description}
                        likes={item.likes}
                        comments={item.comments}
                        timeSpotted={item.timeSpotted}
                        byMe={true}
                    />
                )}
                ListHeaderComponent={<Text style={styles.sectionTitle}>User Spots</Text>}
                contentContainerStyle={styles.flatListContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0d0d0d', // Darker background for better contrast
    },
    userDetails: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#1c1c1e',
        margin: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: '#fff',
    },
    username: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#f5f5f5',
        marginBottom: 10,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginTop: 15,
    },
    stat: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#e6e6e6',
    },
    statLabel: {
        fontSize: 14,
        color: '#888',
        marginTop: 5,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#f5f5f5',
        padding: 12,
        backgroundColor: '#1c1c1e',
        textAlign: 'center',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginBottom: 10,
    },
    flatListContent: {
        paddingBottom: 20,
    },
});

export default ProfileScreen;
