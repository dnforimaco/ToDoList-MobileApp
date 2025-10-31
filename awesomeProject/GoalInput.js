
import { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Stylesheet } 
from 'react-native';

export default function GoalInput({ onAddGoal }) { 
    const [enteredGoal, setEnteredGoal] = useState('');
    
    function textInputHandler(enteredText) { 
        setEnteredGoal (enteredText);
}
function addGoalHandler() { 
    if (enteredGoal.trim().length === 0) return; 
    onAddGoal (enteredGoal); 
    setEnteredGoal('');
}
return (
    <View style={styles.inputContainer}>
    <TextInput
        placeholder="Your course goal!"
    style={styles.textInput}
    onChangeText={textInputHandler}
    value={enteredGoal}
    />
    <TouchableOpacity style={styles.addButton} onPress={addGoalHandler}
    >
        <Text style={styles.addButtonText}>ADD_GOAL</Text> 
        </TouchableOpacity>
    </View>
);
}

