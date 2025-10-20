// src/components/ResultIMC/index.js
import React from "react";
import { View, Text, TouchableOpacity, Share } from "react-native";
import styles from "./styles";

export default function ResultIMC({
  messageResultIMC,
  resultIMC,
  classification,
  bodyFat,
  bodyFatClassification,
  sex,
  age,
}) {
  const onShare = async () => {
    try {
      await Share.share({
        message: `Meu IMC hoje é: ${resultIMC} (${classification}). BF% estimada: ${bodyFat}% (${bodyFatClassification}).`,
      });
    } catch (error) {
      console.warn(error);
    }
  };

  // selected index para o HalfPie (fallback = 1)
  const selectedIndex = imcClassificationToIndex(classification);

  return (
    <View style={styles.resultIMC}>

      {/* resultado textual */}
      <Text style={styles.information}>{messageResultIMC}</Text>
      <Text style={styles.numberIMC}>{resultIMC}</Text>
      <Text style={styles.classification}>{classification}</Text>

      {bodyFat !== null && (
        <>
          <Text style={styles.bodyFatText}>BF% estimada: {bodyFat}%</Text>
          <Text style={styles.bodyFatClassification}>Classificação: {bodyFatClassification}</Text>
        </>
      )}

      <Text style={styles.note}>
        Nota: a BF% é uma estimativa (fórmula baseada em IMC, idade e sexo). Consulte um profissional para avaliação precisa.
      </Text>

      <View style={styles.boxSharebutton}>
        <TouchableOpacity onPress={onShare} style={styles.shared}>
          <Text style={styles.sharedText}>Compartilhar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
