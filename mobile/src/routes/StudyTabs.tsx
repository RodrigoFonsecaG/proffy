import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import Favorites from '../pages/Favorites';
import TeacherList from '../pages/TeacherList';

const { Navigator, Screen } = createBottomTabNavigator();

const StudyTabs = () => {
  return (
    <Navigator
      screenOptions={{
        tabBarStyle: {
          elevation: 0,
          shadowOpacity: 0,
          height: 64
        },

        tabBarItemStyle: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        },

        tabBarIconStyle: {
          flex: 0,
          width: 20,
          height: 25
        },

        tabBarLabelStyle: {
          fontFamily: 'Archivo_700Bold',
          fontSize: 13,
          marginLeft: 16
        },
        tabBarInactiveBackgroundColor: '#fafafc',
        tabBarActiveBackgroundColor: '#ebebf5',
        tabBarInactiveTintColor: '#c1bccc',
        tabBarActiveTintColor: '#32264d',
        headerShown: false
      }}
    >
      <Screen
        name="TeacherList"
        component={TeacherList}
        options={{
          tabBarLabel: 'Proffys',
          tabBarIcon: ({ color, size, focused }) => {
            return <Ionicons name="ios-easel" size={size} color={focused ? '#8257e5': color} />;
          }
        }}
      ></Screen>
      <Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarLabel: 'Favoritos',
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Ionicons
                name="ios-heart"
                size={size}
                color={focused ? '#8257e5' : color}
              />
            );
          }
        }}
      ></Screen>
    </Navigator>
  );
};

export default StudyTabs;
