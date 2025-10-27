// src/components/HistoryCard/index.js
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import makeStyles from "./styles";
import { useTheme } from "../../contexts/ThemeContext";
import useHistory from "../../../hooks/useHistory";
import { classifyBodyFat } from "../../../utils/imc";

import "../../../utils/i18n";
import { useTranslation } from "react-i18next";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const SETTINGS_KEY = "@imc_settings";

export default function HistoryCard({ onShowTable }) {
  const { items, clearHistory, removeItem } = useHistory();

  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const { t } = useTranslation();

  const [showBF, setShowBF] = useState(true);

  const navigation = useNavigation();

  const loadSettings = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem(SETTINGS_KEY);
      if (raw) {
        const json = JSON.parse(raw);
        setShowBF(json.showBF !== false); // default true
      } else {
        setShowBF(true);
      }
    } catch (e) {
      console.warn("Erro carregando settings em HistoryCard:", e);
      setShowBF(true);
    }
  }, []);

  useEffect(() => {
    // carrega ao montar
    loadSettings();

    const unsub = navigation.addListener("focus", () => {
      loadSettings();
    });

    return () => {
      if (unsub && typeof unsub === "function") unsub();
    };
  }, [loadSettings, navigation]);

  return (
    <View style={styles.card}>
      {/* Header: título + ações */}
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{t("Histórico")}</Text>

        <View style={styles.headerActions}>
          <TouchableOpacity
            onPress={() => onShowTable && onShowTable()}
            style={styles.iconBtn}
            activeOpacity={0.8}
          >
            <Ionicons name="information-circle-outline" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Small hint */}
      <Text style={styles.deleteText}>{t("Mantenha pressionado para excluir")}</Text>

      {/* Lista */}
      <FlatList
        data={[...items].reverse()}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.empty}>{t("Nenhum registro")}</Text>}
        renderItem={({ item }) => {
          // tenta obter classificação salva; se não existir, calcula com função utilitária
          const bf = parseFloat(item.bodyFat);
          const bfClassFromItem =
            item.bodyFatClass || item.bodyFatClassification || item.classification || null;
          const bfClass = bfClassFromItem
            ? bfClassFromItem
            : classifyBodyFat(isNaN(bf) ? 0 : bf, item.sex);

          return (
            <TouchableOpacity
              style={styles.item}
              onLongPress={() => removeItem(item.id)}
              activeOpacity={0.85}
            >
              <View style={styles.itemRow}>
                <Text style={styles.itemText}>{t("IMC")}</Text>
                <Text style={styles.itemValue}>{item.imc}</Text>
              </View>

              {/* renderiza BF apenas se showBF === true */}
              {showBF && (
                <>
                  <View style={styles.itemRow}>
                    <Text style={styles.itemTextSmall}>{t("BF% estimada")}</Text>
                    <Text style={styles.itemValueSmall}>{item.bodyFat}%</Text>
                  </View>

                </>
              )}
      
              <View style={styles.itemRow}>
                <Text style={styles.itemTextSmall}>{t("Classificação")}</Text>
                <Text style={styles.itemValueSmall}>{bfClass}</Text>
              </View>

              <View style={styles.metaRow}>
                <Text style={styles.itemMeta}>
                  {item.sex === "male" ? "M" : "F"} • {item.age} {t("anos")}
                </Text>
                <Text style={styles.itemMeta}>
                  {new Date(item.date).toLocaleDateString()} •{" "}
                  {new Date(item.date).toLocaleTimeString()}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
