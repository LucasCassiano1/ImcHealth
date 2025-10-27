// src/components/Form/index.js
import React from "react";
import { View, Text, TextInput, TouchableOpacity, Pressable, Keyboard, Platform, KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native";
import { Picker } from "@react-native-picker/picker";

import ResultIMC from "../ResultIMC";
import { LinearGradient } from "expo-linear-gradient";
import useImcForm from "../../../hooks/useImcForm";
import { classifyBodyFat } from "../../../utils/imc";

import { useTheme } from "../../contexts/ThemeContext";
import makeStyles from "./styles";

import "../../../utils/i18n";
import { useTranslation } from "react-i18next";

export default function Form() {

  const { t, i18n } = useTranslation();


  const {
    height, setHeight,
    weight, setWeight,
    age, setAge,
    sex, setSex,
    messageIMC, imc, bodyFat, bodyFatClassification,
    textButton, errorMessage,
    validationIMC, resetResult
  } = useImcForm();

  // pega cores do ThemeContext e gera styles
  const { colors } = useTheme();
  const styles = React.useMemo(() => makeStyles(colors), [colors]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.formContext}>
          {imc == null ? (
            <Pressable onPress={Keyboard.dismiss} style={styles.form}>
              <Text style={styles.formLabel}>{t('Altura (m)')}</Text>
              <Text style={styles.errorMessage}>{errorMessage}</Text>
              <TextInput
                style={styles.input}
                onChangeText={setHeight}
                value={height}
                placeholder={t('Ex.: 1.70')}
                placeholderTextColor={colors.subtext}
                keyboardType="numeric"
                returnKeyType="done"
              />

              <Text style={styles.formLabel}>{t('Peso (kg)')}</Text>
              <Text style={styles.errorMessage}>{errorMessage}</Text>
              <TextInput
                style={styles.input}
                onChangeText={setWeight}
                value={weight}
                placeholder={t('Ex.: 77.23')}
                placeholderTextColor={colors.subtext}
                keyboardType="numeric"
                returnKeyType="done"
              />

              <Text style={styles.formLabel}>{t('Idade (anos)')}</Text>
              <TextInput
                style={styles.input}
                onChangeText={setAge}
                value={age}
                placeholder={t('Ex.: 28')}
                placeholderTextColor={colors.subtext}
                keyboardType="numeric"
              />

              <Text style={styles.formLabel}>{t('Sexo')}</Text>
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={sex}
                  onValueChange={(itemValue) => setSex(itemValue)}
                  mode={Platform.OS === "android" ? "dropdown" : "dialog"}
                  style={styles.picker}
                >
                  <Picker.Item label={t('Masculino')} value="male" />
                  <Picker.Item label={t('Feminino')} value="female" />
                </Picker>
              </View>

              <TouchableOpacity style={styles.buttonCalculator} onPress={validationIMC}>
                <LinearGradient colors={[colors.primary, "#1877f2"]} style={styles.buttonGradient}>
                  <Text style={styles.textButtonCalculator}>{textButton ?? t('Calcular')}</Text>
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
                <LinearGradient colors={[colors.primary, "#1877f2"]} style={styles.buttonGradient}>
                  <Text style={styles.textButtonCalculator}>{t('Calcular Novamente')}</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
