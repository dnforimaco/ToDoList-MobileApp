import { FlatList, StyleSheet, View } from 'react-native';
import GoalItem from './GoalItem';

export default function GoalList({ goals }) {
    return (
        <View style={StyleSheet.listContainer}>
            <FlatList
                data={goals}
                renderItem={(itemData) => <GoalItem text={itemData.item.text} />}
                keyExtractor={(item) => itemm.key}
                />
        </View>
    );
}

const styles = StyleSheet.create({
    listContainer: {
        flex: 0.5,
        marginTop: -5,
    },
});