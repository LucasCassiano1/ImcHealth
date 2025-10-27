// src/components/ResultIMC/styles.js
import { StyleSheet } from "react-native";

/**
 * makeStyles(colors)
 * Recebe um objeto `colors` (do ThemeContext) e retorna um StyleSheet.
 * Exemplo de colors esperado:
 * {
 *   background, card, primary, text, subtext, accentDanger, inputBg, itemBg
 * }
 */
export default function makeStyles(colors) {
  // fallback de cores caso colors não seja passado
  const c = colors || {
    background: "#E8EEF0",
    card: "#fff",
    primary: "#49AAE2",
    text: "#21373b",
    subtext: "#6f7f82",
    accentDanger: "#D60000",
    inputBg: "#f6f6f6",
    itemBg: "#F4F6F7",
  };

  return StyleSheet.create({
    /* Container do bloco de resultado */
    resultIMC: {
      marginTop: 12,
      padding: 18,
      borderRadius: 12,
      alignItems: "center",
      width: "100%",
      backgroundColor: c.itemBg === undefined ? "#f7fbff" : c.itemBg,
      shadowColor: "#000",
      shadowOpacity: 0.06,
      shadowRadius: 6,
      elevation: 2,
    },

    /* Texto grande do IMC */
    numberIMC: {
      fontSize: 36,
      color: c.text,
      fontWeight: "700",
      marginTop: 8,
    },

    /* Informação (label) */
    information: {
      fontSize: 16,
      color: c.subtext,
      fontWeight: "600",
    },

    /* Classificação (ex.: Peso normal) */
    classification: {
      marginTop: 8,
      fontSize: 16,
      color: c.primary,
      fontWeight: "700",
    },

    /* Percentual de gordura (BF%) */
    bodyFatText: {
      marginTop: 8,
      fontSize: 15,
      color: c.text,
      fontWeight: "700",
    },

    /* Classificação da BF */
    bodyFatClassification: {
      fontSize: 13,
      color: c.subtext,
      marginTop: 4,
    },

    /* Nota pequena */
    note: {
      fontSize: 11,
      color: c.subtext,
      marginTop: 8,
      textAlign: "center",
    },

    /* Caixa do botão compartilhar */
    boxSharebutton: {
      width: "100%",
      alignItems: "center",
      marginTop: 12,
    },

    /* Botão compartilhar */
    shared: {
      backgroundColor: c.primary,
      borderRadius: 8,
      paddingVertical: 10,
      paddingHorizontal: 28,
    },

    sharedText: {
      color: "#fff",
      fontWeight: "700",
    },
  });
}
