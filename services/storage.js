// src/services/storage.js
import AsyncStorage from "@react-native-async-storage/async-storage";

export const STORAGE_KEY = "@imc_history";

export async function getHistory() {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn("getHistory error", e);
    return [];
  }
}

export async function setHistory(list) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.warn("setHistory error", e);
  }
}

export async function appendEntry(entry) {
  try {
    const list = await getHistory();
    list.push(entry);
    await setHistory(list);
  } catch (e) {
    console.warn("appendEntry error", e);
  }
}

export async function clearHistory() {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.warn("clearHistory error", e);
  }
}

export async function removeEntry(id) {
  try {
    const list = await getHistory();
    const newList = list.filter((x) => x.id !== id);
    await setHistory(newList);
    return newList;
  } catch (e) {
    console.warn("removeEntry error", e);
    return [];
  }
}
