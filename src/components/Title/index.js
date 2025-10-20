import React from "react";
import { View, Text } from "react-native";
import { useFonts, Poppins_700Bold } from "@expo-google-fonts/poppins";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./styles";

export default function Title() {
  const [fontsLoaded] = useFonts({ Poppins_700Bold });

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="heart-pulse"
        size={28}
        color="#49AAE2"
        style={styles.icon}
      />
      <Text
        style={[
          styles.textTitle,
          fontsLoaded && { fontFamily: "Poppins_700Bold" },
        ]}
      >
        ImcHealth
      </Text>
    </View>
  );
}
