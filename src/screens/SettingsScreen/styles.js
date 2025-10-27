// src/screens/SettingsScreen/styles.js
import { StyleSheet } from "react-native";

/**
 * makeStyles - retorna um StyleSheet gerado a partir do objeto colors
 * Uso: const styles = makeStyles(colors)
 */
export default function makeStyles(colors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 12,
      paddingTop: 12,
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: 14,
      padding: 16,
      minHeight: 600,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.05,
      shadowRadius: 12,
      elevation: 6,
    },
    cardTitle: {
      fontSize: 20,
      fontWeight: "800",
      color: colors.text,
      marginBottom: 12,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 10,
    },
    rowPicker: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 6,
    },
    rowTitle: {
      fontSize: 15,
      fontWeight: "700",
      color: colors.text,
    },
    rowSubtitle: {
      fontSize: 12,
      color: colors.subtext,
      marginTop: 2,
    },
    pickerWrapper: {
      width: 160,
      borderRadius: 8,
      backgroundColor: colors.inputBg,
      overflow: "hidden",
      borderWidth: 1,
      borderColor: "#eef6fb",
    },
    picker: {
      height: 55,
      width: "100%",
      color: colors.text,
    },
    divider: {
      height: 1,
      backgroundColor: "#e0e0e0",
      marginVertical: 12,
    },
    dangerBtn: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#fff1f2",
      paddingVertical: 12,
      paddingHorizontal: 14,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#fdecea",
    },
    dangerBtnText: {
      color: colors.accentDanger,
      fontWeight: "700",
      fontSize: 14,
    },
  });
}
