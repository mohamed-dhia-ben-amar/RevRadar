import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import PostCard from '../components/cards/PostCard';
import colors from '../../rev-radar/colors'; // Import the colors

const dummyData = [
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
            avatar: 'https://avatar.iran.liara.run/public/87',
            name: 'Jane Smith',
        },
        location: 'Los Angeles, CA',
        description: 'Check out this beauty!',
        likes: 200,
        comments: 50,
        timeSpotted: '1 day',
    },
    {
        id: '3',
        image: 'https://placehold.co/600x400/png?text=Sample+Image',
        user: {
            avatar: 'https://avatar.iran.liara.run/public/87',
            name: 'Alice Johnson',
        },
        location: 'Chicago, IL',
        description: 'Love this classic car!',
        likes: 150,
        comments: 40,
        timeSpotted: '3 hours',
    },
    {
        id: '4',
        image: 'https://placehold.co/600x400/png?text=Sample+Image',
        user: {
            avatar: 'https://avatar.iran.liara.run/public/5',
            name: 'Bob Brown',
        },
        location: 'Houston, TX',
        description: 'What a stunning car!',
        likes: 180,
        comments: 60,
        timeSpotted: '5 hours',
    },
];

const FeedScreen = () => {
    return (
        <View style={styles.container}>
            <FlatList
                data={dummyData}
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
                        byMe={false}
                    />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: colors.white,
    },
});

export default FeedScreen;