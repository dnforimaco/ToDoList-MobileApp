import { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ScrollViewContainer({ goals, onDeleteGoal }) {
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [goalToDelete, setGoalToDelete] = useState(null);

  const showConfirmDialog = (goalId) => {
    setGoalToDelete(goalId);
    setConfirmModalVisible(true);
  };

  const handleConfirmDelete = () => {
    if (goalToDelete) {
      onDeleteGoal(goalToDelete);
      setGoalToDelete(null);
    }
    setConfirmModalVisible(false);
  };

  const handleCancelDelete = () => {
    setGoalToDelete(null);
    setConfirmModalVisible(false);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Goals (ScrollView)</Text>
      <ScrollView style={styles.scrollView}>
        {goals.map((goal) => (
          <View key={goal.key} style={styles.goalItem}>
            <Text style={[styles.goalText, {color: '#e2e8f0'}]}>{goal.text}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => showConfirmDialog(goal.id)}
            >
              <Text style={styles.deleteButtonText}>DELETE</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Confirmation Modal */}
      <Modal
        visible={confirmModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCancelDelete}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.confirmModalContent}>
            <Text style={styles.confirmModalTitle}>Confirm Deletion</Text>
            <Text style={styles.confirmModalMessage}>
              Are you sure you want to delete this goal? This action cannot be undone.
            </Text>
            <View style={styles.confirmButtonContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancelDelete}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmDeleteButton}
                onPress={handleConfirmDelete}
              >
                <Text style={styles.confirmDeleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e293b', // Modern dark card
    borderRadius: 20,
    padding: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#06b6d4', // Cyan accent
    paddingBottom: 10,
    borderBottomWidth: 3,
    borderBottomColor: '#06b6d4',
  },
  scrollView: {
    flex: 1,
  },
  goalItem: {
    backgroundColor: '#334155', // Dark item background
    padding: 16,
    marginBottom: 14,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#06b6d4', // Cyan accent
    elevation: 4,
    shadowColor: '#06b6d4',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  goalLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  goalIcon: {
    marginRight: 12,
  },
  goalText: {
    flex: 1,
    fontSize: 16,
    color: '#e2e8f0', // Light text for dark background
    fontWeight: '500',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#f44336',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  confirmModalContent: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 16,
    width: '85%',
    maxWidth: 350,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  confirmModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#d63031',
  },
  confirmModalMessage: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
    color: '#333',
    lineHeight: 22,
  },
  confirmButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 16,
  },
  cancelButton: {
    backgroundColor: '#6c757d',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#6c757d',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    flex: 1,
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  confirmDeleteButton: {
    backgroundColor: '#f44336',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#f44336',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    flex: 1,
  },
  confirmDeleteButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
});
