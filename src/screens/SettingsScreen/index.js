import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import Title from "../../components/Title";
import { clearHistory as clearHistoryService } from "../../../services/storage";
import { useTheme } from "../../contexts/ThemeContext";
import makeStyles from "./styles";

import { useTranslation } from "react-i18next";

const SETTINGS_KEY = "@imc_settings";

export default function SettingsScreen() {
  const { themeDark, toggleTheme, colors } = useTheme();
  const [showBF, setShowBF] = useState(true);
  const [language, setLanguage] = useState("pt"); // 'pt' ou 'en'
  const [loading, setLoading] = useState(true);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(SETTINGS_KEY);
        if (raw) {
          const json = JSON.parse(raw);
          setShowBF(json.showBF !== false);
          setLanguage(json.language || "pt");

          // atualiza i18n caso a preferência já exista
          const langToSet = json.language || "pt";
          if (i18n && i18n.language !== langToSet) {
            i18n.changeLanguage(langToSet).catch(() => {});
          }
        }
      } catch (e) {
        console.warn("Erro carregando configurações", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function persistLocal() {
    try {
      const raw = await AsyncStorage.getItem(SETTINGS_KEY);
      const json = raw ? JSON.parse(raw) : {};
      json.showBF = showBF;
      json.language = language;
      // se theme já estava no storage, não perde
      await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(json));
    } catch (e) {
      console.warn("Erro salvando configurações", e);
    }
  }

  // salva automaticamente quando mudar showBF ou language
  useEffect(() => {
    if (!loading) persistLocal();
  }, [showBF, language]);

  function confirmClearHistory() {
    Alert.alert(
      t("Apagar histórico"),
      t("Deseja apagar todo o histórico de IMCs?"),
      [
        { text: t("Cancelar"), style: "cancel" },
        {
          text: t("Apagar"),
          style: "destructive",
          onPress: async () => {
            try {
              await clearHistoryService();
              Alert.alert(t("Pronto"), t("Histórico apagado."));
            } catch (e) {
              console.warn(e);
              Alert.alert(t("Erro"), t("Não foi possível apagar o histórico."));
            }
          },
        },
      ]
    );
  }

  // Função para trocar idioma (usa i18n e persiste via state -> persistLocal)
  const changeLanguage = async (value) => {
    try {
      setLanguage(value);
      if (i18n) {
        await i18n.changeLanguage(value);
      }
      // persistLocal será chamado pelo useEffect que observa `language`
    } catch (e) {
      console.warn("Erro ao mudar idioma", e);
    }
  };

  const localStyles = makeStyles(colors);

  return (
    <SafeAreaView style={[localStyles.container]}>
      <Title />

      <View style={localStyles.card}>
        <Text style={localStyles.cardTitle}>{t("Configurações")}</Text>

        <View style={localStyles.row}>
          <View>
            <Text style={localStyles.rowTitle}>{t("Tema escuro")}</Text>
            <Text style={localStyles.rowSubtitle}>{t("Ativa visual escuro no app")}</Text>
          </View>
          <Switch
            value={themeDark}
            onValueChange={(v) => toggleTheme(v)}
            trackColor={{ true: colors.primary, false: "#cfd8dc" }}
            thumbColor={Platform.OS === "android" ? (themeDark ? "#fff" : "#fff") : undefined}
          />
        </View>

        <View style={localStyles.divider} />

        <View style={localStyles.row}>
          <View>
            <Text style={localStyles.rowTitle}>{t("Mostrar BF% no histórico")}</Text>
            <Text style={localStyles.rowSubtitle}>{t("Exibir estimativa de gordura corporal")}</Text>
          </View>
          <Switch
            value={showBF}
            onValueChange={setShowBF}
            trackColor={{ true: colors.primary, false: "#cfd8dc" }}
          />
        </View>

        <View style={localStyles.divider} />

        {/* Picker de Idioma */}
        <View style={localStyles.rowPicker}>
          <View>
            <Text style={localStyles.rowTitle}>{t("Idioma")}</Text>
            <Text style={localStyles.rowSubtitle}>{t("Escolha o idioma do app")}</Text>
          </View>
          <View style={localStyles.pickerWrapper}>
            <Picker
              selectedValue={language}
              onValueChange={(v) => changeLanguage(v)}
              style={localStyles.picker}
              mode="dropdown"
            >
              <Picker.Item label={t("Português (PT)")} value="pt" />
              <Picker.Item label={t("English (EN)")} value="en" />
              <Picker.Item label={t("Espanhol (ES)")} value="es" />
            </Picker>
          </View>
        </View>

        <View style={localStyles.divider} />

        <TouchableOpacity
          style={localStyles.button}
          onPress={() =>
            Alert.alert(
              t("Sobre"),
              t("Este aplicativo foi criado para ajudar você a acompanhar sua saúde de forma simples e prática. Calcule seu IMC, estime sua gordura corporal e visualize sua classificação instantaneamente. Mantenha o histórico de resultados e acompanhe sua evolução ao longo do tempo. Um aliado inteligente para o seu bem-estar!")
            )
          }
        >
          <Ionicons
            name="information-circle-outline"
            size={18}
            color={colors.primary}
            style={{ marginRight: 8 }}
          />
          <Text style={localStyles.buttonText}>{t("Sobre o App")}</Text>
        </TouchableOpacity>

        <View style={localStyles.divider} />

        <TouchableOpacity style={localStyles.dangerBtn} onPress={confirmClearHistory}>
          <Ionicons name="trash-outline" size={18} color={colors.accentDanger} style={{ marginRight: 8 }} />
          <Text style={localStyles.dangerBtnText}>{t("Apagar todo o histórico")}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
