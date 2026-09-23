import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Spacing } from "@/constants/theme";

export default function PlanScreen() {
  // 1. STATE GOES HERE
  const [budget, setBudget] = useState("");
  const [days, setDays] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [breakfast, setBreakfast] = useState(false);
  const [lunch, setLunch] = useState(false);
  const [dinner, setDinner] = useState(false);
  const [snacks, setSnacks] = useState(false);
  const [dietaryRequirements, setDietaryRequirements] = useState<string[]>([]);
  const [allergies, setAllergies] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [people, setPeople] = useState("");
  const [supermarket, setSupermarket] = useState("");

  // 2. FUNCTIONS GO HERE
  function toggleDietaryRequirement(requirement: string) {
    if (dietaryRequirements.includes(requirement)) {
      setDietaryRequirements(
        dietaryRequirements.filter((item) => item !== requirement)
      );
    } else {
      setDietaryRequirements([...dietaryRequirements, requirement]);
    }
  }

  async function handleContinue() {
    const planRequest = {
      budget,
      days,
      calories,
      protein,
      meals: {
        breakfast,
        lunch,
        dinner,
        snacks,
      },
      dietaryRequirements,
      allergies,
      supermarket,
      people,
    };
    console.log("SENDING:", planRequest);

    //Convert input to numbers
    const daysNom = Number(days);
    const budgetNom = Number(budget);
    const caloriesNom = Number(calories);
    const proteinNom = Number(protein);
    const peopleNom = Number(people);

    if (!budget || !days || !calories || !protein) {
      setSuccessMessage("");
      setErrorMessage("Please complete all required fields.");
      return;
    }

    if (budgetNom < 1) {
      setErrorMessage("Budget must be greater than 1");
      setSuccessMessage("");
      return;
    }

    if (daysNom < 1 || daysNom > 7) {
      setErrorMessage("Days must be between 1 and 7");
      setSuccessMessage("");
      return;
    }

    if (caloriesNom < 1) {
      setErrorMessage("Calories must be greater than 1");
      setSuccessMessage("");
      return;
    }

    if (proteinNom < 1) {
      setErrorMessage("Protein must be greater than 1");
      setSuccessMessage("");
      return;
    }
    if (peopleNom < 1 || peopleNom > 10) {
      setErrorMessage("People must be between 1 and 10");
      setSuccessMessage("");
      return;
    }

    

    try {
      const response = await fetch("http://localhost:8080/api/plans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(planRequest),
      });
      //display error message using response
      if (!response.ok) {
        const error = await response.text();
        setErrorMessage(error);
        return;
      }

      const data = await response.json();

      setSuccessMessage("Success! Conected to the server");
      setErrorMessage("");

      console.log(data);
    } catch (error) {
      console.error(error);
      setErrorMessage("Unable to connect to the server. Please try again.");
      setSuccessMessage("");
    }
  }

  // 3. UI GOES INSIDE RETURN
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Plan Your Week</Text>

      <Text>
        This is where we will collect your budget, nutrition goals and meals.
      </Text>
      <Text style={styles.label}>Weekly budget</Text>
      <TextInput
        style={styles.input}
        value={budget}
        onChangeText={setBudget}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Number of days</Text>
      <TextInput
        style={styles.input}
        value={days}
        onChangeText={setDays}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Daily calorie goal</Text>
      <TextInput
        style={styles.input}
        value={calories}
        onChangeText={setCalories}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Daily protein goal (g)</Text>
      <TextInput
        style={styles.input}
        value={protein}
        onChangeText={setProtein}
        keyboardType="numeric"
      />

      <Text style={styles.sectionTitle}>Select meals</Text>

      <Pressable
        style={[styles.mealOption, breakfast && styles.mealOptionSelected]}
        onPress={() => setBreakfast(!breakfast)}
      >
        <Text>Breakfast</Text>
      </Pressable>

      <Pressable
        style={[styles.mealOption, lunch && styles.mealOptionSelected]}
        onPress={() => setLunch(!lunch)}
      >
        <Text>Lunch</Text>
      </Pressable>

      <Pressable
        style={[styles.mealOption, dinner && styles.mealOptionSelected]}
        onPress={() => setDinner(!dinner)}
      >
        <Text>Dinner</Text>
      </Pressable>

      <Pressable
        style={[styles.mealOption, snacks && styles.mealOptionSelected]}
        onPress={() => setSnacks(!snacks)}
      >
        <Text>Snacks</Text>
      </Pressable>

      <Text style={styles.sectionTitle}>Dietary requirements</Text>

      <Pressable
        onPress={() => toggleDietaryRequirement("Vegetarian")}
        style={[
          styles.optionButton,
          dietaryRequirements.includes("Vegetarian") &&
            styles.optionButtonSelected,
        ]}
      >
        <Text>Vegetarian</Text>
      </Pressable>

      <Pressable
        onPress={() => toggleDietaryRequirement("Vegan")}
        style={[
          styles.optionButton,
          dietaryRequirements.includes("Vegan") && styles.optionButtonSelected,
        ]}
      >
        <Text>Vegan</Text>
      </Pressable>

      <Pressable
        onPress={() => toggleDietaryRequirement("Halal")}
        style={[
          styles.optionButton,
          dietaryRequirements.includes("Halal") && styles.optionButtonSelected,
        ]}
      >
        <Text>Halal</Text>
      </Pressable>

      <Pressable
        onPress={() => toggleDietaryRequirement("Gluten-free")}
        style={[
          styles.optionButton,
          dietaryRequirements.includes("Gluten-free") &&
            styles.optionButtonSelected,
        ]}
      >
        <Text>Gluten-free</Text>
      </Pressable>

      <Pressable
        onPress={() => toggleDietaryRequirement("Dairy-free")}
        style={[
          styles.optionButton,
          dietaryRequirements.includes("Dairy-free") &&
            styles.optionButtonSelected,
        ]}
      >
        <Text>Dairy-free</Text>
      </Pressable>

      <Text style={styles.sectionTitle}>Allergies</Text>

      <TextInput
        style={styles.input}
        value={allergies}
        onChangeText={setAllergies}
        placeholder="e.g. peanuts, shellfish"
      />

      <Text style={styles.sectionTitle}>Supermarket</Text>

      <Picker
        selectedValue={supermarket}
        onValueChange={(value) => setSupermarket(value)}
      >
        <Picker.Item label="Select a supermarket" value="" />
        <Picker.Item label="Tesco" value="Tesco" />
        <Picker.Item label="Aldi" value="Aldi" />
        <Picker.Item label="Morrisons" value="Morrisons" />
        <Picker.Item label="Sainsbury's" value="Sainsbury's" />
        <Picker.Item label="Asda" value="Asda" />
      </Picker>

      <Text style={styles.sectionTitle}>How many people?</Text>

      <TextInput
        style={styles.input}
        value={people}
        onChangeText={setPeople}
      ></TextInput>

      {Boolean(errorMessage) && <Text>{errorMessage}</Text>}
      {Boolean(successMessage) && <Text>{successMessage}</Text>}

      <Pressable style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    paddingBottom: 40,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    marginBottom: 24,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 6,
  },

  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginBottom: 16,
    fontSize: 16,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
  },

  mealOption: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },

  mealOptionSelected: {
    backgroundColor: "#ddd",
  },

  continueButton: {
    marginTop: 24,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  continueButtonText: {
    fontSize: 17,
    fontWeight: "600",
  },

  optionButton: {
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: 8,
    marginBottom: 8,
  },

  optionButtonSelected: {
    borderWidth: 3,
  },
});
