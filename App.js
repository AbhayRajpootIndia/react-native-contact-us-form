import 'react-native-gesture-handler';

import { useEffect } from 'react';
import { Keyboard } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { PaperProvider } from 'react-native-paper';

import { Provider, useDispatch } from 'react-redux';
import { setIsKeyboardVisible } from './store/redux/keyboardSlice';

// navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainRouter from './routes/MainRouter';
import store from './store/redux/store';

const MainStack = createStackNavigator();

function AppRouter() {
  const dispatch = useDispatch();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        dispatch(setIsKeyboardVisible({ isKeyboardVisible: true }));
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        dispatch(setIsKeyboardVisible({ isKeyboardVisible: false }));
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <NavigationContainer>
      <MainStack.Navigator screenOptions={{ headerShown: false }}>
        <MainStack.Screen name="MainRouter" children={() => <MainRouter />} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <AppRouter />
        <StatusBar style="auto" />
      </PaperProvider>
    </Provider>
  );
}
