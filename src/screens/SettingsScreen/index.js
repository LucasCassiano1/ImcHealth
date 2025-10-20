// src/screens/SettingsScreen/index.js
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
import styles from "./styles";
import Title from "../../components/Title";
import { clearHistory as clearHistoryService } from "../../../services/storage"; 
const SETTINGS_KEY = "@imc_settings";

export default function SettingsScreen() {
  const [themeDark, setThemeDark] = useState(false);
  const [showBF, setShowBF] = useState(true);
  const [units, setUnits] = useState("metric"); // 'metric' ou 'imperial'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(SETTINGS_KEY);
        if (raw) {
          const json = JSON.parse(raw);
          setThemeDark(!!json.themeDark);
          setShowBF(json.showBF !== false); // default true
          setUnits(json.units || "metric");
        }
      } catch (e) {
        console.warn("Erro carregando configurações", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function persist() {
    try {
      const obj = { themeDark, showBF, units };
      await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(obj));
    } catch (e) {
      console.warn("Erro salvando configurações", e);
    }
  }

  // salva automaticamente quando mudar uma preferência
  useEffect(() => {
    if (!loading) persist();
  }, [themeDark, showBF, units]);

  function confirmClearHistory() {
    Alert.alert("Apagar histórico", "Deseja apagar todo o histórico de IMCs?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Apagar",
        style: "destructive",
        onPress: async () => {
          try {
            await clearHistoryService();
            Alert.alert("Pronto", "Histórico apagado.");
          } catch (e) {
            console.warn(e);
            Alert.alert("Erro", "Não foi possível apagar o histórico.");
          }
        },
      },
    ]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Title />

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Configurações</Text>

        <View style={styles.row}>
          <View>
            <Text style={styles.rowTitle}>Tema escuro</Text>
            <Text style={styles.rowSubtitle}>Ativa visual escuro no app</Text>
          </View>
          <Switch
            value={themeDark}
            onValueChange={setThemeDark}
            trackColor={{ true: "#49AAE2", false: "#cfd8dc" }}
            thumbColor={Platform.OS === "android" ? (themeDark ? "#fff" : "#fff") : undefined}
          />
        </View>

        <View style={styles.row}>
          <View>
            <Text style={styles.rowTitle}>Mostrar BF% no histórico</Text>
            <Text style={styles.rowSubtitle}>Exibir estimativa de gordura corporal</Text>
          </View>
          <Switch
            value={showBF}
            onValueChange={setShowBF}
            trackColor={{ true: "#49AAE2", false: "#cfd8dc" }}
          />
        </View>

        <View style={styles.rowPicker}>
          <View>
            <Text style={styles.rowTitle}>Unidades</Text>
            <Text style={styles.rowSubtitle}>Escolha métrico ou imperial</Text>
          </View>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={units}
              onValueChange={(v) => setUnits(v)}
              style={styles.picker}
              mode="dropdown"
            >
              <Picker.Item label="Métrico (m, kg)" value="metric" />
              <Picker.Item label="Imperial (ft, lb)" value="imperial" />
            </Picker>
          </View>
        </View>

        <View style={styles.divider} />

        <TouchableOpacity style={styles.dangerBtn} onPress={confirmClearHistory}>
          <Ionicons name="trash-outline" size={18} color="#D60000" style={{ marginRight: 8 }} />
          <Text style={styles.dangerBtnText}>Apagar todo o histórico</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );    
}
