import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Button, Modal, StyleSheet, Text, View } from 'react-native';
import FlatListContainer from './components/FlatListContainer.js';
import GoalInput from './components/GoalInput.js';
import ScrollViewContainer from './components/ScrollViewContainer.js';


export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [animationType, setAnimationType] = useState('slide');
  const [modalTransparent, setModalTransparent] = useState(true);
  const [warningModalVisible, setWarningModalVisible] = useState(false);


  function addGoalHandler(enteredGoalText) {
    console.log('addGoalHandler called with:', enteredGoalText);
    if (enteredGoalText.trim().length === 0) {
      return;
    }

    const newGoal = {
      text: enteredGoalText,
      key: Math.random().toString(),
      id: Date.now().toString() + Math.random().toString()
    };

    setCourseGoals((currentGoals) => {
      const newGoals = [...currentGoals, newGoal];
      console.log('Current goals count:', currentGoals.length);
      console.log('New goals count:', newGoals.length);

      // Show warning modal if goals exceed 5
      if (newGoals.length > 5 && currentGoals.length <= 5) {
        console.log('Warning modal should appear now! Goals:', newGoals.length);
        setTimeout(() => setWarningModalVisible(true), 100);
      }

      return newGoals;
    });
  }


  function deleteGoalHandler(goalId) {
    setCourseGoals((currentGoals) => {
      return currentGoals.filter((goal) => goal.id !== goalId);
    });
  }


  return (
    <View style={styles.appContainer}>
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
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Modal Content</Text>
            <Text style={styles.modalSubtitle}>Animation: {animationType}</Text>
            <Text style={styles.modalSubtitle}>Transparent: {modalTransparent ? 'Yes' : 'No'}</Text>

            <View style={styles.buttonContainer}>
              <Button title="Close Modal" onPress={() => setModalVisible(false)} />
              <View style={{ marginTop: 10 }}>
                <Text>Test Different Animations:</Text>
                <View style={styles.animationButtons}>
                  <Button title="Slide" onPress={() => setAnimationType('slide')} />
                  <Button title="Fade" onPress={() => setAnimationType('fade')} />
                  <Button title="None" onPress={() => setAnimationType('none')} />
                </View>
              </View>
              <View style={{ marginTop: 10 }}>
                <Button
                  title={modalTransparent ? "Remove Transparency" : "Add Transparency"}
                  onPress={() => setModalTransparent(!modalTransparent)}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* Warning Modal for too many goals */}
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
          <View style={[styles.modalContent, styles.warningModalContent]}>
            <Text style={[styles.modalTitle, styles.warningTitle]}>Warning</Text>
            <Text style={styles.warningText}>
              You have more than 5 goals. Don't overwhelm yourself with too much burden!
            </Text>
            <View style={styles.buttonContainer}>
              <Button
                title="OK"
                onPress={() => {
                  console.log('OK button pressed, closing warning modal');
                  setWarningModalVisible(false);
                }}
                color="#2196F3"
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Navigation Bar with Material Icons */}
      <View style={styles.navBar}>
        <View style={styles.navBarLeft}>
          <MaterialIcons name="account-circle" size={28} color="#5e0acc" style={{ marginRight: 8 }} />
          <Text style={styles.appTitle}>Goal Manager - Component Demo</Text>
        </View>
        <View style={styles.navBarRight}>
          <MaterialIcons name="settings" size={24} color="#666" style={{ marginRight: 12 }} />
          <Button title="Show Modal" onPress={() => setModalVisible(true)} />
          <Button title="Test Warning" onPress={() => {
            console.log('Testing warning modal manually');
            setWarningModalVisible(true);
          }} />
        </View>
      </View>


      <GoalInput onAddGoal={addGoalHandler} />

      {/* Manual Warning Test Button */}
      <View style={styles.testButtonContainer}>
        <Button
          title="TEST WARNING MODAL"
          onPress={() => {
            console.log('Manual warning test triggered');
            setWarningModalVisible(true);
          }}
          color="#ff6b35"
        />
      </View>

      <View style={styles.containersWrapper}>
        <ScrollViewContainer
          goals={courseGoals}
          onDeleteGoal={deleteGoalHandler}
        />
        <FlatListContainer
          goals={courseGoals}
          onDeleteGoal={deleteGoalHandler}
        />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: '#f0f0f0',
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  navBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  navBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  containersWrapper: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 20,
  },
  animationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  warningModalContent: {
    backgroundColor: '#fff5f5',
    borderWidth: 2,
    borderColor: '#ff6b35',
  },
  warningTitle: {
    color: '#d63031',
    fontSize: 22,
  },
  warningText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
    textAlign: 'left',
    color: '#333',
  },
  testButtonContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
});
