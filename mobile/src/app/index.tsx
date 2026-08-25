
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SmartShop</Text>

      <Text style={styles.subtitle}>
        Plan your meals, hit your nutrition goals and stay within budget.
      </Text>

      <Pressable style={styles.button} onPress={() => router.push('/plan')}>
        <Text style={styles.buttonText}>Start Planning</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },

  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 17,
    textAlign: 'center',
    marginBottom: 30,
  },

  button: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 10,
  },

  buttonText: {
    fontSize: 18,
    fontWeight: '600',
  },
});
