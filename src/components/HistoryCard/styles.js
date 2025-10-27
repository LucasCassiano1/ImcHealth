import { StyleSheet } from "react-native";

/**
 * makeStyles(colors)
 * - colors: objeto com as cores do ThemeContext
 * Retorna um StyleSheet que usa as cores fornecidas.
 */
export default function makeStyles(colors = {}) {
  // fallback de cores (caso colors esteja indefinido)
  const c = {
    background: colors.background ?? "#E4EBED",
    card: colors.card ?? "#ffffff",
    primary: colors.primary ?? "#49AAE2",
    text: colors.text ?? "#0B4F6C",
    subtext: colors.subtext ?? "#7a8b90",
    inputBg: colors.inputBg ?? "#F4FBFF",
    itemBg: colors.itemBg ?? "#F4F6F7",
    accentDanger: colors.accentDanger ?? "#D60000",
  };

  return StyleSheet.create({
    card: {
      alignSelf: "center",
      width: "94%",
      maxHeight: 600,
      minHeight: 520,
      backgroundColor: c.card,
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

    /* Header do card */
    cardHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 6,
    },
    cardTitle: {
      fontSize: 20,
      fontWeight: "800",
      color: c.text,
      letterSpacing: 0.4,
    },

    /* Ações do header (ícones) */
    headerActions: {
      flexDirection: "row",
      alignItems: "center",
    },
    iconBtn: {
      width: 40,
      height: 40,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: c.inputBg,
      marginLeft: 15,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.03,
      shadowRadius: 6,
      elevation: 2,
    },
    iconBtnDanger: {
      backgroundColor: "#FFF1F2",
    },

    deleteText: {
      margin: 5,
      fontSize: 13,
      color: c.subtext,
      marginBottom: 10,
      fontStyle: "italic",
      textAlign: "center",
    },

    listContent: {
      paddingBottom: 6,
    },
    empty: {
      textAlign: "center",
      marginTop: 10,
      color: "#8b9496",
    },

    item: {
      backgroundColor: c.itemBg,
      borderRadius: 12,
      paddingVertical: 12,
      paddingHorizontal: 14,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: "#E8EEF0",
    },

    itemRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    itemText: {
      fontSize: 14,
      color: c.text,
      fontWeight: "700",
    },
    itemValue: {
      fontSize: 16,
      color: c.text,
      fontWeight: "800",
    },

    itemTextSmall: {
      fontSize: 13,
      color: c.subtext,
      fontWeight: "600",
      marginTop: 8,
    },
    itemValueSmall: {
      fontSize: 13,
      color: c.text,
      fontWeight: "700",
      marginTop: 8,
    },

    metaRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 10,
    },
    itemMeta: {
      color: c.subtext,
      fontSize: 12,
    },
  });
}
