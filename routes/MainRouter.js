import { MaterialIcons } from '@expo/vector-icons';

// screens
import ContactUsScreen from '../screens/ContactUsScreen';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useWindowDimensions } from 'react-native';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import MainTabBar from '../components/MainTabBar';

const MainTab = createBottomTabNavigator();

export default function MainRouter() {
  const { height } = useWindowDimensions();
  const iconSize = useMemo(() => height * 0.04 || 5, [height]);
  const tabBarHeight = useMemo(() => height * 0.08 || 30, [height]);
  const isKeyboardVisible = useSelector(
    (state) => state.keyboard.isKeyboardVisible
  );

  return (
    <MainTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'black',
        tabBarStyle: {
          height: tabBarHeight,
          paddingVertical: 5,
          opacity: isKeyboardVisible ? 0 : 1,
        },
      }}
      tabBar={(props) => <MainTabBar {...props} />}
    >
      <MainTab.Screen
        name="ContactUsScreen"
        children={() => <ContactUsScreen />}
        options={{
          tabBarLabel: 'Contact',
          tabBarLabelStyle: { fontSize: 14, marginBottom: 5 },
          tabBarIcon: (color, size) => (
            <MaterialIcons name="contact-page" size={iconSize} color={color} />
          ),
        }}
      />
    </MainTab.Navigator>
  );
}
