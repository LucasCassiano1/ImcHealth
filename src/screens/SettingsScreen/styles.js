// src/screens/SettingsScreen/styles.js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EEF0",
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    // ocupa boa parte do espaço (a partir do Title)
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
    color: "#0B4F6C",
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
    color: "#21373b",
  },
  rowSubtitle: {
    fontSize: 12,
    color: "#6f7f82",
    marginTop: 2,
  },

  pickerWrapper: {
    width: 160,
    borderRadius: 8,
    backgroundColor: "#fbfdff",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#eef6fb",
  },
  picker: {
    height: 55,
    width: "100%",
  },

  divider: {
    height: 1,
    backgroundColor: "#eef6fb",
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
    color: "#D60000",
    fontWeight: "700",
    fontSize: 14,
  },
});
