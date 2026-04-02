/**
 * MON TAILLEUR - Mobile Application
 * React Native + Expo
 */

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Screens
import FeedScreen from './src/screens/Feed/FeedScreen';
import ProfileScreen from './src/screens/Profile/ProfileScreen';
import OrdersScreen from './src/screens/Orders/OrdersScreen';
import ChatScreen from './src/screens/Chat/ChatScreen';
import MarketplaceScreen from './src/screens/Marketplace/MarketplaceScreen';
import MeasurementScreen from './src/screens/Measurement/MeasurementScreen';
import LoginScreen from './src/screens/Auth/LoginScreen';
import RegisterScreen from './src/screens/Auth/RegisterScreen';

// Context
import { AuthProvider, useAuth } from './src/context/AuthContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Main Tab Navigator
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          
          if (route.name === 'Feed') {
            iconName = focused ? 'play-circle' : 'play-circle-outline';
          } else if (route.name === 'Marketplace') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Measurement') {
            iconName = focused ? 'scan' : 'scan-outline';
          } else if (route.name === 'Orders') {
            iconName = focused ? 'bag' : 'bag-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#d4a72c',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: {
          backgroundColor: '#000',
          borderTopColor: '#d4a72c',
          borderTopWidth: 0.5,
        },
        headerStyle: {
          backgroundColor: '#000',
        },
        headerTintColor: '#d4a72c',
      })}
    >
      <Tab.Screen 
        name="Feed" 
        component={FeedScreen}
        options={{ title: 'Découvrir' }}
      />
      <Tab.Screen 
        name="Marketplace" 
        component={MarketplaceScreen}
        options={{ title: 'Boutique' }}
      />
      <Tab.Screen 
        name="Measurement" 
        component={MeasurementScreen}
        options={{ title: 'Mesures' }}
      />
      <Tab.Screen 
        name="Orders" 
        component={OrdersScreen}
        options={{ title: 'Commandes' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ title: 'Profil' }}
      />
    </Tab.Navigator>
  );
}

// Auth Navigator
function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#000' },
        headerTintColor: '#d4a72c',
      }}
    >
      <Stack.Screen 
        name="Login" 
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Register" 
        component={RegisterScreen}
        options={{ title: 'Créer un compte' }}
      />
    </Stack.Navigator>
  );
}

// Root Navigator
function RootNavigator() {
  const { user, loading } = useAuth();
  
  if (loading) {
    return null; // Or a splash screen
  }
  
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#d4a72c',
        }}
      >
        {user ? (
          <>
            <Stack.Screen 
              name="Main" 
              component={MainTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="Chat" 
              component={ChatScreen}
              options={{ title: 'Messages' }}
            />
          </>
        ) : (
          <Stack.Screen 
            name="Auth" 
            component={AuthNavigator}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Main App
export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <StatusBar style="light" />
        <RootNavigator />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
