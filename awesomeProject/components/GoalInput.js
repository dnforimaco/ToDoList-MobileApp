import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function GoalInput({ onAddGoal }) {
  const [enteredGoal, setEnteredGoal] = useState('');

  function textInputHandler(enteredText) {
    setEnteredGoal(enteredText);
  }

  function addGoalHandler() {
    if (enteredGoal.trim().length === 0) return;
    onAddGoal(enteredGoal);
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
      <TouchableOpacity
        style={[styles.addButton, enteredGoal.trim().length > 0 && styles.addButtonActive]}
        onPress={addGoalHandler}
        disabled={enteredGoal.trim().length === 0}
      >
        <Text style={[styles.addButtonText, enteredGoal.trim().length > 0 && styles.addButtonTextActive]}>
          {enteredGoal.trim().length > 0 ? 'ADD GOAL' : '+'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 24,
    backgroundColor: '#1e293b', // Modern dark card
    borderRadius: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  textInput: {
    borderWidth: 2,
    borderColor: '#06b6d4', // Cyan border
    borderRadius: 16,
    width: '68%',
    marginRight: 14,
    paddingHorizontal: 18,
    paddingVertical: 14,
    backgroundColor: '#334155', // Dark input background
    fontSize: 16,
    color: '#e2e8f0', // Light text
    elevation: 2,
    shadowColor: '#06b6d4',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  addButton: {
    backgroundColor: '#6c757d', // Gray when disabled
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#6c757d',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#8e9ba1',
  },
  addButtonActive: {
    backgroundColor: '#06b6d4', // Cyan when active
    elevation: 6,
    shadowColor: '#06b6d4',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    borderColor: '#0891b2',
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  addButtonTextActive: {
    color: '#ffffff',
    fontWeight: '700',
  },
});
