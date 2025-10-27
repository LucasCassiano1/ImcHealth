// src/hooks/useImcForm.js
import { Vibration } from "react-native";
import { calculateIMC, estimateBodyFat, classifyBodyFat } from "../utils/imc";
import { appendEntry } from "../services/storage";
import { useState, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
const SETTINGS_KEY = "@imc_settings";

// inicializa i18n (garante que os recursos foram carregados)
import "../utils/i18n";
import { useTranslation } from "react-i18next";

export default function useImcForm(initialSex = "male", initialUnits = "metric") {
  // hook de tradução
  const { t } = useTranslation();

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState(initialSex);
  const [units, setUnits] = useState(initialUnits);
  const [messageIMC, setMessageIMC] = useState(null);
  const [imc, setIMC] = useState(null);
  const [bodyFat, setBodyFat] = useState(null);
  const [bodyFatClassification, setBodyFatClassification] = useState("");
  const [textButton, setTextButton] = useState(t("Calcular"));
  const [errorMessage, setErrorMessage] = useState(null);

  const [vibrationEnabled, setVibrationEnabled] = useState(true);

  // carrega preferência de vibração ao montar
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(SETTINGS_KEY);
        if (raw) {
          const json = JSON.parse(raw);
          setVibrationEnabled(json.vibrationEnabled !== false);
        }
      } catch (e) {
        console.warn("Erro lendo preferência de vibração", e);
      }
    })();
  }, []);


  async function saveEntryToHistory(bmiValue, bfValue, bfClass) {
    const entry = {
      id: new Date().getTime().toString(),
      imc: String(bmiValue),
      bodyFat: bfValue,
      bodyFatClass: bfClass,
      sex,
      age: isNaN(parseInt(age, 10)) ? 0 : parseInt(age, 10),
      units,
      date: new Date().toISOString(),
    };
    await appendEntry(entry);
    return entry;
  }

  async function imcCalculator() {
    setErrorMessage(null);

    // passa units para calcular (compatível com a versão atualizada de calculateIMC)
    const bmi = calculateIMC(height, weight, units);
    const ageNum = isNaN(parseInt(age, 10)) ? 0 : parseInt(age, 10);

    if (bmi === null || vibrationEnabled) {
      Vibration.vibrate();
      setErrorMessage(t("Altura e peso válidos são obrigatórios"));
      return null;
    }

    const bf = estimateBodyFat(bmi, ageNum, sex);
    const bfClass = classifyBodyFat(bf, sex);

    await saveEntryToHistory(bmi, bf, bfClass);

    setIMC(bmi);
    setBodyFat(bf);
    setBodyFatClassification(bfClass);
    setMessageIMC(t("Seu IMC é igual:"));
    setTextButton(t("Calcular Novamente"));
    setErrorMessage(null);
    setHeight("");
    setWeight("");
    setAge("");
    return { bmi, bf, bfClass };
  }

  function validationIMC() {
    if (!weight || !height || vibrationEnabled) {
      Vibration.vibrate();
      setErrorMessage(t("Campo obrigatório*"));
      setIMC(null);
      setMessageIMC(t("Preencha o peso e a altura."));
      setTextButton(t("Calcular"));
      return;
    }
    imcCalculator();
  }

  function resetResult() {
    setIMC(null);
    setMessageIMC(null);
    setBodyFat(null);
    setBodyFatClassification("");
    setTextButton(t("Calcular"));
  }

  return {
    height, setHeight,
    weight, setWeight,
    age, setAge,
    sex, setSex,
    units, setUnits,
    messageIMC, imc, bodyFat,
    bodyFatClassification,
    textButton, errorMessage,
    validationIMC, imcCalculator, resetResult,
  };
}
