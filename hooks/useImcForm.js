// src/hooks/useImcForm.js
import { useState } from "react";
import { Vibration } from "react-native";
import { calculateIMC, estimateBodyFat, classifyBodyFat } from "../utils/imc";
import { appendEntry } from "../services/storage";

export default function useImcForm(initialSex = "male") {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState(initialSex);
  const [messageIMC, setMessageIMC] = useState(null);
  const [imc, setIMC] = useState(null);
  const [bodyFat, setBodyFat] = useState(null);
  const [bodyFatClassification, setBodyFatClassification] = useState("");
  const [textButton, setTextButton] = useState("Calcular");
  const [errorMessage, setErrorMessage] = useState(null);

  async function saveEntryToHistory(bmiValue, bfValue, bfClass) {
    const entry = {
      id: new Date().getTime().toString(),
      imc: String(bmiValue),
      bodyFat: bfValue,
      bodyFatClass: bfClass,
      sex,
      age: isNaN(parseInt(age, 10)) ? 0 : parseInt(age, 10),
      date: new Date().toISOString(),
    };
    await appendEntry(entry);
    return entry;
  }

  async function imcCalculator() {
    setErrorMessage(null);

    const bmi = calculateIMC(height, weight);
    const ageNum = isNaN(parseInt(age, 10)) ? 0 : parseInt(age, 10);

    if (bmi === null) {
      Vibration.vibrate();
      setErrorMessage("Altura e peso válidos são obrigatórios");
      return null;
    }

    const bf = estimateBodyFat(bmi, ageNum, sex);
    const bfClass = classifyBodyFat(bf, sex);

    await saveEntryToHistory(bmi, bf, bfClass);

    setIMC(bmi);
    setBodyFat(bf);
    setBodyFatClassification(bfClass);
    setMessageIMC("Seu IMC é igual:");
    setTextButton("Calcular Novamente");
    setErrorMessage(null);
    setHeight("");
    setWeight("");
    setAge("");
    return { bmi, bf, bfClass };
  }

  function validationIMC() {
    if (!weight || !height) {
      Vibration.vibrate();
      setErrorMessage("Campo obrigatório*");
      setIMC(null);
      setMessageIMC("Preencha o peso e a altura.");
      setTextButton("Calcular");
      return;
    }
    imcCalculator();
  }

  function resetResult() {
    setIMC(null);
    setMessageIMC(null);
    setBodyFat(null);
    setBodyFatClassification("");
    setTextButton("Calcular");
  }

  return {
    height, setHeight,
    weight, setWeight,
    age, setAge,
    sex, setSex,
    messageIMC, imc, bodyFat,
    bodyFatClassification,
    textButton, errorMessage,
    validationIMC, imcCalculator, resetResult,
  };
}
