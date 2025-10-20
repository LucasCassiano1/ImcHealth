import React from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import styles from "./styles";

export default function TableModal({ visible = false, onClose = () => {} }) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Tabela de IMC</Text>

          <View style={styles.tableRow}>
            <Text>Menor que 18,5:</Text>
            <Text>Baixo peso</Text>
          </View>

          <View style={styles.tableRow}>
            <Text>18,5 a 24,9:</Text>
            <Text>Peso normal</Text>
          </View>

          <View style={styles.tableRow}>
            <Text>25 a 29,9:</Text>
            <Text>Sobrepeso</Text>
          </View>

          <View style={styles.tableRow}>
            <Text>30 a 34,9:</Text>
            <Text>Obesidade Grau I</Text>
          </View>

          <View style={styles.tableRow}>
            <Text>35 a 39,9:</Text>
            <Text>Obesidade Grau II</Text>
          </View>

          <View style={styles.tableRow}>
            <Text>≥ 40:</Text>
            <Text>Obesidade Grau III ou mórbida</Text>
          </View>

          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
