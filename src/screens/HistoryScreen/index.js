import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Title from "../../components/Title";
import TableModal from "../../components/TableModal";
import HistoryCard from "../../components/HistoryCard";
import styles from "./styles";

export default function HistoryScreen() {
  const [showTable, setShowTable] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Title />
      <HistoryCard onShowTable={() => setShowTable(true)} />
      <TableModal visible={showTable} onClose={() => setShowTable(false)} />
    </SafeAreaView>
  );
}
