// App.js
import React from "react";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import CalculatorScreen from "./src/screens/CalculatorScreen";
import HistoryScreen from "./src/screens/HistoryScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

function MyTabs() {
  const insets = useSafeAreaInsets();

  const baseHeight = 56;
  
  const totalHeight = baseHeight + (insets.bottom || (Platform.OS === "android" ? 8 : 0));

  return (
    <Tab.Navigator
      initialRouteName="Calculator"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#49AAE2",
        tabBarInactiveTintColor: "#8b9496",
        tabBarLabelStyle: { fontSize: 11 },
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          position: "absolute",
          left: 12,
          right: 12,
          bottom: Math.max(insets.bottom + 8, 12), // garante distância dos botões do sistema
          height: 80,
          borderRadius: 16,
          paddingBottom:  (Platform.OS === "ios" ? insets.bottom * 0.4 : 8),
          paddingTop: 6,
          backgroundColor: "#ffffff",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.06,
          shadowRadius: 12,
          elevation: 8,
        },
        tabBarItemStyle: {
          marginTop: 4,
        },
        tabBarIcon: ({ color, size }) => {
          const iconSize = Math.max(size, 20);
          if (route.name === "History") {
            return <Ionicons name="document-text-outline" size={iconSize} color={color} />;
          }
          if (route.name === "Calculator") {
            return <Ionicons name="calculator-outline" size={iconSize} color={color} />;
          }
          if (route.name === "Settings") {
            return <Ionicons name="settings-outline" size={iconSize} color={color} />;
          }
          return null;
        },
        // evita que conteúdos fiquem escondidos atrás da tab
        sceneContainerStyle: { paddingBottom: totalHeight + 8 },
      })}
    >
      <Tab.Screen name="History" component={HistoryScreen} options={{ title: "Histórico" }} />
      <Tab.Screen name="Calculator" component={CalculatorScreen} options={{ title: "Calcular" }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: "Configurações" }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
