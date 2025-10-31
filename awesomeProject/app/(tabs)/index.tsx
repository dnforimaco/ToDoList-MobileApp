import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import GoalInput from '../../components/GoalInput';
import ScrollViewContainer from '../../components/ScrollViewContainer';
import { useGoalsStorage } from '../../hooks/useGoalsStorage';

export default function HomeScreen() {
  const { goals: courseGoals, addGoal, deleteGoal, clearAllGoals } = useGoalsStorage();
  const [modalVisible, setModalVisible] = useState(false);
  const [animationType, setAnimationType] = useState<'slide' | 'fade' | 'none'>('slide');
  const [modalTransparent, setModalTransparent] = useState(true);
  const [welcomeModalVisible, setWelcomeModalVisible] = useState(false);
  const [warningModalVisible, setWarningModalVisible] = useState(false);
  const [clearAllModalVisible, setClearAllModalVisible] = useState(false);

  function addGoalHandler(enteredGoalText: string) {
    console.log('addGoalHandler called with:', enteredGoalText);

    // Check if user has more than 5 goals before adding
    if (courseGoals.length >= 5) {
      console.log('Warning modal should appear now! Goals:', courseGoals.length + 1);
      setTimeout(() => setWarningModalVisible(true), 100);
    }

    addGoal(enteredGoalText);
  }

  function deleteGoalHandler(goalId: string) {
    deleteGoal(goalId);
  }

  return (
    <View style={styles.appContainer}>
      {/* Navigation Bar with Material Icons */}
      <View style={styles.navBar}>
        <View style={styles.navBarLeft}>
          <TouchableOpacity onPress={() => setWelcomeModalVisible(true)}>
            <MaterialIcons name="account-circle" size={28} color="#1a73e8" />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <MaterialIcons name="format-list-bulleted" size={24} color="#06b6d4" style={styles.appIcon} />
            <Text style={styles.appTitle}>Goals Manager</Text>
            {courseGoals.length > 0 && (
              <View style={styles.goalCountBadge}>
                <Text style={styles.goalCountText}>{courseGoals.length}</Text>
              </View>
            )}
          </View>
        </View>
        <View style={styles.navBarRight}>
          {courseGoals.length > 0 && (
            <TouchableOpacity style={styles.clearAllButton} onPress={() => setClearAllModalVisible(true)}>
              <MaterialIcons name="delete-forever" size={18} color="#ffffff" style={styles.buttonIcon} />
              <Text style={styles.clearAllButtonText}>Clear All</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.showModalButton} onPress={() => setModalVisible(true)}>
            <MaterialIcons name="info" size={18} color="#ffffff" style={styles.buttonIcon} />
            <Text style={styles.showModalButtonText}>Info</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal Example - Testing Different Props */}
      <Modal
        visible={modalVisible}
        animationType={animationType}
        transparent={modalTransparent}
        onRequestClose={() => {
          console.log('Modal close requested');
          setModalVisible(false);
        }}
        onShow={() => console.log(`Modal shown with ${animationType} animation`)}
        presentationStyle="overFullScreen"
      >
        <View style={styles.demoModalOverlay}>
          <View style={styles.demoModalContent}>
            <View style={styles.demoModalHeader}>
              <MaterialIcons name="animation" size={28} color="#1565c0" />
              <Text style={styles.demoModalTitle}>Modal Animation Demo</Text>
            </View>

            <View style={styles.demoModalInfo}>
              <View style={styles.infoRow}>
                <MaterialIcons name="animation" size={20} color="#06b6d4" />
                <Text style={styles.infoLabel}>Animation:</Text>
                <Text style={styles.infoValue}>{animationType}</Text>
              </View>
              <View style={styles.infoRow}>
                <MaterialIcons name="opacity" size={20} color="#06b6d4" />
                <Text style={styles.infoLabel}>Transparent:</Text>
                <Text style={styles.infoValue}>{modalTransparent ? 'Yes' : 'No'}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.demoCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <MaterialIcons name="close" size={20} color="#ffffff" style={styles.closeButtonIcon} />
              <Text style={styles.demoCloseButtonText}>Close Modal</Text>
            </TouchableOpacity>

            <View style={styles.demoSection}>
              <Text style={styles.demoSectionTitle}>Test Different Animations:</Text>
              <View style={styles.demoAnimationButtons}>
                <TouchableOpacity
                  style={[styles.demoAnimationButton, animationType === 'slide' && styles.demoAnimationButtonActive]}
                  onPress={() => setAnimationType('slide')}
                >
                  <MaterialIcons name="animation" size={18} color={animationType === 'slide' ? "#ffffff" : "#06b6d4"} />
                  <Text style={[styles.demoAnimationButtonText, animationType === 'slide' && styles.demoAnimationButtonTextActive]}>
                    Slide
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.demoAnimationButton, animationType === 'fade' && styles.demoAnimationButtonActive]}
                  onPress={() => setAnimationType('fade')}
                >
                  <MaterialIcons name="animation" size={18} color={animationType === 'fade' ? "#ffffff" : "#06b6d4"} />
                  <Text style={[styles.demoAnimationButtonText, animationType === 'fade' && styles.demoAnimationButtonTextActive]}>
                    Fade
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.demoAnimationButton, animationType === 'none' && styles.demoAnimationButtonActive]}
                  onPress={() => setAnimationType('none')}
                >
                  <MaterialIcons name="animation" size={18} color={animationType === 'none' ? "#ffffff" : "#06b6d4"} />
                  <Text style={[styles.demoAnimationButtonText, animationType === 'none' && styles.demoAnimationButtonTextActive]}>
                    None
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.demoTransparencyButton, !modalTransparent && styles.demoTransparencyButtonActive]}
              onPress={() => setModalTransparent(!modalTransparent)}
            >
              <MaterialIcons name={modalTransparent ? "visibility-off" : "visibility"} size={18} color="#ffffff" style={styles.transparencyButtonIcon} />
              <Text style={styles.demoTransparencyButtonText}>
                {modalTransparent ? "Remove Transparency" : "Add Transparency"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Welcome Modal */}
      <Modal
        visible={welcomeModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setWelcomeModalVisible(false)}
        presentationStyle="overFullScreen"
      >
        <View style={styles.welcomeModalOverlay}>
          <View style={styles.welcomeModalContent}>
            <View style={styles.welcomeModalIconContainer}>
              <MaterialIcons name="info" size={36} color="#1565c0" />
            </View>
            <Text style={styles.welcomeModalTitle}>Welcome!</Text>
            <Text style={styles.welcomeModalMessage}>Welcome to your Goals Manager application. Start adding your goals and track your progress!</Text>
            <TouchableOpacity
              style={styles.welcomeModalButton}
              onPress={() => setWelcomeModalVisible(false)}
            >
              <MaterialIcons name="check-circle" size={20} color="#ffffff" style={styles.welcomeButtonIcon} />
              <Text style={styles.welcomeModalButtonText}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Warning Modal for goal limit */}
      <Modal
        visible={warningModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => {
          console.log('Warning modal close requested');
          setWarningModalVisible(false);
        }}
        onShow={() => console.log('Warning modal is now visible')}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.warningModalContent}>
            <View style={styles.warningTitleContainer}>
              <MaterialIcons name="warning" size={32} color="#ff6b35" style={{ marginBottom: 8 }} />
              <Text style={styles.warningTitle}>Warning!</Text>
            </View>
            <Text style={styles.warningText}>
              You have more than 5 goals. Don&#39;t overwhelm yourself with too much burden! Consider focusing on fewer goals for better productivity.
            </Text>
            <TouchableOpacity
              style={styles.warningButton}
              onPress={() => {
                console.log('OK button pressed, closing warning modal');
                setWarningModalVisible(false);
              }}
            >
              <MaterialIcons name="check-circle" size={20} color="#ffffff" style={{ marginRight: 8 }} />
              <Text style={styles.warningButtonText}>I Understand</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Clear All Goals Confirmation Modal */}
      <Modal
        visible={clearAllModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setClearAllModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.clearAllModalContent}>
            <View style={styles.clearTitleContainer}>
              <MaterialIcons name="delete-forever" size={32} color="#ff6b35" style={{ marginBottom: 8 }} />
              <Text style={styles.clearTitle}>Clear All Goals</Text>
            </View>
            <Text style={styles.clearText}>
              Are you sure you want to delete all your goals? This action cannot be undone.
            </Text>
            <View style={styles.clearButtonContainer}>
              <TouchableOpacity
                style={styles.clearCancelButton}
                onPress={() => setClearAllModalVisible(false)}
              >
                <Text style={styles.clearCancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.clearConfirmButton}
                onPress={() => {
                  clearAllGoals();
                  setClearAllModalVisible(false);
                }}
              >
                <Text style={styles.clearConfirmButtonText}>Clear All</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <GoalInput onAddGoal={addGoalHandler} />

      <ScrollViewContainer
        goals={courseGoals}
        onDeleteGoal={deleteGoalHandler}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#f8f9fa', // Light background
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: '#ffffff', // Clean white background
    borderRadius: 24,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    borderWidth: 0,
  },
  navBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  navBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 16,
  },
  goalCountBadge: {
    backgroundColor: '#06b6d4',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
    minWidth: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goalCountText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
  },
  appTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2c3e50', // Dark blue-gray for the app title
    letterSpacing: 0.5,
  },
  containersWrapper: {
    flex: 1,
    flexDirection: 'row',
    gap: 12,
  },
  viewToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 12,
  },
  toggleButton: {
    backgroundColor: '#f0f0f0', // Light button background
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#cccccc', // Light gray border
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  activeToggleButton: {
    backgroundColor: '#06b6d4', // Cyan active background
    borderColor: '#0891b2',
    shadowColor: '#06b6d4',
    shadowOpacity: 0.3,
  },
  toggleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666', // Dark gray text for light background
    textAlign: 'center',
  },
  activeToggleButtonText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  singleContainerWrapper: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(26, 115, 232, 0.3)',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 20,
    width: '85%',
    maxWidth: 400,
    elevation: 10,
    shadowColor: '#1a73e8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    borderWidth: 2,
    borderColor: '#e3f2fd',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    color: '#1565c0',
  },
  modalSubtitle: {
    fontSize: 15,
    marginBottom: 6,
    textAlign: 'center',
    color: '#424242',
  },
  buttonContainer: {
    marginTop: 24,
  },
  animationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
    gap: 8,
  },
  primaryButton: {
    backgroundColor: '#5e0acc',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#5e0acc',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  secondaryButton: {
    backgroundColor: '#ecf0f1',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#bdc3c7',
  },
  secondaryButtonText: {
    color: '#2c3e50',
    fontWeight: '500',
    fontSize: 12,
  },
  welcomeModalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(5px)',
  },
  welcomeModalContent: {
    backgroundColor: '#ffffff',
    padding: 32,
    borderRadius: 24,
    width: '90%',
    maxWidth: 420,
    alignItems: 'center',
    elevation: 20,
    shadowColor: '#1a73e8',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    borderWidth: 0,
    position: 'relative',
    overflow: 'hidden',
  },
  welcomeModalIconContainer: {
    backgroundColor: '#e3f2fd',
    borderRadius: 50,
    padding: 16,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#1a73e8',
  },
  welcomeModalTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    color: '#1565c0',
    letterSpacing: 0.5,
  },
  welcomeModalMessage: {
    fontSize: 17,
    marginBottom: 28,
    textAlign: 'center',
    color: '#424242',
    lineHeight: 26,
    paddingHorizontal: 8,
  },
  welcomeModalButton: {
    backgroundColor: '#1a73e8',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 12,
    elevation: 6,
    shadowColor: '#1a73e8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 140,
  },
  welcomeModalButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  warningModalContent: {
    backgroundColor: '#ffffff',
    borderWidth: 0,
    padding: 32,
    borderRadius: 24,
    width: '90%',
    maxWidth: 420,
    elevation: 20,
    shadowColor: '#ff6b35',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  warningTitleContainer: {
    backgroundColor: '#fff5f5',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#ff6b35',
    alignItems: 'center',
  },
  warningTitle: {
    color: '#d63031',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  warningText: {
    fontSize: 17,
    lineHeight: 26,
    marginBottom: 24,
    textAlign: 'center',
    color: '#333',
    paddingHorizontal: 8,
  },
  warningButton: {
    backgroundColor: '#ff6b35',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 12,
    elevation: 6,
    shadowColor: '#ff6b35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 140,
  },
  warningButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.5,
  },

  showModalButton: {
    backgroundColor: '#06b6d4', // Cyan button
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#06b6d4',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: '#0891b2',
  },
  showModalButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  appIcon: {
    marginRight: 8,
  },
  buttonIcon: {
    marginRight: 6,
  },
  welcomeModalIcon: {
    marginBottom: 16,
    alignSelf: 'center',
  },
  welcomeButtonIcon: {
    marginRight: 8,
  },
  deleteModalContent: {
    backgroundColor: '#ffffff',
    borderWidth: 0,
    padding: 32,
    borderRadius: 24,
    width: '90%',
    maxWidth: 420,
    elevation: 20,
    shadowColor: '#e74c3c',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  deleteTitleContainer: {
    backgroundColor: '#ffebee',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#e74c3c',
    alignItems: 'center',
  },
  deleteTitle: {
    color: '#c0392b',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  deleteText: {
    fontSize: 17,
    lineHeight: 26,
    marginBottom: 28,
    textAlign: 'center',
    color: '#333',
    paddingHorizontal: 8,
  },
  deleteButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 16,
  },
  deleteCancelButton: {
    backgroundColor: '#95a5a6',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 10,
    elevation: 4,
    shadowColor: '#95a5a6',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  deleteCancelButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
    letterSpacing: 0.3,
  },
  deleteConfirmButton: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 10,
    elevation: 4,
    shadowColor: '#e74c3c',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  deleteConfirmButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
    letterSpacing: 0.3,
  },
  demoModalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(8px)',
  },
  demoModalContent: {
    backgroundColor: '#ffffff',
    padding: 28,
    borderRadius: 24,
    width: '90%',
    maxWidth: 450,
    elevation: 25,
    shadowColor: '#1565c0',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    borderWidth: 0,
    position: 'relative',
  },
  demoModalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#e3f2fd',
  },
  demoModalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1565c0',
    marginLeft: 12,
    letterSpacing: 0.5,
  },
  demoModalInfo: {
    backgroundColor: '#f8faff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#e3f2fd',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#424242',
    marginLeft: 8,
    marginRight: 8,
    minWidth: 90,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1565c0',
  },
  demoCloseButton: {
    backgroundColor: '#1a73e8',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
    elevation: 6,
    shadowColor: '#1a73e8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  demoCloseButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.5,
    marginLeft: 8,
  },
  closeButtonIcon: {
    marginRight: 8,
  },
  demoSection: {
    marginBottom: 24,
  },
  demoSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  demoAnimationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 12,
  },
  demoAnimationButton: {
    backgroundColor: '#f0f8ff',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#06b6d4',
    elevation: 3,
    shadowColor: '#06b6d4',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  demoAnimationButtonActive: {
    backgroundColor: '#06b6d4',
    borderColor: '#0891b2',
    shadowColor: '#06b6d4',
    shadowOpacity: 0.3,
  },
  demoAnimationButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#06b6d4',
    marginLeft: 6,
  },
  demoAnimationButtonTextActive: {
    color: '#ffffff',
    fontWeight: '700',
  },
  demoTransparencyButton: {
    backgroundColor: '#1a73e8',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
    elevation: 6,
    shadowColor: '#1a73e8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  demoTransparencyButtonActive: {
    backgroundColor: '#ff6b35',
    shadowColor: '#ff6b35',
  },
  demoTransparencyButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.5,
    marginLeft: 8,
  },
  transparencyButtonIcon: {
    marginRight: 8,
  },
  clearAllButton: {
    backgroundColor: '#ff6b35', // Orange-red for destructive action
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#ff6b35',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: '#e55a32',
  },
  clearAllButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  clearAllModalContent: {
    backgroundColor: '#ffffff',
    borderWidth: 0,
    padding: 32,
    borderRadius: 24,
    width: '90%',
    maxWidth: 420,
    elevation: 20,
    shadowColor: '#ff6b35',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  clearTitleContainer: {
    backgroundColor: '#fff5f5',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#ff6b35',
    alignItems: 'center',
  },
  clearTitle: {
    color: '#d63031',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  clearText: {
    fontSize: 17,
    lineHeight: 26,
    marginBottom: 24,
    textAlign: 'center',
    color: '#333',
    paddingHorizontal: 8,
  },
  clearButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 16,
  },
  clearCancelButton: {
    backgroundColor: '#95a5a6',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 10,
    elevation: 4,
    shadowColor: '#95a5a6',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  clearCancelButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
    letterSpacing: 0.3,
  },
  clearConfirmButton: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 10,
    elevation: 4,
    shadowColor: '#e74c3c',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  clearConfirmButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
    letterSpacing: 0.3,
  },
});
