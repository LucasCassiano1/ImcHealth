// src/components/HistoryCard/index.js
import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import useHistory from "../../../hooks/useHistory";
import { classifyBodyFat } from "../../../utils/imc";

export default function HistoryCard({ onShowTable }) {
  const { items, clearHistory, removeItem } = useHistory();

  return (
    <View style={styles.card}>
      {/* Header: título + ações */}
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Histórico</Text>

        <View style={styles.headerActions}>
          <TouchableOpacity
            onPress={() => onShowTable && onShowTable()}
            style={styles.iconBtn}
            activeOpacity={0.8}
          >
            <Ionicons name="information-circle-outline" size={20} color="#49AAE2" />
          </TouchableOpacity>

        </View>
      </View>

      {/* Small hint */}
      <Text style={styles.deleteText}>*Mantenha pressionado para excluir</Text>

      {/* Lista */}
      <FlatList
        data={[...items].reverse()}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.empty}>Nenhum registro</Text>}
        renderItem={({ item }) => {
          // tenta obter classificação salva; se não existir, calcula com função utilitária
          const bf = parseFloat(item.bodyFat);
          const bfClassFromItem =
            item.bodyFatClass || item.bodyFatClassification || item.classification || item.bodyFatClassification;
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
                <Text style={styles.itemText}>IMC</Text>
                <Text style={styles.itemValue}>{item.imc}</Text>
              </View>

              <View style={styles.itemRow}>
                <Text style={styles.itemTextSmall}>BF% estimada</Text>
                <Text style={styles.itemValueSmall}>{item.bodyFat}%</Text>
              </View>

              <View style={styles.itemRow}>
                <Text style={styles.itemTextSmall}>Classificação</Text>
                <Text style={styles.itemValueSmall}>{bfClass}</Text>
              </View>

              <View style={styles.metaRow}>
                <Text style={styles.itemMeta}>
                  {item.sex === "male" ? "M" : "F"} • {item.age} anos
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
