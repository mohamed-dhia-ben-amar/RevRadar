import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import colors from '../colors'; // Import colors
import ProgressBar from 'react-native-progress/Bar';

const dummyData = [
    {
        id: '1',
        username: 'Harold Rhoads',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        points: 2302,
        level: 30,
    },
    {
        id: '2',
        username: 'Phyllis Woods',
        avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
        points: 2127,
        level: 30,
    },
    {
        id: '3',
        username: 'Frank Guy',
        avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
        points: 1992,
        level: 28,
    },
    {
        id: '4',
        username: 'Corinne Gregg',
        avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
        points: 1942,
        level: 28,
    },
    {
        id: '5',
        username: 'Alan Foland',
        avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
        points: 1864,
        level: 26,
    },
];

const RankingPage = () => {
    const renderItem = ({ item, index }) => {
        const rankColor = [
            colors.gold,
            colors.silver,
            colors.bronze,
            colors.white,
            colors.white,
        ][index] || colors.white;

        return (
            <View style={styles.item}>
                <View style={styles.rankContainer}>
                    <Text style={[styles.rank, { color: rankColor }]}>{index + 1}</Text>
                </View>
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
                <View style={styles.infoContainer}>
                    <Text style={styles.username}>{item.username}</Text>
                    <ProgressBar
                        progress={item.level / 30}
                        width={100}
                        height={6}
                        color={colors.progress}
                        unfilledColor={colors.lightGray}
                        borderWidth={0}
                    />
                    <Text style={styles.level}>Level {item.level}</Text>
                </View>
                <Text style={styles.points}>{item.points} pts</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Friends Leaderboard</Text>
            <FlatList
                data={dummyData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        padding: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: colors.darkGray,
        textAlign: 'center',
        marginBottom: 16,
    },
    list: {
        paddingBottom: 20,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.cardBackground,
        borderRadius: 12,
        padding: 12,
        marginVertical: 8,
        elevation: 3,
    },
    rankContainer: {
        width: 30,
        alignItems: 'center',
    },
    rank: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginHorizontal: 12,
    },
    infoContainer: {
        flex: 1,
    },
    username: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.white,
    },
    level: {
        fontSize: 12,
        color: colors.lightGray,
        marginTop: 4,
    },
    points: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.white,
    },
});

export default RankingPage;
