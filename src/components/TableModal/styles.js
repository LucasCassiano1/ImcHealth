import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
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
    backgroundColor: "#fff",
    padding: 18,
  },
  modalTitle: { 
    fontSize: 18, 
    fontWeight: "700", 
    marginBottom: 12, 
    color: "#0B4F6C" 
},
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
  },
  closeBtn: {
    marginTop: 16,
    backgroundColor: "#49AAE2",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  closeText: { 
    color: "#fff", 
    fontWeight: "700" },
});

export default styles;
