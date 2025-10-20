import React from "react";
import Title from "../../components/Title";
import Form from "../../components/Form";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";

export default function CalculatorScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Title />
      <Form />
    </SafeAreaView>
  );
}
