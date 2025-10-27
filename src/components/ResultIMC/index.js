import React from "react";
import { View, Text, TouchableOpacity, Share } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import makeStyles from "./styles";

import "../../../utils/i18n";
import { useTranslation } from "react-i18next";

export default function ResultIMC({
  messageResultIMC,
  resultIMC,
  classification,
  bodyFat,
  bodyFatClassification,
  sex,
  age,
}) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const { t } = useTranslation();

  const onShare = async () => {
    try {
      const message = t("share_message", {
        value: resultIMC,
        classification: classification ?? "",
        bf: bodyFat ?? "",
        bfClass: bodyFatClassification ?? "",
      });
      await Share.share({ message });
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <View style={styles.resultIMC}>
      {/* resultado textual */}
      <Text style={styles.information}>{messageResultIMC}</Text>
      <Text style={styles.numberIMC}>{resultIMC}</Text>
      <Text style={styles.classification}>{classification}</Text>

      {bodyFat !== null && bodyFat !== undefined && (
        <>
          <Text style={styles.bodyFatText}>
            {t("BF% estimada")}: {bodyFat}%
          </Text>
          <Text style={styles.bodyFatClassification}>
            {t("Classificação")}: {bodyFatClassification}
          </Text>
        </>
      )}

      <Text style={styles.note}>{t("bf_note")}</Text>

      <View style={styles.boxSharebutton}>
        <TouchableOpacity onPress={onShare} style={styles.shared}>
          <Text style={styles.sharedText}>{t("Compartilhar")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
