import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  formContext: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 18,
    paddingHorizontal: 12,
  },
  headerActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 6,
  },
  iconButton: {
    marginLeft: 12,
    padding: 6,
    fontSize: 22,
  },
  form: {
    width: "100%",
    paddingTop: 6,
  },
  formLabel: {
    color: "#000000",
    fontSize: 16,
    paddingLeft: 6,
    marginTop: 8,
  },
  input: {
    width: "100%",
    borderRadius: 12,
    backgroundColor: "#f6f6f6",
    height: 44,
    marginTop: 6,
    paddingLeft: 12,
  },
  genderContainer: {
    flexDirection: "row",
    marginTop: 8,
  },
  genderButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    marginRight: 8,
    alignItems: "center",
  },
  genderButtonActive: {
    backgroundColor: "#49AAE2",
  },
  genderText: {
    color: "#333",
    fontWeight: "600",
  },
  genderTextActive: {
    color: "#fff",
  },
  buttonCalculator: {
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 18,
    overflow: "hidden",
  },
  buttonGradient: {
    width: "100%",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 50,
  },
  textButtonCalculator: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "600",
  },
  errorMessage: {
    fontSize: 12,
    color: "red",
    fontWeight: "bold",
    paddingLeft: 6,
    minHeight: 18,
  },
  exhibitionresultIMC: {
    width: "100%",
    alignItems: "center",
    marginTop: 6,
  },
  listImcs: {
    marginTop: 12,
  },
  resultImcItemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingVertical: 10,
  },
  resultImcItem: {
    fontSize: 16,
    color: "#000",
  },
  textResultItemList: {
    fontSize: 16,
    color: "#49AAE2",
    fontWeight: "700",
  },
  historyTitle: {
    marginTop: 14,
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
  },
  empty: { textAlign: "center", marginTop: 8, color: "#666" },
  dateText: { fontSize: 12, color: "#666" },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    borderRadius: 12,
    backgroundColor: "#fff",
    padding: 18,
  },
  modalTitle: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
  },
  closeModal: {
    marginTop: 12,
    backgroundColor: "#49AAE2",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  closeModalText: { color: "#fff", fontWeight: "700" },

  /* Estilos para ResultIMC */
  resultIMC: {
    marginTop: 12,
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    width: "100%",
    backgroundColor: "#f7fbff",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  numberIMC: { 
    fontSize: 36, 
    color: "#000", 
    fontWeight: "700", 
    marginTop: 8 
},
  information: { 
    fontSize: 16, 
    color: "#333", 
    fontWeight: "600" 
},
  classification: { 
    marginTop: 8, 
    fontSize: 16, 
    color: "#49AAE2", 
    fontWeight: "700" 
},
  bodyFatText: { 
    marginTop: 8, 
    fontSize: 15, 
    color: "#333", 
    fontWeight: "700" 
},
  bodyFatClassification: { 
    fontSize: 13, 
    color: "#666", 
    marginTop: 4 },
  note: { 
    fontSize: 11, 
    color: "#666", 
    marginTop: 8, 
    textAlign: "center" },

  boxSharebutton: { 
    width: "100%", 
    alignItems: "center", 
    marginTop: 12 },
  shared: { 
    backgroundColor: "#1877f2", 
    borderRadius: 8, 
    paddingVertical: 10, 
    paddingHorizontal: 28 
},
  sharedText: { 
    color: "#fff", 
    fontWeight: "700" },
});

export default styles;
