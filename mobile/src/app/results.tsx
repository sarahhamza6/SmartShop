import { ScrollView, StyleSheet, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function ResultsScreen() {
  const { aiPlan } = useLocalSearchParams<{ aiPlan: string }>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Your SmartShop Plan</Text>

      <Text style={styles.plan}>{aiPlan}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  plan: {
    fontSize: 16,
    lineHeight: 24,
  },
});
