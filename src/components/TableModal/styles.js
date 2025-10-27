// src/components/TableModal/styles.js
import { StyleSheet } from "react-native";

/**
 * makeStyles(colors)
 * Recebe o objeto colors vindo do ThemeContext e retorna um StyleSheet.
 */
export default function makeStyles(colors) {
  return StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.45)",
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
    },
    modalContent: {
      width: "100%",
      maxWidth: 560,
      borderRadius: 12,
      backgroundColor: colors.card,
      padding: 18,
      // sombra leve
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.06,
      shadowRadius: 12,
      elevation: 8,
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
      borderBottomColor: colors.inputBg === "#f6f6f6" ? "#eee" : "#223236",
    },
    rowLeft: {
      color: colors.text,
      fontWeight: "600",
    },
    rowRight: {
      color: colors.subtext,
      fontWeight: "600",
    },
    closeBtn: {
      marginTop: 16,
      backgroundColor: colors.primary,
      paddingVertical: 10,
      borderRadius: 8,
      alignItems: "center",
    },
    closeText: {
      color: "#fff",
      fontWeight: "700",
    },
  });
}
