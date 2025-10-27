// App.js
import React from "react";
import { Platform } from "react-native";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import CalculatorScreen from "./src/screens/CalculatorScreen";
import HistoryScreen from "./src/screens/HistoryScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import { Ionicons } from "@expo/vector-icons";
import { ThemeProvider, useTheme } from "./src/contexts/ThemeContext";

import "./utils/i18n"; // inicializa i18n (ajuste o caminho caso necessário)
import { useTranslation } from "react-i18next";

const Tab = createBottomTabNavigator();

function MyTabs() {
  const insets = useSafeAreaInsets();
  const { colors, themeDark } = useTheme();
  const { t } = useTranslation();

  const baseHeight = 56;
  const totalHeight = baseHeight + (insets.bottom || (Platform.OS === "android" ? 8 : 0));

  const tabBarActiveTintColor = colors.primary;
  const tabBarInactiveTintColor = colors.subtext;
  const tabBarBackground = colors.card;
  const tabBarBorderColor = themeDark ? "#0b1a1f" : "#eef6fb";
  const tabBarShadowColor = "#000";

  return (
    <Tab.Navigator
      initialRouteName="Calculator"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor,
        tabBarInactiveTintColor,
        tabBarLabelStyle: { fontSize: 11, marginBottom: 6 },
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          position: "absolute",
          left: 12,
          right: 12,
          bottom: Math.max(insets.bottom + 8, 12),
          height: 80,
          borderRadius: 16,
          paddingBottom: Platform.OS === "ios" ? insets.bottom * 0.4 : 8,
          paddingTop: 6,
          backgroundColor: tabBarBackground,
          borderWidth: 1,
          borderColor: tabBarBorderColor,
          shadowColor: tabBarShadowColor,
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: themeDark ? 0.18 : 0.06,
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
        sceneContainerStyle: { paddingBottom: totalHeight + 8 },
      })}
    >
      <Tab.Screen name="History" component={HistoryScreen} options={{ title: t("Histórico") }} />
      <Tab.Screen name="Calculator" component={CalculatorScreen} options={{ title: t("Calcular") }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: t("Configurações") }} />
    </Tab.Navigator>
  );
}

export default function App() {
  // aqui mantemos ThemeProvider em volta para que MyTabs use useTheme()
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <NavigationContainer theme={DefaultTheme}>
          <MyTabs />
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
