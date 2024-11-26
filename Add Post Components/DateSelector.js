import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Provider} from 'react-native-paper';
import {Calendar} from 'react-native-calendars';
import CheckBox from "expo-checkbox";

const DateSelector = ({date, setDate}) => {
    const [selectedDate, setSelectedDate] = useState(date);
    const [useToday, setUseToday] = useState(false);

    const onDayPress = (day) => {
        setSelectedDate(day.dateString);
        setDate(new Date(day.dateString));
    };

    const handleUseTodayChange = () => {
        const today = new Date().toISOString().split('T')[0];
        setUseToday(!useToday);
        if (!useToday) {
            setSelectedDate(today);
            setDate(new Date(today));
        }
    };

    return (
        <Provider>
            <View style={styles.container}>
                <Text style={styles.selectDateText}>Please select date</Text>
                <Calendar
                    style={styles.calendar}
                    theme={{
                        backgroundColor: '#ffffff',
                        calendarBackground: '#ffffff',
                        textSectionTitleColor: '#b6c1cd',
                        selectedDayBackgroundColor: '#00adf5',
                        selectedDayTextColor: '#ffffff',
                        todayTextColor: '#00adf5',
                        dayTextColor: '#2d4150',
                        textDisabledColor: '#d9e1e8'
                    }}
                    onDayPress={onDayPress}
                    markedDates={{
                        [selectedDate]: {selected: true, marked: true, selectedColor: 'blue'},
                    }}
                />
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        value={useToday}
                        onValueChange={handleUseTodayChange}
                        style={styles.checkbox}
                    />
                    <Text style={styles.checkboxLabel}>Use today's date</Text>
                </View>
            </View>
        </Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 16,
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    selectDateText: {
        fontSize: 18,
        marginBottom: 8,
        color: '#000',
    },
    calendar: {
        width: Dimensions.get('window').width,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
    },
    checkboxLabel: {
        marginLeft: 8,
        fontSize: 16,
        color: 'white',
    },
});

export default DateSelector;