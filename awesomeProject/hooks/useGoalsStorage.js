import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const GOALS_STORAGE_KEY = '@goals';

export const useGoalsStorage = () => {
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load goals from AsyncStorage on component mount
  useEffect(() => {
    const loadGoals = async () => {
      try {
        const storedGoals = await AsyncStorage.getItem(GOALS_STORAGE_KEY);
        if (storedGoals) {
          const parsedGoals = JSON.parse(storedGoals);
          setGoals(parsedGoals);
        }
      } catch (error) {
        console.error('Error loading goals:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadGoals();
  }, []);

  // Save goals to AsyncStorage whenever goals change
  const saveGoals = async (newGoals) => {
    try {
      await AsyncStorage.setItem(GOALS_STORAGE_KEY, JSON.stringify(newGoals));
      setGoals(newGoals);
    } catch (error) {
      console.error('Error saving goals:', error);
    }
  };

  const addGoal = async (goalText) => {
    if (goalText.trim().length === 0) return;

    const newGoal = {
      text: goalText,
      key: Math.random().toString(),
      id: Date.now().toString() + Math.random().toString()
    };

    const updatedGoals = [...goals, newGoal];
    await saveGoals(updatedGoals);
  };

  const deleteGoal = async (goalId) => {
    const updatedGoals = goals.filter((goal) => goal.id !== goalId);
    await saveGoals(updatedGoals);
  };

  const clearAllGoals = async () => {
    try {
      await AsyncStorage.removeItem(GOALS_STORAGE_KEY);
      setGoals([]);
    } catch (error) {
      console.error('Error clearing goals:', error);
    }
  };

  const exportGoals = async () => {
    try {
      const storedGoals = await AsyncStorage.getItem(GOALS_STORAGE_KEY);
      return storedGoals || '[]';
    } catch (error) {
      console.error('Error exporting goals:', error);
      return null;
    }
  };

  const importGoals = async (goalsData) => {
    try {
      const parsedGoals = JSON.parse(goalsData);
      if (Array.isArray(parsedGoals)) {
        await saveGoals(parsedGoals);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error importing goals:', error);
      return false;
    }
  };

  return {
    goals,
    isLoading,
    addGoal,
    deleteGoal,
    clearAllGoals,
    exportGoals,
    importGoals,
  };
};
