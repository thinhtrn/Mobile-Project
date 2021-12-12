import React from 'react';
import MainScreen from './components/Main'
import MembersScreen from './components/Members';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';

const Tab = createBottomTabNavigator();

const screenOptions = (route, color) => {
  let iconName;

  switch (route.name) {
    case 'Main':
      iconName = 'home';
      break;
    case 'Members':
      iconName = 'appstore-o';
      break;
    default:
      break;
  }

  return <Icon name={iconName} color={color} size={24} />;
};
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Main" screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => screenOptions(route, color),
      })}>
        <>
          <Tab.Screen name="Main" component={MainScreen} />
          <Tab.Screen name="Members" component={MembersScreen} />
        </>
      </Tab.Navigator>
    </NavigationContainer>
  );
}