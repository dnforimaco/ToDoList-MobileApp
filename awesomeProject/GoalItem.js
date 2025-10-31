
import { StyleSheet, Text, View } from 'react-native';

export default function GoalItem({ text }) {
    return (
        <View style={styles.goalItem}>
            <Text style={styles.goalText}>{text}</Text> 
        </View>

    );

}

const styles = Stylesheet.create({
    goalItem: {
        marginVertical: 6,
        padding: 8,
        borderRadius: 7,
        backgroundColor:'#a5d6a7',
    },
    goalText: {
        fontSize: 16,
        color: '#000',
    },
});
