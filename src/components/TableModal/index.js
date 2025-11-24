import React from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import makeStyles from "./styles";

import "../../../utils/i18n";
import { useTranslation } from "react-i18next";

export default function TableModal({ visible = false, onClose = () => {} }) {
  const { colors } = useTheme();
  const styles = React.useMemo(() => makeStyles(colors), [colors]);

  const { t } = useTranslation();

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{t("Tabela de IMC")}</Text>

          <View style={styles.tableRow}>
            <Text style={styles.rowLeft}>{t("Menor que 18,5:")}</Text>
            <Text style={styles.rowRight}>{t("Baixo peso")}</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.rowLeft}>{t("18,5 a 24,9:")}</Text>
            <Text style={styles.rowRight}>{t("Peso normal")}</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.rowLeft}>{t("25 a 29,9:")}</Text>
            <Text style={styles.rowRight}>{t("Sobrepeso")}</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.rowLeft}>{t("30 a 34,9:")}</Text>
            <Text style={styles.rowRight}>{t("Obesidade Grau I")}</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.rowLeft}>{t("35 a 39,9:")}</Text>
            <Text style={styles.rowRight}>{t("Obesidade Grau II")}</Text>
          </View>  

          <View style={styles.tableRow}>
            <Text style={styles.rowLeft}>{t("≥ 40:")}</Text>
            <Text style={styles.rowRight}>{t("Obesidade Grau III ou mórbida")}</Text>
          </View>

          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeText}>{t("Fechar")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
