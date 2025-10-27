// src/components/Form/styles.js
import { StyleSheet } from "react-native";

/**
 * makeStyles(colors) -> retorna StyleSheet
 * colors esperado: { background, card, primary, text, subtext, accentDanger, inputBg, itemBg }
 */
export default function makeStyles(colors) {
  return StyleSheet.create({
    /* ----- CONTAINER DO FORM (menor, centralizado, estilo card) ----- */
    formContext: {
      alignSelf: "center",
      width: "94%",
      maxHeight: 600,
      minHeight: 520,
      backgroundColor: colors.card,
      paddingTop: 20,
      paddingHorizontal: 18,
      paddingBottom: 18,
      borderRadius: 14,
      marginTop: 14,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.06,
      shadowRadius: 12,
      elevation: 6,
    },

    /* header de ações pequenas no topo do card */
    headerActions: {
      flexDirection: "row",
      justifyContent: "flex-end",
      marginBottom: 6,
    },

    iconButton: {
      marginLeft: 12,
      padding: 8,
      borderRadius: 8,
      backgroundColor: colors.itemBg,
      alignItems: "center",
      justifyContent: "center",
    },

    /* área do formulário (inputs) */
    form: {
      width: "100%",
      paddingTop: 6,
    },

    formLabel: {
      color: colors.text,
      fontSize: 15,
      paddingLeft: 4,
      marginTop: 12,
      marginBottom: 6,
      fontWeight: "600",
      letterSpacing: 0.2,
    },

    input: {
      width: "100%",
      borderRadius: 12,
      backgroundColor: colors.inputBg,
      height: 48,
      marginTop: 4,
      paddingLeft: 14,
      paddingRight: 14,
      borderWidth: 1,
      borderColor: "#eef6fb",
      // sombra leve para input (iOS)
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.02,
      shadowRadius: 4,
      elevation: 1,
      color: colors.text,
    },

    /* botão principal */
    buttonCalculator: {
      borderRadius: 999,
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      marginTop: 18,
      overflow: "hidden",
      // sombra do botão (Android/iOS)
      shadowColor: "#0b4f6c",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 4,
    },
    buttonGradient: {
      width: "100%",
      paddingVertical: 12,
      alignItems: "center",
      borderRadius: 999,
    },
    textButtonCalculator: {
      fontSize: 16,
      color: "#ffffff",
      fontWeight: "700",
      letterSpacing: 0.6,
    },

    errorMessage: {
      fontSize: 12,
      color: "#d64545",
      fontWeight: "700",
      paddingLeft: 4,
      minHeight: 18,
      marginTop: 4,
    },

    exhibitionresultIMC: {
      width: "100%",
      alignItems: "center",
      marginTop: 12,
    },

    /* histórico (lista dentro do card) */
    listImcs: {
      marginTop: 12,
    },

    resultImcItemContainer: {
      backgroundColor: colors.itemBg,
      borderRadius: 10,
      paddingVertical: 12,
      paddingHorizontal: 14,
      marginBottom: 10,
      // borda sutil
      borderWidth: 1,
      borderColor: "#f0f4f6",
      // sombra mínima
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.02,
      shadowRadius: 6,
      elevation: 1,
    },

    resultImcItem: {
      fontSize: 15,
      color: colors.text,
      fontWeight: "700",
    },

    textResultItemList: {
      fontSize: 15,
      color: colors.primary,
      fontWeight: "800",
    },

    historyTitle: {
      marginTop: 16,
      fontSize: 16,
      fontWeight: "700",
      color: colors.text,
    },

    empty: {
      textAlign: "center",
      marginTop: 8,
      color: colors.subtext,
    },

    dateText: {
      fontSize: 12,
      color: colors.subtext,
      marginTop: 6,
    },

    /* modal (tabela) */
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.45)",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      width: "90%",
      borderRadius: 12,
      backgroundColor: colors.card,
      padding: 18,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: "700",
      marginBottom: 12,
      color: colors.primary,
    },
    tableRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 10,
      borderBottomWidth: 0.5,
      borderBottomColor: "#eef6fb",
    },
    closeModal: {
      marginTop: 12,
      backgroundColor: colors.primary,
      paddingVertical: 10,
      borderRadius: 8,
      alignItems: "center",
    },
    closeModalText: {
      color: "#fff",
      fontWeight: "700",
    },

    /* picker */
    pickerWrapper: {
      borderRadius: 12,
      backgroundColor: colors.inputBg,
      marginTop: 6,
      overflow: "hidden",
      borderWidth: 1,
      borderColor: "#eef6fb",
    },
    picker: {
      height: 50,
      width: "100%",
      color: colors.text,
    },
  });
}
