import { useState, useCallback } from "react";
import { Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getHistory, clearHistory as clearHistoryService, removeEntry } from "../services/storage";

/**
 * useHistory - hook para encapsular lógica de histórico (AsyncStorage)
 * - Carrega histórico quando a tela recebe foco
 * - Exponhe items, load, clearHistory (com confirmação) e removeItem (com confirmação)
 */

export default function useHistory() {
  const [items, setItems] = useState([]);

  const load = useCallback(async () => {
    try {
      const list = await getHistory();
      setItems(Array.isArray(list) ? list : []);
    } catch (e) {
      console.warn("Erro carregando histórico", e);
      setItems([]);
    }
  }, []);

  // Recarrega quando a tela recebe foco
  useFocusEffect(
    useCallback(() => {
      load();
      // não retorna cleanup específico
    }, [load])
  );

  const clearHistory = useCallback(() => {
    Alert.alert(
      "Apagar histórico",
      "Deseja apagar todo o histórico de IMCs?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Apagar",
          style: "destructive",
          onPress: async () => {
            try {
              await clearHistoryService();
              setItems([]);
            } catch (e) {
              console.warn("Erro ao apagar histórico", e);
            }
          },
        },
      ],
      { cancelable: true }
    );
  }, []);

  const removeItem = useCallback(
    (id) => {
      Alert.alert(
        "Remover item",
        "Deseja remover este registro?",
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Remover",
            style: "destructive",
            onPress: async () => {
              try {
                const newList = await removeEntry(id);
                setItems(newList);
              } catch (e) {
                console.warn("Erro removendo item", e);
              }
            },
          },
        ],
        { cancelable: true }
      );
    },
    []
  );

  return {
    items,
    load,
    clearHistory,
    removeItem,
  };
}
