// src/components/Form/index.js
import React from "react";
import styles from "./styles";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import ResultIMC from "../ResultIMC";
import { LinearGradient } from "expo-linear-gradient";
import useImcForm from "../../../hooks/useImcForm";
import { classifyBodyFat } from "../../../utils/imc";

export default function Form() {
  const {
    height, setHeight,
    weight, setWeight,
    age, setAge,
    sex, setSex,
    messageIMC, imc, bodyFat, bodyFatClassification,
    textButton, errorMessage,
    validationIMC, resetResult
  } = useImcForm();
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.formContext}>
          {imc == null ? (
            <Pressable onPress={Keyboard.dismiss} style={styles.form}>
              <Text style={styles.formLabel}>Altura (m)</Text>
              <Text style={styles.errorMessage}>{errorMessage}</Text>
              <TextInput
                style={styles.input}
                onChangeText={setHeight}
                value={height}
                placeholder="Ex.: 1.70"
                keyboardType="numeric"
                returnKeyType="done"
              />

              <Text style={styles.formLabel}>Peso (kg)</Text>
              <Text style={styles.errorMessage}>{errorMessage}</Text>
              <TextInput
                style={styles.input}
                onChangeText={setWeight}
                value={weight}
                placeholder="Ex.: 77.23"
                keyboardType="numeric"
                returnKeyType="done"
              />

              <Text style={styles.formLabel}>Idade (anos)</Text>
              <TextInput
                style={styles.input}
                onChangeText={setAge}
                value={age}
                placeholder="Ex.: 28"
                keyboardType="numeric"
              />

              <Text style={styles.formLabel}>Sexo</Text>
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={sex}
                  onValueChange={(itemValue) => setSex(itemValue)}
                  mode={Platform.OS === "android" ? "dropdown" : "dialog"}
                  style={styles.picker}
                >
                  <Picker.Item label="Masculino" value="male" />
                  <Picker.Item label="Feminino" value="female" />
                </Picker>
              </View>

              <TouchableOpacity style={styles.buttonCalculator} onPress={validationIMC}>
                <LinearGradient colors={["#49AAE2", "#1877f2"]} style={styles.buttonGradient}>
                  <Text style={styles.textButtonCalculator}>{textButton}</Text>
                </LinearGradient>
              </TouchableOpacity>
            </Pressable>
          ) : (
            <View style={styles.exhibitionresultIMC}>
              
              <ResultIMC
                messageResultIMC={messageIMC}
                resultIMC={imc}
                classification={null}
                bodyFat={bodyFat}
                bodyFatClassification={bodyFatClassification}
                sex={sex}
                age={age}
              />

              <TouchableOpacity
                style={[styles.buttonCalculator, { marginTop: 14 }]}
                onPress={resetResult}
              >
                <LinearGradient colors={["#49AAE2", "#1877f2"]} style={styles.buttonGradient}>
                  <Text style={styles.textButtonCalculator}>Calcular Novamente</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
